(function () {
  'use strict';

  angular
    .module('core')
    .controller('HomeController', HomeController)
    .directive('tbCarousel', tbCarousel)
    .directive('nearestLecture', nearestLecture);

  HomeController.$inject = ['ArticlesService'];
  nearestLecture.$inject = ['$interval'];

  function HomeController(ArticlesService) {
    var vm = this;
    vm.articles = ArticlesService.query();

    vm.articles.$promise.then(function (articles) {
      articles.forEach(function (item, index) {
        parseDate(item, index);
      });
    });

    function parseDate(item, index) {
      vm.articles[index].date = item.day + '/' + item.month + '/' + item.year + ' ' + item.hour + ':' + item.minute;
    }
  }

  function tbCarousel() {
    return {
      scope: false,
      templateUrl: 'modules/core/client/views/tb-carousel.html',
      link: function (scope, element, attribute) {
      }
    };
  }

  function nearestLecture($interval) {
    return {
      scope: {
        date: '=',
        nearestLecture: '='
      },
      templateUrl: 'modules/core/client/views/nearest-lecture.client.view.html',
      link: function (scope) {
        scope.switchTick = true;
        $interval(callAtInterval, 1000);
        function callAtInterval() {
          scope.switchTick = !scope.switchTick;
          var currDate = new Date(),
            dateParts = scope.date.split('/');
          dateParts = dateParts.concat(dateParts[2].split(' '));
          dateParts.splice(2, 1);
          dateParts = dateParts.concat(dateParts[3].split(':'));
          dateParts.splice(3, 1);

          scope.yearDiff = currDate.getFullYear() - dateParts[2];
          scope.monthDiff = currDate.getMonth() - dateParts[1];
          scope.dayDiff = currDate.getUTCDay() - dateParts[0];
          scope.hourDiff = currDate.getUTCHours() - dateParts[3];
          scope.minuteDiff = currDate.getUTCMinutes() - dateParts[4];

          scope.yearDiff < 0 ? scope.yearDiff = scope.yearDiff * -1 : scope.yearDiff = scope.yearDiff;
          scope.monthDiff < 0 ? scope.monthDiff = scope.monthDiff * -1 : scope.monthDiff = scope.monthDiff;
          scope.dayDiff < 0 ? scope.dayDiff = scope.dayDiff * -1 : scope.dayDiff = scope.dayDiff;
          scope.hourDiff < 0 ? scope.hourDiff = scope.hourDiff * -1 : scope.hourDiff = scope.hourDiff;
          scope.minuteDiff < 0 ? scope.minuteDiff = scope.minuteDiff * -1 : scope.minuteDiff = scope.minuteDiff;
        }
      }
    };
  }
}());
