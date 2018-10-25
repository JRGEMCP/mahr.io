require('./tutorial.model');

var TutorialCtrl = require('./tutorial.ctrl'),
  versionedAPI = '/api/v1/tutorials';

module.exports = function( server ) {
  [
    {
      method: 'GET',
      path: versionedAPI + '/{link?}',
      config: {
        handler: TutorialCtrl.get,
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
        handler: TutorialCtrl.create,
        auth: 'simple'
      }
    },
    {
      method: 'PUT',
      path: versionedAPI + '/{id}/{section}',
      config: {
        handler: TutorialCtrl.update,
        auth: 'simple'
      }
    },
    {
      method: 'DELETE',
      path: versionedAPI + '/{id}',
      config: {
        handler: TutorialCtrl.remove,
        auth: 'simple'
      }
    },
  ].forEach(function (route) { server.route(route); });
};
