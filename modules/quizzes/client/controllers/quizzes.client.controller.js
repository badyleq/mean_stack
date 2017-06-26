(function () {
  'use strict';

  angular
    .module('quizzes')
    .controller('QuizzesListController', QuizzesListController);

  QuizzesListController.$inject = ['$scope', 'QuizzesService'];

  function QuizzesListController($scope, QuizzesService) {
    var vm = this;

    vm.quizzesList = QuizzesService.getQuizzesList();

    vm.selectQuiz = selectQuiz;

    function selectQuiz(index) {
      QuizzesService.actuallySelectedQuiz = index;
    }
  }
}());
