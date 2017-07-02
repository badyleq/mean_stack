(function () {
  'use strict';

  angular
    .module('quizzes.admin')
    .controller('CreateQuizAdminController', CreateQuizAdminController);

  CreateQuizAdminController.$inject = ['$state', 'QuizzesService'];

  function CreateQuizAdminController($state, QuizzesService) {
    var vm = this;

    vm.addOption = addOption;
    vm.removeQuestion = removeQuestion;
    vm.saveQuestion = saveQuestion;
    vm.submitQuiz = submitQuiz;

    vm.title = '';
    vm.quizTime = 5;
    vm.options = [''];
    vm.savedQuestionList = [];

    function addOption() {
      vm.options.push('');
    }

    function submitQuiz() {
      var quiz = {
        questionList: vm.savedQuestionList,
        quizId: '1',
        quizTime: vm.quizTime,
        quizName: vm.title
      };

      QuizzesService.addQuiz(quiz);

      $state.go('admin.quizzes.list');
    }

    function saveQuestion() {
      var preparedQuestion = {
        questionType: 'selectMany',
        questionText: vm.questionText,
        questionOptions: vm.options,
        questionAnswer: vm.optionsChecks
      };

      vm.savedQuestionList.push(preparedQuestion);
      vm.questionText = '';
      vm.options = [''];
      vm.optionsChecks = [];
    }

    function removeQuestion(index) {
      vm.options.splice(index, 1);
    }

  }
}());

// vm.addOption = addOption;
// vm.addAnswer = addAnswer;
// vm.removeOption = removeOption;
// vm.removeAnswer = removeAnswer;
//
// function removeAnswer() {
//   if (vm.numberOfAnswer > 1) {
//     vm.numberOfAnswers--;
//   }
// }
//
// function addAnswer() {
//   vm.numberOfAnswers++;
// }
//
// function removeOption() {
//   if (vm.numberOfOptions > 1) {
//     vm.numberOfOptions--;
//   }
// }
//
// function addOption() {
//   vm.numberOfOptions++;
// }

