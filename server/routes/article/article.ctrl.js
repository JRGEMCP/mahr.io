var mongoose = require('mongoose'),
  Boom = require('boom'),
  Log = mongoose.model('Log'),
  Section = mongoose.model('Section'),
  Article = mongoose.model('Article');

const NOMULTI = {multi: false};
const STATES = ['completePlanning', 'setUseCases', 'submitUseCase', 'completeDefine', 'setScenario', 'submitDesign', 'completeDesign', 'submitCode', 'completeEngineer', 'completePublish'];

var canSwitchState = function( article, state ) {
  switch( article.state ) {
    case 'completePlanning':
      return state === 'setUseCases';
      break;
    case 'setUseCases':
      return (article.sections && article.sections.length && state === 'completePlanning') ||
        state === 'submitUseCase';
      break;
    case 'submitUseCase':
      return state === 'completeDefine'; // need to add role check
      break;
    case 'completeDefine':
      return article.scenario && state === 'setScenario';
      break;
    case 'setScenario':
      return state === 'submitDesign';
      break;
    case 'submitDesign':
      return state === 'completeDesign';      // need to add role check
      break;
    case 'completeDesign':
      return article.code && state === 'submitCode';
      break;
    case 'submitCode':
      return article.code && state === 'completeEngineer';
      break;
    case 'completeEngineer':
      return state === 'completePublish';
      break;
    case 'completePublish':
      return state === 'completePublish';
      break;
  }
};

module.exports = {
  get: function(req, rep){
    if( req.params.link ) {
      Article
        .findOne({link: req.params.link})
        .populate('sections')
        .exec( function(err, article){
          if( err ) { return rep( Boom.badRequest(err) ); }

          Log.create({action: 'read', path: req.params.link});
          return rep({article: article});
        });
    } else {
      var find = { published: 1 };
      if( req.auth.isAuthenticated ) {
        if( req.auth.credentials.access.indexOf('instructor') !== -1 ) {
          find = { };
        } else {
          find = { $or: [ { published: 1 }, { creator: req.auth.credentials.id }] };
        }
      }
      if( req.query.id ) {
        find._id = req.query.id
      }

      Article
        .find( find )
        .sort( {lastUpdated: -1})
        .populate('sections')
        .exec( function(err, articles){
          if( err ) { return rep( Boom.badRequest(err) ); }

          Log.create({action: 'get', path: 'tutorials'});
          return rep({articles: articles});
        });
    }
  },
  getOne: function(req, rep, cb){ //INTERNAL-ONLY
    Article
      .findOne( {_id: req.params.id, creator: req.auth.credentials.id }  )
      .exec( function(err, article){
        if( err || !article) { return cb( null ); }

        return cb( article );
      });
  },
  create: function(req, rep){
    if(req.payload.article){
      req.payload.article.creator = req.auth.credentials.id;
      //req.payload.article.log = [{action: 'created', by: req.auth.credentials.id}];
    }

    Article.create( req.payload.article, function(err, article){
      if( err ) { return rep( Boom.badRequest(err) ); }

      return rep({article: article});

    });
  },
  update: function( req, rep) {
    var field = req.params.section;
    var updateCondition = {_id: req.params.id};
    if( req.auth.credentials.access.indexOf('instructor') === -1 ) {
      updateCondition['creator'] = req.auth.credentials.id;
    }
    var updatePayload = {lastUpdated: Date.now()};
    switch( field ) {
      case 'title':
      case 'deck':
      case 'link':
      case 'tags':
      case 'code':
      case 'scenario':
      case 'design':
      case 'publish':
      case 'featured':
        updatePayload[ field ] = (field === 'publish' ? false : req.payload[ field ]);
        Article.update(updateCondition, updatePayload, NOMULTI, function(err, article){
          if ( err || !article.n) { return rep( Boom.badRequest(  err) ); }

          return rep( {article: article} );
        });
        break;
      case 'section': // ADDS NEW SECTION
        if( !req.payload[ field ] ) { return rep( Boom.badRequest()); }

        if ( req.query.id ) { req.payload[field].lastUpdated = new Date();
          Section.update({_id: req.query.id}, req.payload[field], NOMULTI, function(err, section){
            if( err ) { return rep( Boom.badRequest(err) ); }

            return rep({section: section});
          });
        } else {
          Section.create(req.payload[field], function (err, section) {
            if( err ) { return rep( Boom.badRequest(err) ); }

            Article.update(updateCondition, {$push: {sections: section.id}}, NOMULTI, function(err){
              if( err ) { return rep( Boom.badRequest(err) ); }

              return rep({section: section});
            });
          });
        }
        break;
      case 'completeDiscover':
      case 'setUseCases':
      case 'submitUseCase':
      case 'completeDefine':
      case 'setScenario':
      case 'submitDesign':
      case 'completeDesign':
      case 'submitCode':
      case 'completeEngineer':
        Article
          .findOne( updateCondition  )
          .exec( function(err, article){
            if( err || !article) {  return rep( Boom.badRequest(  err) ); }

            if ( STATES.indexOf( field ) !== (STATES.indexOf( article.state ) + 1) ) {
              return rep( Boom.forbidden() );
            } else if ( canSwitchState(article, field) ) {
              article.state = field;
              article.save(function(err, art) {
                return rep( {state: field} );
              });
            } else {
              return rep( Boom.badRequest() );
            }
          });
        break;
      case 'completePublish':
        Article
          .findOne( updateCondition  )
          .exec( function(err, article){
            if( err || !article) {  return rep( Boom.badRequest(  err) ); }

            article.published = true;
            if ( canSwitchState(article, field) ) {
              article.state = field;
              article.save(function() {
                return rep( {state: field} );
              });
            } else {
              return rep( Boom.badRequest() );
            }
          });
        break;
      default:
        return rep( Boom.badRequest() );
    }
  },
  remove: function( req, rep) {
    var updateCondition = {_id: req.params.id};
    if( req.auth.credentials.access.indexOf('instructor') === -1 ) {
      updateCondition['creator'] = req.auth.credentials.id;
    }
    if (req.query.id ) { // REMOVE SECTION
      Article
        .findOne( updateCondition  )
        .exec( function(err, article) {
          if (err || !article) { return rep(Boom.badRequest(err)); }

          if( article && article.sections.indexOf(req.query.id) !== -1 ) {
            Section.remove({_id: req.query.id}).exec( function(err, section){
              if (err || !(section && section.result && section.result.ok) ) { return rep(Boom.badRequest()); }

              Article.update( updateCondition, {$pull: {sections: req.query.id}}, NOMULTI, function(err, article) {

                if (section && section.result && section.result.ok) {
                  return rep({deleted: true});
                } else {
                  return rep(Boom.badRequest());
                }
              });
            })
          } else {
            rep( Boom.badRequest() );
          }
        });

    } else {
      rep( Boom.badRequest() );
    }
  }
};
