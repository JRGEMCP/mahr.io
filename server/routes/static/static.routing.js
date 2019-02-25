var fs = require('fs');

module.exports = function(server, root, app) {
  app.route = app.route || '';
  // server.route({
  //   path: ui.route + '/{any}',
  //   method: 'GET',
  //   handler: function(req, rep) {
  //     if( fs.existsSync(root+'/public/'+ui.name + '/' + process.env.NODE_ENV + '/'+req.params.any) ) {
  //       rep.file(ui.name  + '/' + process.env.NODE_ENV + '/'+req.params.any);
  //     } else {
  //       rep.file(ui.name  + '/' + process.env.NODE_ENV + '/index.html');
  //     }
  //   }
  // });
  // server.route({
  //   path: ui.route + '/{any*}',
  //   method: 'GET',
  //   handler: function(req, rep) {
  //     rep.file(ui.name  + '/' + process.env.NODE_ENV + '/index.html');
  //   }
  // });
  server.route({
    path: app.route + '/{any}',
    method: 'GET',
    handler: (request, reply) => {
        
        const appEntry = root.split('/');
        const fileSearch = `${appEntry.join('/')}/public/${app.name}/${app.env?app.env+'/':''}${request.params.any}`;

        if( fs.existsSync( fileSearch ) ){
            return reply.file(  fileSearch );
        } else {
            return reply.file(  `${appEntry.join('/')}/public/${app.name}/${app.env?app.env+'/':''}index.html` );
        }
    }
  });
  server.route({
      path: app.route + '/{any*}',
      method: 'GET',
      handler: (request, reply) => {
        
          const appEntry = root.split('/');
          const fileSearch = `${appEntry.join('/')}/public/${app.name}/${app.env?app.env+'/':''}${request.params.any}`;

          if (request.params.any) {
              if (fs.existsSync( fileSearch ) ) {
                  return reply.file(  fileSearch );
              } else {
                  return reply.file( `${appEntry.join('/')}/public/${app.name}/${app.env?app.env+'/':''}index.html` );
              }
          } else {
              return reply.file( `${appEntry.join('/')}/public/${app.name}/${app.env?app.env+'/':''}index.html` );
          }
      }
  });
};
