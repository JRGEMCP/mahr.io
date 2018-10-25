require('../user/user.model');

var Mongoose = require('mongoose'),
  Boom = require('boom'),
  UserCtrl = require('./user.ctrl'),
  versionedAPI = '/api/v1/users';

module.exports = function ( server ) {
  server.route({
    method: 'GET',
    path: versionedAPI,
    config: {
      handler: UserCtrl.get,
      auth: 'simple'
    }
  });
  server.route({
    method: 'DELETE',
    path: versionedAPI + '/me',
    config: {
      handler: UserCtrl.remove,
      auth: 'simple'
    }
  });
};
