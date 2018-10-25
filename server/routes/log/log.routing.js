require('./log.model');

var LogCtrl = require('./log.ctrl'),
  versionedAPI = '/api/v1/logs';

module.exports = function( server ) {
  [
    {
      method: 'POST',
      path: versionedAPI,
      config: {
        handler: LogCtrl.create,
        auth: {
          mode: 'try',
          strategy: 'simple'
        }
      }
    }
  ].forEach(function (route) { server.route(route); });
};
