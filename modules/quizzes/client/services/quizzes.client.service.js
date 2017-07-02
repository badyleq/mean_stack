(function () {
  'use strict';

  angular
    .module('quizzes.services')
    .factory('QuizzesService', QuizzesService);

  QuizzesService.$inject = [];

  function QuizzesService() {

    var vm = this;

    vm.answers = [];
    vm.questionTypes = ['yesNo', 'selectOne', 'selectMany', 'text', 'matchPairs'];
    vm.actuallySelectedQuiz = null;
    vm.quizzesList = [
      {
        quizId: '1',
        quizTime: '20',
        quizName: 'testowy Quiz wykład nr 4',
        quizAssociatedLectureId: '4',
        questionList: [
          {
            questionType: 'yesNo',
            questionText: 'Ile nóg ma pies?',
            questionOptions: ['yes', 'no'],
            questionAnswer: 'yes'
          },
          {
            questionType: 'selectOne',
            questionText: 'Wybierz poprawną odpowiedź',
            questionOptions: ['1', '2', '3', '4'],
            questionAnswer: '4'
          },
          {
            questionType: 'selectMany',
            questionText: 'Wybierz poprawne odpowiedzi',
            questionOptions: ['1', '2', '3', '4', '5'],
            questionAnswer: {'1': true, '2': true}
          }
        ]
      },
      {
        quizId: '2',
        quizTime: '15',
        quizName: 'testowy Quiz wykład nr 3',
        quizAssociatedLectureId: '3',
        questionList: [
          {
            questionType: 'selectMany',
            questionText: 'Ile nóg ma pies?',
            questionOptions: ['conajmniej 2', '4', '8', 'nie ma'],
            questionAnswer: ['4', '8']
          },
          {
            questionType: 'yesNo',
            questionText: 'Wybierz poprawną odpowiedź',
            questionOptions: ['Kot', 'Orka', 'Okoń', 'Pies'],
            questionAnswer: 'Okoń'
          },
          {
            questionType: 'selectOne',
            questionText: 'Wybierz odpowiedź',
            questionOptions: ['1', '5', '52', '11', '12'],
            questionAnswer: ['5']
          }
        ]
      }
    ];

    function getQuizzesList() {
      return vm.quizzesList;
    }

    function getQuestionTemplates() {
      return {
        selectMany: '/modules/quizzes/client/views/quiz-templates/select-many-question.html',
        selectOne: '/modules/quizzes/client/views/quiz-templates/select-one-question.html',
        yesNo: '/modules/quizzes/client/views/quiz-templates/yes-no-question.html'
      };
    }


    function getQuestionEditTemplates() {
      return {
        selectMany: '/modules/quizzes/client/views/quiz-edit-templates/select-many.edit.view.html',
        selectOne: '/modules/quizzes/client/views/quiz-edit-templates/select-one.edit.template.html',
        yesNo: '/modules/quizzes/client/views/quiz-edit-templates/yes-no.edit.view.html'
      };
    }

    function getActuallySelectedQuiz() {
      return vm.quizzesList[vm.actuallySelectedQuiz];
    }

    function setActuallySelectedQuiz(index) {
      vm.actuallySelectedQuiz = index;
    }

    function addQuiz(quiz) {
      vm.quizzesList.push(quiz);
    }

    return {
      getQuizzesList: getQuizzesList,
      getQuestionTemplates: getQuestionTemplates,
      getActuallySelectedQuiz: getActuallySelectedQuiz,
      setActuallySelectedQuiz: setActuallySelectedQuiz,
      getQuestionEditTemplates: getQuestionEditTemplates,
      addQuiz: addQuiz
    };
  }
}());
