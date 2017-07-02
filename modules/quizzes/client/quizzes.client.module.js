(function (app) {
  'use strict';

  app.registerModule('quizzes', ['core']);// The core module is required for special route handling; see /core/client/config/core.client.routes
  app.registerModule('quizzes.admin', ['core.admin']);
  app.registerModule('quizzes.admin.routes', ['core.admin.routes']);
  app.registerModule('quizzes.services');
  app.registerModule('quizzes.routes', ['ui.router', 'core.routes', 'quizzes.services']);
}(ApplicationConfiguration));
