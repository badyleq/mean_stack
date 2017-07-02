(function () {
  'use strict';

  angular
    .module('articles.admin')
    .controller('ArticlesAdminController', ArticlesAdminController);

  var monthsLengthConst = {
      LONG_USUAL: 31,
      SHORT_USUAL: 30,
      LONG_FEB: 29,
      SHORT_FEB: 28
    },
    monthsDictionary = {
      '01': 31,
      '03': 31,
      '04': 30,
      '05': 31,
      '06': 30,
      '07': 31,
      '08': 31,
      '09': 30,
      '10': 31,
      '11': 30,
      '12': 31
    };


  ArticlesAdminController.$inject = ['$scope', '$state', '$window', 'articleResolve', 'Authentication', 'Notification'];

  function ArticlesAdminController($scope, $state, $window, article, Authentication, Notification) {
    var vm = this,
      i;

    vm.dateElements = [
      {
        view: 'Rok', type: 'year'
      },
      {
        view: 'Miesiąc', type: 'month'
      },
      {
        view: 'Dzień', type: 'day'
      },
      {
        view: 'Godzina', type: 'hour'
      },
      {
        view: 'Minuta', type: 'minute'
      }
    ];
    vm.article = article;
    vm.authentication = Authentication;
    vm.form = {};
    vm.remove = remove;
    vm.save = save;
    vm.setNow = setNow;
    vm.startDictation = startDictation;
    vm.addDay = addDay;

    vm.article.years = [];
    vm.article.months = [];
    vm.article.hours = [];
    vm.article.minutes = [];

    prepareDataForSelectBoxes();


    $scope.$watchGroup(['vm.article.year', 'vm.article.month'], function () {
      if (vm.article.year && vm.article.month) {
        prepareDaysArrayForSelectedDate(vm.article.year, vm.article.month);
      }
    });

    function addDay() {
      var lastDayOfMonth,
        date = new Date();
      date.setFullYear(vm.article.year, vm.article.month, 0);
      lastDayOfMonth = date.getUTCDate();

      if (vm.article.day < lastDayOfMonth) {
        vm.article.day = (vm.article.day < 9 ? '0' + (parseInt(vm.article.day, 10) + 1) : parseInt(vm.article.day, 10) + 1);
      } else {

        if (vm.article.month < 12) {
          vm.article.month = (vm.article.month < 9 ? '0' + (parseInt(vm.article.month, 10) + 1) : parseInt(vm.article.month, 10) + 1);
          vm.article.day = '01';
        } else {
          vm.article.year = parseInt(vm.article.year, 10) + 1;
          vm.article.month = '01';
          vm.article.day = '01';
        }
      }
    }

    function setNow() {
      vm.article.year = parseDate('year');
      vm.article.month = parseDate('month');
      vm.article.day = parseDate('day');
      vm.article.hour = parseDate('hour');
      vm.article.minute = parseDate('minute');
    }

    function parseDate(part) {
      vm.date = new Date();
      switch (part) {
        case 'year': {
          return vm.date.getFullYear();
        }
        case 'month': {
          var month = vm.date.getMonth() + 1;
          if (month < 10) {
            return '0' + month;
          } else {
            return vm.date.getMonth();
          }
        }
        case 'day': {
          if (vm.date.getUTCDate() < 10) {
            return '0' + vm.date.getUTCDate();
          } else {
            return vm.date.getUTCDate();
          }
        }
        case 'hour': {
          if (roundHour(vm.date.getHours()) < 10) {
            return '0' + vm.date.getHours();
          } else {
            return vm.date.getHours();
          }
        }
        case 'minute': {
          if (roundMinutes(vm.date.getMinutes()) === 0) {
            return '00';
          } else {
            return roundMinutes(vm.date.getMinutes());
          }
        }
      }
    }

    function prepareDataForSelectBoxes() {
      vm.article.years = prepareDateArray(100, 2000);
      vm.article.months = prepareDateArray(12, 1);
      vm.article.hours = prepareDateArray(24);
      vm.article.minutes = prepareDateArray(60, 0, 15);

      if (vm.article.year && vm.article.month) {
        prepareDaysArrayForSelectedDate(vm.article.year, vm.article.month);
      }
    }

    function roundMinutes(value) {
      if (value <= 15) {
        return 15;
      } else if (value <= 30) {
        return 30;
      } else if (value <= 45) {
        return 45;
      } else return 0;
    }

    function prepareDaysArrayForSelectedDate(year, month) {
      vm.article.days = [];
      var i;

      if (!isLeapYear(year)) {
        if (month === '02') {
          vm.article.days = prepareDateArray(monthsLengthConst.SHORT_FEB, 1);
        } else {
          vm.article.days = prepareDateArray(monthsDictionary[month], 1);
        }
      } else {
        if (month === '02') {
          vm.article.days = prepareDateArray(monthsLengthConst.LONG_FEB, 1);
        } else {
          vm.article.days = prepareDateArray(monthsDictionary[month], 1);
        }
      }
    }

    function isLeapYear(year) {
      return (year % 400 === 0) || (year % 100 !== 0 && year % 4 === 0);
    }

    function prepareDateArray(length, firstIndex, step) {
      var array = [];

      var a = !firstIndex && !step;

      if (!firstIndex) {
        firstIndex = 0;
      }

      if (!step) {
        step = 1;
      }

      for (i = firstIndex; i < length + firstIndex; i = i + step) {
        if (i < 10) {
          array.push('0' + i);
        } else {
          array.push(i.toString());
        }
      }

      return array;
    }

    function roundHour(hour, minute) {
      if (minute < 45) {
        return hour;
      } else return hour + 1;
    }

    function startDictation(element) {

      if (window.hasOwnProperty('webkitSpeechRecognition')) {

        var recognition = new webkitSpeechRecognition();

        recognition.continuous = false;
        recognition.interimResults = false;

        recognition.lang = 'pl-PL';
        recognition.start();

        recognition.onresult = function (e) {
          document.getElementById(element).value
            = e.results[0][0].transcript;
          recognition.stop();
        };

        recognition.onerror = function (e) {
          recognition.stop();
        };
      }
    }

    // Remove existing Article
    function remove() {
      if ($window.confirm('Czy jesteś pewny, że chcesz usunąć ten wykład?')) {
        vm.article.$remove(function () {
          $state.go('admin.articles.list');
          Notification.success(
            {
              message: '<i class="glyphicon glyphicon-ok"></i> Artykuł usunięty pomyślnie!'
            });
        });
      }
    }

    // Save Article
    function save(isValid) {
      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'vm.form.articleForm');
        return false;
      }

      // Create a new article, or update the current instance
      vm.article.createOrUpdate()
        .then(successCallback)
        .catch(errorCallback);

      function successCallback(res) {
        $state.go('admin.articles.list'); // should we send the User to the list or the updated Article's view?
        Notification.success(
          {
            message: '<i class="glyphicon glyphicon-ok"></i> Article saved successfully!'
          });
      }

      function errorCallback(res) {
        Notification.error({
          message: res.data.message,
          title: '<i class="glyphicon glyphicon-remove"></i> Article save error!'
        });
      }
    }
  }
}());
