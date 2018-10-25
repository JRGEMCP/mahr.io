require('./section.model');

var SectionCtrl = require('./section.ctrl'),
  versionedAPI = '/api/v1/sections';

module.exports = function( server ) {
  [
    {
      method: 'POST',
      path: versionedAPI,
      config: {
        handler: SectionCtrl.create,
        auth: 'simple'
      }
    },
    {
      method: 'PUT',
      path: versionedAPI + '/{id}/{section}',
      config: {
        handler: SectionCtrl.update,
        auth: 'simple'
      }
    },
    {
      method: 'DELETE',
      path: versionedAPI + '/{id}',
      config: {
        handler: SectionCtrl.remove,
        auth: 'simple'
      }
    }
  ].forEach(function (route) { server.route(route); });
};
