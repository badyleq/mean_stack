(function () {
  'use strict';

  angular
    .module('quizzes')
    .controller('SelectedQuizController', SelectedQuizController);

  SelectedQuizController.$inject = ['$scope', 'QuizzesService'];

  function SelectedQuizController($scope, QuizzesService) {

    var vm = this;

    var quizzesList = QuizzesService.getQuizzesList();
    if (!!QuizzesService.actuallySelectedQuiz) {
      vm.selectedQuiz = quizzesList[QuizzesService.actuallySelectedQuiz];
    } else {
      vm.selectedQuiz = quizzesList[0];
    }
  }
}());
