require('./transactions.model');

var TrnCtrl = require('./transactions.ctrl'),
  versionedAPI = '/api/v1/transactions';

module.exports = function( server ) {
  [
    {
      method: 'GET',
      path: versionedAPI,
      config: {
        handler: TrnCtrl.get,
        auth: {
          strategy: 'simple'
        }
      }
    },
    {
      method: 'POST',
      path: versionedAPI + '/{courseId}',
      config: {
        handler: function(req, rep) {
          return TrnCtrl.create(req, rep, server);
        },
        auth: {
          strategy: 'simple'
        }
      }
    }
  ].forEach(function (route) { server.route(route); });
};
