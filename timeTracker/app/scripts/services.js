'use strict';
angular.module('confusionApp')
  .constant("baseUrl", "http://localhost:3000/")
  .factory('menuFactory', ['$resource', 'baseUrl', function($resource, baseUrl) {
    var menuFac = {};

    return menuFac;
  }])
  .service('employeeFactory', ['$resource', 'baseUrl', function($resource, baseUrl) {
      this.createEmployee = function() {
        return $resource(baseUrl + "employees/", null, 
          {
            'put': {
              method: 'PUT'
            } 
          }
        );
      };
      
      this.searchEmployee = function() {
        return $resource(baseUrl + "employees/searchEmployee", null, 
          {
            'put': {
              method: 'PUT',
              isArray: true
            } 
          }
        );
      };
      this.getEmployee = function() {
        return $resource(baseUrl + "employees/:id", null, null
        );
      };

      this.saveEmployee = function() {
        return $resource(baseUrl + "employees/saveEmployee/:id", null, 
          {
            'update': {
              method: 'PUT',
              isArray: false
            } 
          }
        );
      };
    }])

    .service('meetingFactory', ['$resource', 'baseUrl', function($resource, baseUrl) {
      this.createMeeting = function() {
        return $resource(baseUrl + "meetings/", null, 
          {
            'put': {
              method: 'PUT'
            } 
          }
        );
      };
      
      this.searchMeeting = function() {
        return $resource(baseUrl + "meetings/searchMeeting", null, 
          {
            'put': {
              method: 'PUT',
              isArray: true
            } 
          }
        );
      };

      this.searchUpcomingMeeting = function() {
        return $resource(baseUrl + "meetings/searchUpcomingMeeting", null, 
          {
            'put': {
              method: 'PUT',
              isArray: true
            } 
          }
        );
      };

      this.getMeeting = function() {
        return $resource(baseUrl + "meetings/:id", null, null
        );
      };
      
      this.saveMeeting = function() {
        return $resource(baseUrl + "meetings/saveMeeting/:id", null, 
          {
            'update': {
              method: 'PUT',
              isArray: false
            } 
          }
        );
      };
    }])

  .service('taskFactory', ['$resource', 'baseUrl', function($resource, baseUrl) {
      this.createTask = function() {
        return $resource(baseUrl + "tasks/", null, 
          {
            'put': {
              method: 'PUT'
            } 
          }
        );
      };

      this.searchTask = function() {
        return $resource(baseUrl + "tasks/searchTask", null, 
          {
            'put': {
              method: 'PUT',
              isArray: true
            } 
          }
        );
      };

      this.searchPersonalTask = function() {
        return $resource(baseUrl + "tasks/searchPersonalTask", null, 
          {
            'put': {
              method: 'PUT',
              isArray: true
            } 
          }
        );
      };

      this.getTask = function() {
        return $resource(baseUrl + "tasks/:id", null, null
        );
      };
    }])

  .service('timesheetFactory', ['$resource', 'baseUrl', function($resource, baseUrl) {
      this.searchPersonalTimesheet = function() {
        return $resource(baseUrl + "timesheets/searchPersonalTimesheet", null, 
          {
            'put': {
              method: 'PUT',
              isArray: true
            } 
          }
        );
      };

      this.searchTimesheet = function() {
        return $resource(baseUrl + "timesheets/searchTimesheet", null, 
          {
            'put': {
              method: 'PUT',
              isArray: true
            } 
          }
        );
      };
      
      this.createTimesheet = function() {
        return $resource(baseUrl + "timesheets/", null, 
          {
            'put': {
              method: 'PUT'
            } 
          }
        );
      };

      this.saveTimesheet = function() {
        return $resource(baseUrl + "timesheets/saveTimesheet/:id", null, 
          {
            'update': {
              method: 'PUT',
              isArray: false
            } 
          }
        );
      };
    }])

  .service('punchinFactory', ['$resource', 'baseUrl', function($resource, baseUrl) {
      this.getPunchIn = function() {
        return $resource(baseUrl + "shift/punchin", null, 
          {
            'put': {
              method: 'PUT',
              isArray: true
            } 
          }
        );
      };

      this.punchIn = function() {
        return $resource(baseUrl + "shift/punchin/:id", null, 
          {
            'post': {
              method: 'POST',
              isArray: false
            } 
          }
        );
      };
    }])

  .service('loginFactory', ['$resource', 'baseUrl', function($resource, baseUrl) {
      this.getUsers = function() {
        return $resource(baseUrl + "login-users/find", null, null);
      };

      this.login = function() {
        return $resource(baseUrl + "login-users/login", null, null);
      };
    }]);