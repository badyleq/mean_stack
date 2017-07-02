(function () {
  'use strict';

  angular
    .module('quizzes.routes')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
      .state('quizzes', {
        abstract: true,
        url: '/quizzes',
        template: '<ui-view/>'
      })
      .state('quizzes.list', {
        url: '',
        templateUrl: '/modules/quizzes/client/views/list-quizzes.client.view.html',
        controller: 'QuizzesListController',
        controllerAs: 'vm',
        data: {
          pageTitle: 'Quizzes List'
        }
      })
      .state('quizzes.select', {
        url: '/select',
        templateUrl: '/modules/quizzes/client/views/selected-quizz.client.view.html',
        controller: 'SelectedQuizController',
        controllerAs: 'vm',
        data: {
          pageTitle: 'Selected Quiz'
        },
        css: '../css/quizzes.css'
      });
  }
}());
