var Mongoose = require('mongoose'),
  User = Mongoose.model('User'),
  Boom = require('boom');

module.exports = {
  login: function (request, reply) {
    if (request.auth.isAuthenticated) { return reply(Boom.badRequest()); }

    User.login(request.payload.email.toLowerCase(), request.payload.password, function (err, user) {
      if (err) { return reply(Boom.unauthorized(err)); }

      user.token = 'Bearer ' + user.token;
      reply( {user: user} );
    });
  },
  recoverPassword: function (request, reply, server, testing){
    User.recoverPassword( request.payload.email.toLowerCase(), function(token){
      if( server.mailer && token ) {
        server.mailer({
          to: request.payload.email.toLowerCase(),
          subject: 'Reset your Mahr.io account',
          html: 'Reset your account <a href="'+ server.hostDomain + '/?token='+token + '">here</a>'
        });
      }
      if( testing ) {
        reply({token: token});
      } else {
        reply({reset: true});
      }
    });
  },
  isValidToken: function (request, reply){
    User.isValidToken(request.payload.token, function(err){
      if( err ) { return reply( Boom.badRequest()); }

      reply({validToken: true});
    });
  },
  changePassword: function(request, reply){
    if( !request.payload.password ) { return reply(Boom.badRequest()); }

    User.isValidToken( request.payload.token, function(err, user){
      if( err ) { return reply( Boom.badRequest()); }

      User.changePassword( user, request.payload.password, function(err, user){
        if( err ) { return reply( Boom.badRequest()); }

        user.token = 'Bearer ' + user.token;
        reply( {user: user} );
      })
    });
  },
  updatePassword: function(request, reply){
    if (!request.auth.isAuthenticated) { return reply(Boom.badRequest()); }

    User.updatePassword( request.auth.credentials.id, request.payload.passwords, function(err){
      if( err )  { return reply( Boom.badRequest()); }

      reply(true);
    });
  },
  register: function (request, reply, server, testing) {
    var responseObject = {};
    if (request.auth.isAuthenticated) { return reply(Boom.badRequest('You Logged In')); }

    if( !request.payload.user ){
      return reply( Boom.badRequest() );
    }
    request.payload.user.access = ['authorized'];
    User.create( request.payload.user).then(function(user){
      if( server.mailer ) {
        server.mailer({
          to: user.email,
          subject: 'Welcome to Mahr.io',
          html: 'Activate your account <a href="'+ server.hostDomain + '/?confirm='+user.confirmedToken + '">here</a>'
        });
      }
      responseObject = {
        token: 'Bearer ' + user.authorizationToken,
        email: user.email,
        access: user.access,
        id: user.id,
        stripeId: false,
        courses: user.courses,
        confirmed: user.confirmed
      };

      if( testing ) {
        responseObject.confirmedToken = user.confirmedToken;
      }

      reply(responseObject);
    }).catch(function(err){
      reply( Boom.badRequest() ); // user already in system?
    });
  },
  resendConfirmEmail: function ( request, reply, server){
    if (!request.auth.isAuthenticated) { return reply(Boom.badRequest()); }

    User.resetConfirmed(request.auth.credentials.token, function(err, token){
      if( err ){ return reply(Boom.badRequest()); }

      if( server.mailer ) {
        server.mailer({
          to: request.auth.credentials.email,
          subject: 'Confirm your Mahr.io account',
          html: 'Activate your account <a href="'+ server.hostDomain + '/?confirm='+token + '">here</a>'
        });
      }

      reply({resendConfirmationToken: true});
    })
  },
  confirmAccount: function ( request, reply){
    User.confirmAccount(request.payload.token, function(err){
      if( err ) { return reply(Boom.badRequest()); }

      reply({confirmed: true});
    })
  },
  logout: function ( request, reply, allDevices){
    if (request.auth.isAuthenticated) {
      var action = {$pull: {authorizationToken: request.auth.credentials.token}};
      if( allDevices ) {
        action = {$set: {authorizationToken: []}};
      }
      User.update( {authorizationToken: request.auth.credentials.token}, action, {multi: false}, function(err){
        if( err ) { return reply( Boom.badRequest() ); }

        reply({logout:true});
      });
    }else{
      reply({logout: true});
    }
  }
};
