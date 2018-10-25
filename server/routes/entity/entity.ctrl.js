var mongoose = require('mongoose'),
  Boom = require('boom'),
  Section = mongoose.model('Section'),
  Entity = mongoose.model('Entity');

const NOMULTI = {multi: false};
const STATES = ['completePlanning', 'setSections', 'submitSections', 'completeDefine', 'completePublish'];

var canSwitchState = function( entity, state ) {
  switch( entity.state ) {
    case 'completePlanning':
      return state === 'setUseCases';
      break;
    case 'setSections':
      return (entity.sections && entity.sections.length && state === 'completePlanning') ||
        state === 'submitUseCase';
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
      Entity
        .findOne({link: req.params.link})
        .populate('sections')
        .exec( function(err, entity){
          if( err ) { return rep( Boom.badRequest(err) ); }

          return rep({entity: entity});
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

      Entity
        .find( find )
        .sort( {lastUpdated: -1})
        .populate('sections')
        .exec( function(err, entities){
          if( err ) { return rep( Boom.badRequest(err) ); }

          return rep({entities: entities});
        });
    }
  },
  getOne: function(req, rep, cb){ //INTERNAL-ONLY
    Entity
      .findOne( {_id: req.params.id, creator: req.auth.credentials.id }  )
      .exec( function(err, entity){
        if( err || !entity) { return cb( null ); }

        return cb( entity );
      });
  },
  create: function(req, rep){
    if(req.payload.entity){
      req.payload.entity.creator = req.auth.credentials.id;
      //req.payload.article.log = [{action: 'created', by: req.auth.credentials.id}];
    }

    Entity.create( req.payload.entity, function(err, entity){
      if( err ) { return rep( Boom.badRequest(err) ); }

      return rep({entity: entity});

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
        Entity.update(updateCondition, updatePayload, NOMULTI, function(err, entity){
          if ( err || !entity.n) { return rep( Boom.badRequest(  err) ); }

          return rep( {entity: entity} );
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

            Entity.update(updateCondition, {$push: {sections: section.id}}, NOMULTI, function(err){
              if( err ) { return rep( Boom.badRequest(err) ); }

              return rep({section: section});
            });
          });
        }
        break;
      case 'completePlanning':// CREATOR
      case 'setSections':     // TEAM
      case 'submitSections':  // CREATOR
      case 'completeDefine':  // REVIEWER
        Entity
          .findOne( updateCondition  )
          .exec( function(err, entity){
            if( err || !entity) {  return rep( Boom.badRequest(  err) ); }

            if ( STATES.indexOf( field ) !== (STATES.indexOf( entity.state ) + 1) ) {
              return rep( Boom.forbidden() );
            } else if ( canSwitchState(article, field) ) {
              entity.state = field;
              entity.save(function(err, art) {
                return rep( {state: field} );
              });
            } else {
              return rep( Boom.badRequest() );
            }
          });
        break;
      case 'completePublish':   // CREATOR
        Entity
          .findOne( updateCondition  )
          .exec( function(err, entity){
            if( err || !entity) {  return rep( Boom.badRequest(  err) ); }

            entity.published = true;
            if ( canSwitchState(entity, field) ) {
              entity.state = field;
              entity.save(function() {
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
      Entity
        .findOne( updateCondition  )
        .exec( function(err, entity) {
          if (err || !entity) { return rep(Boom.badRequest(err)); }

          if( entity && entity.sections.indexOf(req.query.id) !== -1 ) {
            Section.remove({_id: req.query.id}).exec( function(err, section){
              if (err || !(section && section.result && section.result.ok) ) { return rep(Boom.badRequest()); }

              Entity.update( updateCondition, {$pull: {sections: req.query.id}}, NOMULTI, function(err, ent) {

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
