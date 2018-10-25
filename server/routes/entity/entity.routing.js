require('./entity.model');

var EntityCtrl = require('./entity.ctrl'),
  versionedAPI = '/api/v1/entities';

module.exports = function( server ) {
  [
    {
      method: 'GET',
      path: versionedAPI + '/{link?}',
      config: {
        handler: EntityCtrl.get,
        auth: {
          mode: 'try',
          strategy: 'simple'
        }
      }
    },
    {
      method: 'POST',
      path: versionedAPI,
      config: {
        handler: EntityCtrl.create,
        auth: 'simple'
      }
    },
    {
      method: 'PUT',
      path: versionedAPI + '/{id}/{section}',
      config: {
        handler: EntityCtrl.update,
        auth: 'simple'
      }
    },
    {
      method: 'DELETE',
      path: versionedAPI + '/{id}',
      config: {
        handler: EntityCtrl.remove,
        auth: 'simple'
      }
    },
  ].forEach(function (route) { server.route(route); });
};
