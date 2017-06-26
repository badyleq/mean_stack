(function (app) {
  'use strict';

  app.registerModule('quizzes', ['core']);// The core module is required for special route handling; see /core/client/config/core.client.routes
  // app.registerModule('articles.admin', ['core.admin']);
  // app.registerModule('articles.admin.routes', ['core.admin.routes']);
  app.registerModule('quizzes.services');
  app.registerModule('quizzes.routes', ['ui.router', 'core.routes', 'quizzes.services']);
}(ApplicationConfiguration));
