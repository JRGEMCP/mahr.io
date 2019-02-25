process.env.NODE_ENV = process.env.NODE_ENV || 'development';
var config = require('./config/'+process.env.NODE_ENV+'.json');
for( var key in config ) {
  if( process.env[key] ) {
    config[key] = process.env[key] || config[key];
  }
}
console.log('Running '+process.env.NODE_ENV );

require('mahrio').runServer(config, __dirname ).then( function( server ) {
  require('./routes/session/session.routing')( server, config );
  require('./routes/log/log.routing')( server );

  require('./routes/section/section.routing')( server );
  switch( config['CONTENT_TYPE'] ) {
    case 'tutorial':
      require('./routes/tutorial/tutorial.routing')( server );
      console.log('MODE: Tutorials');
      break;
    case 'article':
      require('./routes/article/article.routing')( server );
      console.log('MODE: Articles');
      break;
    default:
      require('./routes/entity/entity.routing')( server );
      console.log('MODE: Entities');
  }

  require('./routes/course/course.routing')( server );
  require('./routes/transactions/transactions.routing')( server );
  require('./routes/stripe/stripe.routing')( server );
  require('./routes/module/module.routing')( server );
  require('./routes/user/user.routing')( server );

  // for( var i in config['USER_INTERFACES']){
  //   var ui = config['USER_INTERFACES'][i];
  //   require('./routes/static/static.routing')( server, __dirname, ui);
  // }
  if( config['uis'] ) {
    config['uis'].map( app => {
      require('./routes/static/static.routing')( server, __dirname, app);
    });
}
});
