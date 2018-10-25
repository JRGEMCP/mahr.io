var Mongoose = require('mongoose'),
  User = Mongoose.model('User'),
  Boom = require('boom');

module.exports = {
  get: function( req, rep) {
    if( req.auth.credentials.access.indexOf('instructor') === -1 ) {
      return rep( Boom.forbidden() );
    }

    User
      .find( {} )
      .exec( function(err, users){
        if( err ) { return rep( Boom.badRequest(err) ); }

        return rep({users: users});
      });
  },
  remove: function(req, rep) {
    User.remove({_id: req.auth.credentials.id}).exec(function(err){

      if( err ) { return rep( Boom.badRequest(err)); }

      rep({removed: true})
    });
  }
};
