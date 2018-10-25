require('./article.model');

var ArticleCtrl = require('./article.ctrl'),
  versionedAPI = '/api/v1/articles';

module.exports = function( server ) {
  [
    {
      method: 'GET',
      path: versionedAPI + '/{link?}',
      config: {
        handler: ArticleCtrl.get,
        auth: {
          mode: 'try',
          strategy: 'simple'
        }
      }
    },
    {
      method: 'POST',
      path: versionedAPI,
      config: {
        handler: ArticleCtrl.create,
        auth: 'simple'
      }
    },
    {
      method: 'PUT',
      path: versionedAPI + '/{id}/{section}',
      config: {
        handler: ArticleCtrl.update,
        auth: 'simple'
      }
    },
    {
      method: 'DELETE',
      path: versionedAPI + '/{id}',
      config: {
        handler: ArticleCtrl.remove,
        auth: 'simple'
      }
    },
  ].forEach(function (route) { server.route(route); });
};
