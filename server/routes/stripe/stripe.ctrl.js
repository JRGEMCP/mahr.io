var mongoose = require('mongoose'),
  Boom = require('boom'),
  User = mongoose.model('User'),
  Transaction = mongoose.model('Transaction'),
  Course = mongoose.model('Course');

var wrapFinal = function(req, rep, course, server, res){
  Transaction.create({cost: req.payload.cost, product: course._id, creator: req.auth.credentials.id}, function(err, tr){
    if(err || !tr ) { return rep(Boom.badRequest()); }

    User.update({_id: req.auth.credentials.id}, {$push: {purchased: tr._id, courses: course._id}}, {multi: false}, function (err, user) {
      if (err || !user) {
        return rep(Boom.badRequest());
      }

      if( server.mailer ) {
        server.mailer({
          to: req.auth.credentials.email,
          subject: 'Your Purchase',
          html: 'You have purchased course: ' + course.title
        });
      }

      rep(res);
    });
  });
};

module.exports = {
  create_user_and_charge: function(req, rep, stripe, server) {
    User.findOne({_id: req.auth.credentials.id}, function(err, user){
      if( err || !user) { return rep(Boom.badRequest()); }

      if( user.stripeId ) { return rep(Boom.badRequest('customer already exists')); }

      stripe.customers.create({
        email: req.auth.credentials.email,
        source: req.payload.token
      }).then(function (customer) {
        user.stripeId = customer.id;

        user.save(function(err, u) {
          if( err || !u) { return rep( Boom.badRequest() ); }

          Course.findOne({_id: req.payload.id}, function(err, course){
            if( err || !course ) { return rep(Boom.badRequest()); }

            stripe.charges.create({
              amount: req.payload.cost,
              description: "Course: " + course.title + "; " + course._id,
              currency: "usd",
              customer: customer.id
            }).then( function(res){
              Transaction.create({cost: req.payload.cost, product: course._id, creator: req.auth.credentials.id}, function(err, tr){
                if( err || !tr) { return rep(Boom.badRequest());}

                User.update({_id: req.auth.credentials.id}, {$push: {purchased: tr._id, courses: course._id}}, {multi: false}, function(err, user){
                  if( err || !user ){ return rep(Boom.badRequest()); }

                  if( server.mailer ) {
                    server.mailer({
                      to: user.email,
                      subject: 'Your Purchase',
                      html: 'You have purchased course: ' + course.title
                    });
                  }
                  rep( res );
                });
              });

            }, function(err){
              rep( Boom.badRequest(err) );
            });
          });
        });
      }, function(err){
        rep( Boom.badRequest(err));
      });
    });
  },
  user_charge: function(req, rep, stripe, server) {
    User.findOne({_id: req.auth.credentials.id})
      .populate('purchased')
      .exec( function(err, user) {
        if (err || !user) {
          return rep(Boom.badRequest());
        }

        var exist = false;
        for( var i in user.purchased ) {
          if( user.purchased[i].product === req.payload.id) {
            exist = true;
          }
        }
        if( exist ) {
          return rep(Boom.badRequest('course already owned'));
        }

        if (!user.stripeId) {
          return rep(Boom.badRequest('User not created'));
        }

        Course.findOne({_id: req.payload.id}, function(err, course) {
          if (err || !course) {
            return rep(Boom.badRequest());
          }

          if( req.payload.cost ) {
            stripe.charges.create({
              amount: req.payload.cost,
              description: "Course: " + course.title + "; " + course._id,
              currency: "usd",
              customer: user.stripeId
            }).then(function (res) {
              wrapFinal(req, rep, course, server, res);
            }, function (err) {
              rep(Boom.badRequest(err));
            });
          } else {
            wrapFinal(req, rep, course, server, {free: true});
          }

        });
    });
  }
};

