var mongoose = require('mongoose'),
  Boom = require('boom'),
  Section = mongoose.model('Section');

module.exports = {
  create: function(req, rep){

    Section.create( req.payload.section, function(err, section){
      if( err ) { return rep( Boom.badRequest(err) ); }

      return rep({section: section});

    });
  },
  update: function( req, rep) {
    var field = req.params.section;
    var updateCondition = {_id: req.params.id};
    if( req.auth.credentials.access.indexOf('instructor') === -1 ) {
      updateCondition['creator'] = req.auth.credentials.id;
    }
    var updatePayload = {lastUpdated: Date.now()};
    switch( field ) {
      case 'body':
        updatePayload[ field ] = req.payload[ field ];
        Section.update(updateCondition, updatePayload, {multi: false}, function(err, sec){
          if ( err || !sec.n) { return rep( Boom.badRequest(  err) ); }

          return rep( {sec: sec} );
        });
        break;
      default:
        return rep( Boom.badRequest() );
    }
  },
  remove: function( req, rep) {
    var updateCondition = {_id: req.params.id};
    if( req.auth.credentials.access.indexOf('instructor') === -1 ) {
      updateCondition['creator'] = req.auth.credentials.id;
    }
    Section.remove(updateCondition).exec( function(err, sec){
      if (err || !(sec && sec.result && sec.result.ok) ) { return rep(Boom.badRequest()); }

      return rep({deleted: true});
    });
  }
};
