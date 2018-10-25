var fs = require('fs');

module.exports = function(server, root, ui) {
  ui.route = ui.route || '';
  server.route({
    path: ui.route + '/{any}',
    method: 'GET',
    handler: function(req, rep) {
      if( fs.existsSync(root+'/public/'+ui.name + '/' + process.env.NODE_ENV + '/'+req.params.any) ) {
        rep.file(ui.name  + '/' + process.env.NODE_ENV + '/'+req.params.any);
      } else {
        rep.file(ui.name  + '/' + process.env.NODE_ENV + '/index.html');
      }
    }
  });
  server.route({
    path: ui.route + '/{any*}',
    method: 'GET',
    handler: function(req, rep) {
      rep.file(ui.name  + '/' + process.env.NODE_ENV + '/index.html');
    }
  });
};
