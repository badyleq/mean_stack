(function () {
  'use strict';
  angular
    .module('quizzes')
    .controller('SelectedQuizController', SelectedQuizController)
    .directive('minuteTicker', minuteTicker);

  SelectedQuizController.$inject = ['$scope', 'QuizzesService'];
  minuteTicker.$inject = ['$interval'];

  function SelectedQuizController($scope, QuizzesService) {

    var vm = this;
    vm.nextQuestion = nextQuestion;
    vm.previousQuestion = previousQuestion;
    vm.submit = evaluateAnswers;
    vm.write = write;
    vm.startQuiz = startQuiz;

    initData();

    function startQuiz() {
      vm.started = true;
    }


    vm.questionTemplates = QuizzesService.getQuestionTemplates();

    function write(answer) {
      vm.answers[vm.actuallySelectedQuestion] = answer;
    }

    vm.actuallySelectedQuestion = 0;
    vm.answers = [];

    function nextQuestion() {
      vm.actuallySelectedQuestion++;
      if (vm.actuallySelectedQuestion < vm.selectedQuiz.questionList.length - 1) {
        vm.hasNextQuestion = true;
        vm.hasPreviousQuestion = true;
      } else {
        vm.hasNextQuestion = false;
      }
    }

    function previousQuestion() {
      vm.actuallySelectedQuestion--;
      if (vm.actuallySelectedQuestion > 0) {
        vm.hasPreviousQuestion = true;
        vm.hasNextQuestion = true;
      } else {
        vm.hasPreviousQuestion = false;
      }
    }

    function evaluateAnswers() {

      getAnswers();

      vm.percentageScore = vm.evaluatedScore / vm.selectedQuiz.questionList.length;
      vm.percentageScore = Math.round(vm.percentageScore * 100);
      vm.summary = true;

      if (vm.percentageScore < 30) {
        vm.scoreStyle = {
          'color': 'red'
        }

      } else if (vm.percentageScore < 60) {
        vm.scoreStyle = {
          'color': 'green'
        }
      } else {
        vm.scoreStyle = {
          'color': 'rgb(0, 255, 0)'
        }
      }


    }

    function getAnswers() {
      vm.selectedQuiz.questionList.forEach(function (item, index) {
        if (item.questionType === 'selectMany') {
          if (checkSelectManyAnswers(item.questionAnswer, vm.answers[index])) {
            vm.evaluatedScore++;
          }
        } else {
          if (item.questionAnswer === vm.answers[index]) {
            vm.evaluatedScore++;
          }
        }
      })
    }

    function checkSelectManyAnswers(questionAnswer, answers) {
      return JSON.stringify(questionAnswer) === JSON.stringify(answers)
    }

    function initData() {
      var quizzesList = QuizzesService.getQuizzesList();

      if (!!QuizzesService.actuallySelectedQuiz) {
        vm.selectedQuiz = quizzesList[QuizzesService.actuallySelectedQuiz];
      } else {
        vm.selectedQuiz = quizzesList[0];
      }

      vm.hasNextQuestion = true;
      vm.hasPreviousQuestion = false;
      vm.showSubmitButtonn = vm.actuallySelectedQuestion === vm.selectedQuiz.questionList.length;
      vm.answers = [];
      vm.evaluatedScore = 0;
      vm.summary = false;
    }
  }

  function minuteTicker($interval) {
    return {
      scope: {
        numberOfMinutes: '=',
        started: '='
      },
      templateUrl: '/modules/quizzes/client/views/minute-ticker.directive.html',
      link: link
    };

    function link(scope) {

      scope.$watch('started', startInterval);
      scope.tick = true;
      scope.minutes = scope.numberOfMinutes;
      scope.seconds = '00';

      function startInterval() {
        if (scope.started) {
          $interval(callAtInterval, 1000);
        }
      }

      function callAtInterval() {
        var seconds = Number(scope.seconds),
          minutes = Number(scope.minutes);

        if (minutes > scope.numberOfMinutes / 2) {
          scope.timerStyle = {
            'color': 'rgb(0, 255, 0)'
          }
        } else if (minutes > scope.numberOfMinutes / 4) {
          scope.timerStyle = {
            'color': 'orange'
          }
        } else {
          scope.timerStyle = {
            'color': 'red'
          }
        }

        scope.tick = !scope.tick;
        if (seconds === 0) {
          minutes = minutes - 1;
          seconds = 59;
        } else {
          seconds--;
        }

        scope.minutes = parseNumber(minutes);
        scope.seconds = parseNumber(seconds);
      }
    }

    function parseNumber(value) {
      if (value < 10) {
        return '0' + value;
      } else {
        return value;
      }
    }
  }
}());
