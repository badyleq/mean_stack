(function () {
  'use strict';

  angular
    .module('quizzes')
    .run(menuConfig);

  menuConfig.$inject = ['menuService'];

  function menuConfig(menuService) {
    menuService.addMenuItem('topbar', {
      title: 'Quizy',
      state: 'quizzes',
      type: 'dropdown',
      roles: ['user']
    });

    // Add the dropdown list item
    menuService.addSubMenuItem('topbar', 'quizzes', {
      title: 'Lista quizów',
      state: 'quizzes.list',
      roles: ['user']
    });
  }
}());
