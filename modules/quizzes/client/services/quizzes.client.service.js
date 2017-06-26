(function () {
  'use strict';

  angular
    .module('quizzes.services')
    .factory('QuizzesService', QuizzesService);

  QuizzesService.$inject = [];

  function QuizzesService() {

    var vm = this;
    vm.questionTypes = ['yesNo', 'selectOne', 'selectMany', 'text', 'matchPairs'];
    vm.actuallySelectedQuiz = null;
    vm.quizzesList = [
      {
        quizId: '1',
        quizTime: '20min',
        quizName: 'testowy Quiz wykład nr 4',
        quizAssociatedLectureId: '4',
        questionList: [
          {
            questionType: 'yesNo',
            questionText: 'Ile nóg ma pies?',
            questionOptions: ['yes', 'no'],
            questionAnswerNumber: '0'
          },
          {
            questionType: 'selectOne',
            questionText: 'Wybierz poprawną odpowiedź',
            questionOptions: ['1', '2', '3', '4'],
            questionAnswerNumber: '0'
          },
          {
            questionType: 'selectMany',
            questionText: 'Wybierz poprawne odpowiedzi',
            questionOptions: ['1', '2', '3', '4', '5'],
            questionAnswerNumber: ['0', '1']
          }
        ]
      },
      {
        quizId: '2',
        quizTime: '20min',
        quizName: 'testowy Quiz wykład nr 3',
        quizAssociatedLectureId: '3',
        questionList: [
          {
            questionType: 'yesNo',
            questionText: 'Ile nóg ma pies?',
            questionOptions: ['yes', 'no'],
            questionAnswerNumber: '1'
          },
          {
            questionType: 'selectOne',
            questionText: 'Wybierz poprawną odpowiedź',
            questionOptions: ['1', '2', '3', '4'],
            questionAnswerNumber: '1'
          },
          {
            questionType: 'selectMany',
            questionText: 'Wybierz poprawne odpowiedzi',
            questionOptions: ['1', '2', '3', '4', '5'],
            questionAnswerNumber: ['2', '3']
          }
        ]
      }
    ];

    function getQuizzesList() {
      return vm.quizzesList;
    }

    return {
      getQuizzesList: getQuizzesList
    };
  }
}());
