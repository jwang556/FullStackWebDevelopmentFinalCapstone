'use strict';
angular.module('confusionApp', ['ui.router', 'ngResource'])
  .config(function($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('app', {
        url: '/',
        views: {
          /*'header': {
            templateUrl: 'views/header.html'
          },*/
          'content': {
            templateUrl: 'views/home.html',
            controller: 'HomeController'
          },
          /*'footer': {
            templateUrl: 'views/footer.html'
          }*/
        }
      })
      .state('app.main', {
        url: 'main',
        views: {
          'header@': {
            templateUrl: 'views/header.html',
            controller: 'NavbarController'
          },
          'content@': {
            templateUrl: 'views/main.html',
            controller: 'AboutController'
          }
        }
      })
      .state('app.aboutus', {
        url: 'aboutus',
        views: {
          'content@': {
            templateUrl: 'views/aboutus.html',
            controller: 'AboutController'
          }
        }
      })
      .state('app.contactus', {
        url: 'contactus',
        views: {
          'content@': {
            templateUrl: 'views/contactus.html',
            controller: 'ContactController'
          }
        }
      })
      .state('app.menu', {
        url: 'menu',
        views: {
          'content@': {
            templateUrl: 'views/menu.html',
            controller: 'MenuController'
          }
        }
      })
      .state('app.newEmployee', {
        url: 'newEmployee',
        views: {
          'header@': {
            templateUrl: 'views/header.html',
            controller: 'NavbarController'
           },
          'content@': {
            templateUrl: 'views/newEmployee.html',
            controller: 'NewEmployeeController'
          }
        }
      })
      .state('app.personalTimesheet', {
        url: 'personalTimesheet',
        views: {
          'header@': {
            templateUrl: 'views/header.html',
            controller: 'NavbarController'
           },
          'content@': {
            templateUrl: 'views/personalTimesheet.html',
            controller: 'PersonalTimesheetController'
          }
        }
      })
      .state('app.timesheet', {
        url: 'timesheet',
        views: {
          'header@': {
            templateUrl: 'views/header.html',
            controller: 'NavbarController'
           },
          'content@': {
            templateUrl: 'views/timesheet.html',
            controller: 'TimesheetController'
          }
        }
      })
      .state('app.managerTimesheet', {
        url: 'managerTimesheet',
        views: {
          'header@': {
            templateUrl: 'views/header.html',
            controller: 'NavbarController'
           },
          'content@': {
            templateUrl: 'views/managerTimesheet.html',
            controller: 'ManagerTimesheetController'
          }
        }
      })
      .state('app.editEmployee', {
        url: 'editEmployee',
        views: {
          'header@': {
            templateUrl: 'views/header.html',
            controller: 'NavbarController'
           },
          'content@': {
            templateUrl: 'views/editEmployee.html',
            controller: 'EditEmployeeController'
            
          }
        }
      })
      .state('app.newTask', {
        url: 'newTask',
        views: {
          'header@': {
            templateUrl: 'views/header.html',
            controller: 'NavbarController'
           },
          'content@': {
            templateUrl: 'views/newTask.html',
            controller: 'newTaskController'
          }
        }
      })
      .state('app.editTask', {
        url: 'editTask',
        views: {
          'header@': {
            templateUrl: 'views/header.html',
            controller: 'NavbarController'
           },
          'content@': {
            templateUrl: 'views/editTask.html',
            controller: 'editTaskController'
          }
        }
      })
      .state('app.summary', {
        url: 'summary',
        views: {
          'header@': {
            templateUrl: 'views/header.html',
            controller: 'NavbarController'
           },
          'content@': {
            templateUrl: 'views/summary.html',
            controller: 'summaryController'
          }
        }
      })
      .state('app.newMeeting', {
        url: 'newMeeting',
        views: {
          'header@': {
            templateUrl: 'views/header.html',
            controller: 'NavbarController'
           },
          'content@': {
            templateUrl: 'views/newMeeting.html',
            controller: 'newMeetingController'
          }
        }
      })
      .state('app.existingMeeting', {
        url: 'existingMeeting',
        views: {
          'header@': {
            templateUrl: 'views/header.html',
            controller: 'NavbarController'
           },
          'content@': {
            templateUrl: 'views/existingMeeting.html',
            controller: 'existingMeetingController'
          }
        }
      })
      .state('app.upcomingMeeting', {
        url: 'upcomingMeeting',
        views: {
          'header@': {
            templateUrl: 'views/header.html',
            controller: 'NavbarController'
           },
          'content@': {
            templateUrl: 'views/upcomingMeeting.html',
            controller: 'upcomingMeetingController'
          }
        }
      })
      .state('app.punchIn', {
        url: 'punchIn',
        views: {
          'header@': {
            templateUrl: 'views/header.html',
            controller: 'NavbarController'
           },
          'content@': {
            templateUrl: 'views/punchIn.html',
            controller: 'punchInController'
          }
        }
      })
      .state('app.dishdetails', {
        url: 'menu/:id',
        views: {
          'content@': {
            templateUrl: 'views/dishdetail.html',
            controller: 'DishDetailController'
          }
        }
      });
    $urlRouterProvider.otherwise('/');
  });

