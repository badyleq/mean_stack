(function () {
  'use strict';

  angular
    .module('quizzes.admin')
    .controller('QuizzesAdminEditController', QuizzesAdminEditController);

  QuizzesAdminEditController.$inject = ['$state', 'QuizzesService'];

  function QuizzesAdminEditController($state, QuizzesService) {
    var vm = this;
    vm.saveQuiz = saveQuiz;

    var x = QuizzesService.getQuizzesList();
    vm.editQuestionTemplates = QuizzesService.getQuestionEditTemplates();

    vm.quizzesList = QuizzesService.getQuizzesList();
    vm.selectedQuiz = x[QuizzesService.actuallySelectedQuiz];

    if (!vm.selectedQuiz) {
      $state.go('admin.quizzes.list');
    }

    function saveQuiz() {
      $state.go('admin.quizzes.list');
    }
  }
}());

