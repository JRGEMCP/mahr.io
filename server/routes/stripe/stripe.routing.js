var StripeCtrl = require('./stripe.ctrl'),
  stripeAPI = '/api/v1/stripe';

module.exports = function( server ) {
  var stripe = require('stripe')(process.env.STRIPE_PRIVATE );
  [
    {
      method: 'POST',
      path: stripeAPI + '/create-user-and-charge',
      config: {
        handler: function( req, rep) {
          StripeCtrl.create_user_and_charge( req, rep, stripe, server);
        },
        auth: {
          strategy: 'simple'
        }
      }
    },
    {
      method: 'POST',
      path: stripeAPI + '/user-charge',
      config: {
        handler: function( req, rep) {
          StripeCtrl.user_charge( req, rep, stripe, server);
        },
        auth: {
          strategy: 'simple'
        }
      }
    },
    {
      method: 'GET',
      path: stripeAPI + '/pub_key',
      config: {
        handler: function( req, rep) {

          rep({pub_key: process.env.STRIPE_PUBLIC});
        }
      }
    }
  ].forEach(function (route) { server.route(route); });
};
