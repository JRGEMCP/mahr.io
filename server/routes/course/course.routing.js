require('../module/module.model');
require('./course.model');

var CourseCtrl = require('./course.ctrl'),
  versionedAPI = '/api/v1/courses';

module.exports = function( server ) {
  server.route({
    method: 'GET',
    path: versionedAPI + '/{link?}',
    config: {
      handler: CourseCtrl.get,
      auth: {
        mode: 'try',
        strategy: 'simple'
      }
    }
  });

  server.route({
    method: 'POST',
    path: versionedAPI,
    config: {
      handler: CourseCtrl.create,
      auth: 'simple'
    }
  });

  server.route({
    method: 'PUT',
    path: versionedAPI + '/{id}/{type}',
    config: {
      handler: CourseCtrl.update,
      auth: 'simple'
    }
  });

  server.route({
    method: 'DELETE',
    path: versionedAPI + '/{id}',
    config: {
      handler: CourseCtrl.remove,
      auth: 'simple'
    }
  });
}
