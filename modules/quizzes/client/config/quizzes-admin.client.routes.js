(function () {
  'use strict';

  angular
    .module('quizzes.admin.routes')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
      .state('admin.quizzes', {
        abstract: true,
        url: '/quizzes',
        template: '<ui-view/>'
      })
      .state('admin.quizzes.list', {
        url: '',
        templateUrl: '/modules/quizzes/client/views/admin-list-quizzes.client.view.html',
        controller: 'QuizzesAdminListController',
        controllerAs: 'vm',
        data: {
          roles: ['admin']
        }
      })
      .state('admin.quizzes.create', {
        url: '/create',
        templateUrl: '/modules/quizzes/client/views/admin.quiz-create.view.html',
        controller: 'CreateQuizAdminController',
        controllerAs: 'vm',
        data: {
          roles: ['admin']
        }
      })
      .state('admin.quizzes.edit', {
        url: '/edit',
        templateUrl: '/modules/quizzes/client/views/admin.edit-quiz.html',
        controller: 'QuizzesAdminEditController',
        controllerAs: 'vm',
        data: {
          roles: ['admin']
        }
      });
  }
}());
