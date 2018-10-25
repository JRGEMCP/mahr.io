var mongoose = require('mongoose'),
  Boom = require('boom'),
  Course = mongoose.model('Course'),
  User = mongoose.model('User'),
  Transaction = mongoose.model('Transaction');

module.exports = {
  get: function(req, rep){
    Transaction.find({
      creator: req.auth.credentials.id
    }).populate('product').exec( function(err, transactions){
      if( err ) {
        return rep(Boom.badRequest());
      }

      return rep({transactions: transactions});

    })

  },
  create: function(req, rep, server) {
    Course.findOne({_id: req.params.courseId}, function(err, course) {
      if( err || !course) { return rep( Boom.badRequest(err || 'Course not found')); }

      if ( course.cost ) {
        return rep( Boom.forbidden() );
      } else {
        Transaction.create({product: course._id, creator: req.auth.credentials.id}, function(err, tr){
          if( err || !tr) { return rep(Boom.badRequest());}

          User.update({_id: req.auth.credentials.id}, {$push: {purchased: tr._id, courses: course._id}}, {multi: false}, function(err, user) {
            if( err || !user ){ return rep(Boom.badRequest()); }

            if( server.mailer ) {
              server.mailer({
                to: req.auth.credentials.email,
                subject: 'Your Purchase',
                html: 'You have purchased course: <a href="'+server.hostDomain+'/dashboard">' + course.title + '</a>'
              });
            }
            rep( {purchased: 'free'} );
          });
        });
      }
    });
  }
};
