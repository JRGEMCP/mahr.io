require('./module.model');

var ModuleCtrl = require('./module.ctrl'),
  versionedAPI = '/api/v1/modules';

module.exports = function( server ) {
  server.route({
    method: 'PUT',
    path: versionedAPI + '/{id}/{type}',
    config: {
      handler: ModuleCtrl.update,
      auth: 'simple'
    }
  });
  server.route({
    method: 'DELETE',
    path: versionedAPI + '/{id}',
    config: {
      handler: ModuleCtrl.remove,
      auth: 'simple'
    }
  });
};
