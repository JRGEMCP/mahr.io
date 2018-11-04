var mongoose = require('mongoose');
var async = require('async');
var Boom = require('boom'),
  Module = mongoose.model('Module'),
  Section = mongoose.model('Section'),
  Course = mongoose.model('Course');

const NOMULTI = {multi: false};
const STATES = ['completePlanning', 'completeDefine', 'completeConnect', 'completePublish'];

var canSwitchState = function( course, state ) {
  switch( course.state ) {
    case 'completePlanning':
      return course.modules && course.modules.length && state === 'completeDefine';
      break;
    case 'completeDefine':
      return state === 'completeConnect';
      break;
    case 'completeConnect':
      return state === 'completePublish';
      break;
    // case 'completeChallenge':
    //   return state === 'completePublish';
    //   break;
    case 'completePublish':
      return state === 'completePublish';
      break;
  }
};
module.exports = {
  getCourse: function(id, callback){
    Course.find({_id: id}).exec( function(err, course){
      if( err || !course ) {
        callback();
      }
      callback( course );
    })
  },
  addModule: function(id, module, rep){ // INTERNAL
    Course.update({_id: id}, {$push: {modules: module._id}}, {multi: false}, function(err, update){
      if( err ){ return rep(Boom.badRequest(err)); }

      return rep({module: module});
    })
  },
  removeModule: function( courseId, moduleId, rep){
    Course.update({_id: courseId}, {$pop: {modules: moduleId}}, {multi: false}, function(err, update){
      if( err ){ return rep(Boom.badRequest(err)); }

      return rep({deleted: true});
    });
  },
  get: function(req, rep) {
    if( req.params.link ) {
      Course
        .findOne({link: req.params.link})
        .populate('modules')
        .populate('creator', 'email')
        .lean()
        .exec( function(err, course){
          if( err ) { return rep( Boom.badRequest(err) ); }

          if( req.auth.credentials && (course.creator._id.toString() === req.auth.credentials.id || req.auth.credentials.courses.indexOf( course._id) !== -1 )) {
            async.eachOf( course.modules, function(module, i, cb){
              async.eachOf( module.content, function(content, j, cb2) {
                if( content.substr(0,10) === 'sections__') {
                  Section.find({_id: content.substr(10)}).exec( function(err, sec) {
                    if( sec && sec.length ) {
                      course.modules[i].content[j] = sec[0];
                    }
                    cb2();
                  });
                } else {
                  cb2();
                }
              }, function() {
                cb();
              });
            }, function(){
              return rep({course: course});
            });
          } else {
            return rep({course: course});
          }
        });
    } else {
      var find = req.auth.isAuthenticated ? {creator: req.auth.credentials.id} : {};
      if( find.creator ) {
        find = { $or: [ { published: 1 }, { creator: req.auth.credentials.id }] };
      }
      if( req.query.id ) {
        find._id = req.query.id
      }
      Course
        .find( find )
        .sort( {lastUpdated: -1})
        .populate('modules')
        .populate('creator', 'email')
        .lean()
        .exec( function(err, courses){
          if( err ) { return rep( Boom.badRequest(err) ); }

          if( !req.query.id ) {
            return rep({courses: courses});
          } else {
            if( req.auth.credentials && (req.auth.credentials.id === courses[0].creator._id.toString() ||
              (req.auth.credentials.courses && req.auth.credentials.courses.indexOf( courses[0]._id) !== -1))) {
              async.eachOf(courses, function (course, index, callback) {
                async.eachOf(course.modules, function (module, i, cb) {
                  async.eachOf(module.content, function (content, i2, cb2) {
                    if (content.substr(0, 10) === 'sections__') {
                      Section.find({_id: content.substr(10)}).lean().exec(function (err, sec) {
                        if (sec && sec.length) {
                          courses[index].modules[i].content[i2] = sec[0];
                        }
                        cb2();
                      });
                    } else {
                      cb2();
                    }
                  }, function () {
                    cb();
                  });
                }, function () {
                  callback();
                });
              }, function () {
                rep({courses: courses});
              });
            } else {
              return rep({courses: courses});
            }
          }
        });
    }
  },
  create: function(req, rep){
    if(req.payload.course){
      req.payload.course.creator = req.auth.credentials.id;
    } else { return rep( Boom.badRequest() )}

    Course.create( req.payload.course, function(err, course){
      if( err ) { return rep( Boom.badRequest(err) ); }

      return rep({course: course});
    });
  },
  update: function( req, rep) {
    var field = req.params.type;
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
      case 'featured':
      case 'scenario':
      case 'design':
      case 'publish':
      case 'thumb':
      case 'cost':
        updatePayload[ field ] = (field === 'publish' ? false : req.payload[ field ]);
        Course.update(updateCondition, updatePayload, NOMULTI, function(err, course){
          if ( err || !course.n) { return rep( Boom.badRequest(  err ) ); }

          return rep( {course: course} );
        });
        break;
      case 'module': // ADDS NEW SECTION
        if( !req.payload[ field ] ) { return rep( Boom.badRequest()); }

        if ( req.query.id ) {
          Module.update({_id: req.query.id}, req.payload[field], NOMULTI, function(err, module){
            if( err ) { return rep( Boom.badRequest(err) ); }

            return rep({module: module});
          });
        } else {
          Module.create(req.payload[field], function (err, module) {
            if( err ) { return rep( Boom.badRequest(err) ); }

            Course.update(updateCondition, {$push: {modules: module.id}}, NOMULTI, function(err){
              if( err ) { return rep( Boom.badRequest(err) ); }

              return rep({module: module});
            });
          });
        }
        break;
      case 'completePlanning':
      case 'completeDefine':
      case 'completeConnect':
      case 'completeChallenge':
      case 'completePublish':
        Course
          .findOne( updateCondition  )
          .exec( function(err, course){
            if( err || !course) {  return rep( Boom.badRequest(  err) ); }

            if ( STATES.indexOf( field ) !== (STATES.indexOf( course.state ) + 1) ) {
              return rep( Boom.forbidden() );
            } else if ( canSwitchState(course, field) ) {
              course.published = (field === 'completePublish' ? true : course.published);
              course.state = field;
              course.save(function(err, course) {
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
  update2: function(req, rep){
    let updateObj = {};
    if( req.auth.credentials.access.indexOf('instructor') === -1 ){
      return rep( Boom.forbidden() );
    }

    switch(req.params.type){
      case 'publish':
        updateObj = typeof req.query.true !== 'undefined' ? {published: true} : {};
        if( typeof req.query.false !== 'undefined') {
          updateObj = {published: false};
        }
        break;
      case 'tags':
        updateObj = {
          tags: req.payload.tags || []
        }
        break;
      case 'info':
        if( !req.payload.course ){ return rep(Boom.badRequest()) }
        updateObj = {
          title: req.payload.course.title,
          link: req.payload.course.link,
          deck: req.payload.course.deck
        }
        break;
      default:
        return rep( Boom.badRequest() );
    }

    Course.update({_id: req.params.id}, updateObj, {multi: false}, function(err, update){
      if( err ){ return rep(Boom.badRequest(err)); }

      return rep({updated: update});
    })
  },
  remove: function(req, rep){
    var updateCondition = {_id: req.params.id};
    if( req.auth.credentials.access.indexOf('instructor') === -1 ) {
      updateCondition['creator'] = req.auth.credentials.id;
    }
    if (req.query.id ) { // REMOVE SECTION
      Course
        .findOne( updateCondition  )
        .exec( function(err, course) {
          if (err || !course) { return rep(Boom.badRequest(err)); }

          if( course && course.modules.indexOf(req.query.id) !== -1 ) {
            Module.remove({_id: req.query.id}).exec( function(err, module){
              if (err || !(module && module.result && module.result.ok) ) { return rep(Boom.badRequest()); }

              Course.update( updateCondition, {$pull: {modules: req.query.id}}, NOMULTI, function(err, crse) {

                if (crse && crse.n && crse.ok) {
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
      Course.remove(updateCondition).exec( function(err, course){
        if (err || !(course && course.result && course.result.ok) ) { return rep(Boom.badRequest()); }

        return rep({deleted: true});
      });
    }
  }
}
