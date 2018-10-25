var mongoose = require('mongoose'),
  Boom = require('boom'),
  Log = mongoose.model('Log'),
  Section = mongoose.model('Section'),
  Tutorial = mongoose.model('Tutorial');

const NOMULTI = {multi: false};
const STATES = ['completePlanning', 'setSections', 'submitSections', 'completeDefine', 'completePublish'];

var canSwitchState = function( tutorial, state ) {
  switch( tutorial.state ) {
    case 'completePlanning':
      return state === 'setSections';
      break;
    case 'setSections':
      return tutorial.sections && tutorial.sections.length &&
        state === 'submitSections';
      break;
    case 'submitSections':
      return state === 'completeDefine'; // need to add role check
      break;
    case 'completeDefine':
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
      Tutorial
        .findOne({link: req.params.link})
        .populate('creator', '_id email')
        .populate('sections')
        .exec( function(err, tutorial){
          if( err ) { return rep( Boom.badRequest(err) ); }

          Log.create({action: 'read', path: req.params.link});
          return rep({tutorial: tutorial});
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

      Tutorial
        .find( find )
        .sort( {lastUpdated: -1})
        .populate('creator', '_id email')
        .populate('sections')
        .exec( function(err, tutorials){
          if( err ) { return rep( Boom.badRequest(err) ); }

          Log.create({
            action: 'get',
            path: 'tutorials',
            creator: req.auth.isAuthenticated ? req.auth.credentials.id : null
          }, function() {
            return rep({tutorials: tutorials});
          });
        });
    }
  },
  getOne: function(req, rep, cb){ //INTERNAL-ONLY
    Tutorial
      .findOne( {_id: req.params.id, creator: req.auth.credentials.id }  )
      .exec( function(err, tutorial){
        if( err || !tutorial) { return cb( null ); }

        return cb( tutorial );
      });
  },
  create: function(req, rep){
    if(req.payload.tutorial){
      req.payload.tutorial.creator = req.auth.credentials.id;
      //req.payload.article.log = [{action: 'created', by: req.auth.credentials.id}];
    }

    Tutorial.create( req.payload.tutorial, function(err, tutorial){
      if( err ) { return rep( Boom.badRequest(err) ); }

      return rep({tutorial: tutorial});

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
      case 'publish':
      case 'thumb':
      case 'featured':
        updatePayload[ field ] = (field === 'publish' ? false : req.payload[ field ]);
        Tutorial.update(updateCondition, updatePayload, NOMULTI, function(err, tutorial){
          if ( err || !tutorial.n) { return rep( Boom.badRequest(  err) ); }

          return rep( {tutorial: tutorial} );
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

            Tutorial.update(updateCondition, {$push: {sections: section.id}}, NOMULTI, function(err){
              if( err ) { return rep( Boom.badRequest(err) ); }

              return rep({section: section});
            });
          });
        }
        break;
      case 'completePlanning':// CREATOR
      case 'setSections':     // TEAM
      case 'submitSections':  // CREATOR
        Tutorial
          .findOne( updateCondition  )
          .exec( function(err, tutorial){
            if( err || !tutorial) {  return rep( Boom.badRequest(  err) ); }

            if ( canSwitchState(tutorial, field) ||  (tutorial.state == 'submitSections' &&
                field == 'setSections' && req.auth.credentials.access.indexOf('reviewer') !== -1)) {
              tutorial.state = field;
              tutorial.save(function(err, art) {
                return rep( {state: field} );
              });
            } else if ( STATES.indexOf( field ) !== (STATES.indexOf( tutorial.state ) + 1) ) {
              return rep( Boom.forbidden() );
            } else {
                return rep( Boom.badRequest() );
            }
          });
        break;
      case 'completeDefine':  // REVIEWER
        if( req.auth.credentials.access.indexOf('reviewer') === -1 ) {
          return rep( Boom.forbidden() );
        }
        Tutorial
          .findOne( updateCondition  )
          .exec( function(err, tutorial){
            if( err || !tutorial) {  return rep( Boom.badRequest(  err) ); }

            if ( STATES.indexOf( field ) !== (STATES.indexOf( tutorial.state ) + 1) ) {
              return rep( Boom.forbidden() );
            } else if ( canSwitchState(tutorial, field) ) {
              tutorial.state = field;
              tutorial.save(function(err, art) {
                return rep( {state: field} );
              });
            } else {
                return rep( Boom.badRequest() );
            }
          });
        break;
      case 'completePublish':   // CREATOR
        Tutorial
          .findOne( updateCondition  )
          .exec( function(err, tutorial){
            if( err || !tutorial) {  return rep( Boom.badRequest(  err) ); }

            tutorial.published = true;
            if ( canSwitchState(tutorial, field) ) {
              tutorial.state = field;
              tutorial.save(function() {
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
      Tutorial
        .findOne( updateCondition  )
        .exec( function(err, tutorial) {
          if (err || !tutorial) { return rep(Boom.badRequest(err)); }

          if( tutorial && tutorial.sections.indexOf(req.query.id) !== -1 ) {
            Section.remove({_id: req.query.id}).exec( function(err, section){
              if (err || !(section && section.result && section.result.ok) ) { return rep(Boom.badRequest()); }

              Tutorial.update( updateCondition, {$pull: {sections: req.query.id}}, NOMULTI, function(err, ent) {

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
      Tutorial.remove(updateCondition).exec( function(err, tut){
        if (err || !(tut && tut.result && tut.result.ok) ) { return rep(Boom.badRequest()); }

        return rep({deleted: true});
      });
    }
  }
};
