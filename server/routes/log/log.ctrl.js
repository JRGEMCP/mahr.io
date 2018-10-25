var mongoose = require('mongoose'),
  Boom = require('boom'),
  Log = mongoose.model('Log');

module.exports = {
  create: function(req, rep){
    if(req.payload.log){
      req.payload.log.creator = req.auth.isAuthenticated ? req.auth.credentials.id : null

      Log.create( req.payload.log, function(err, log){
        if( err && !log ) { return rep( Boom.badRequest(err) ); }

        return rep({logged: true});

      });
    } else {
      return rep( Boom.badRequest() );
    }
  }
};
