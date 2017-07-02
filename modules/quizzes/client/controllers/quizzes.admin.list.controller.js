(function () {
  'use strict';

  angular
    .module('quizzes.admin')
    .controller('QuizzesAdminListController', QuizzesAdminListController);

  QuizzesAdminListController.$inject = ['QuizzesService'];

  function QuizzesAdminListController(QuizzesService) {
    var vm = this;

    vm.quizzesList = QuizzesService.getQuizzesList();
    vm.selectedQuiz = {};

    vm.editQuiz = editQuiz;
    vm.removeQuiz = removeQuiz;

    function removeQuiz(index) {
      vm.quizzesList.splice(index,1);
    }

    function editQuiz(index) {
      QuizzesService.actuallySelectedQuiz = index;

    }
  }
}());
