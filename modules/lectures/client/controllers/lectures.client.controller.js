(function () {
  'use strict';

  angular
    .module('articles')
    .controller('ArticlesController', ArticlesController)
    .directive('lectureListDirective', lectureListDirective);

  ArticlesController.$inject = ['$scope', 'articleResolve', 'Authentication'];

  function ArticlesController($scope, article, Authentication) {
    var vm = this;

    vm.article = article;
    vm.authentication = Authentication;
  }

  function lectureListDirective() {
    return {
      scope: {
        title: '@',
        date: '@',
        description: '@',
        lecturer: '@',
        aboutLecturer: '@'
      },
      templateUrl: 'modules/lectures/client/views/lecture-list.client.directive.html',
      link: function (scope, element, attribute) {
      }
    };
  }
}());
