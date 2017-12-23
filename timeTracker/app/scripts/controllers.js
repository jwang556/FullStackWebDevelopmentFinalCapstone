'use strict';

//var app = angular.module('conFusion', ['ui.bootstrap']);
//var app = angular.module("confusionApp", ['ui.bootstrap']);
var app = angular.module("confusionApp");

app.config(['$httpProvider', function($httpProvider) {

        $httpProvider.defaults.useXDomain = true;

        delete $httpProvider.defaults.headers.common['X-Requested-With'];

    }

]);

app.controller('HomeController', ['$scope', 'loginFactory', '$state', '$window', function($scope, loginFactory, $state, $window) {
    $scope.token = "";
    $scope.username = "";
    $scope.password = "";
    $scope.login = function(){
    $window.sessionStorage.setItem("SavedString","I'm a value saved with SessionStorage");
    
    //RETRIEVE VALUE
    $scope.name = $window.sessionStorage.getItem("SavedString");
    console.log($scope.name);
      loginFactory.login().save({'username': $scope.username, 'password': $scope.password}, function(resp, headers){
        //success callback
        if(resp && resp.token)
          $scope.token = resp.token;

        $window.sessionStorage.setItem("token", resp.token);
        $window.sessionStorage.setItem("username", $scope.username);
        $window.sessionStorage.setItem("employeeId", resp.employeeId);
        console.log('success');
        console.log(resp);
        $state.go('app.main');
      },
      function(err){
        // error callback
        console.log('failure');
        console.log(err);
      });
    }
}]);


app.controller('NavbarController', ['$scope', function($scope) {
    $scope.employeeDropdownShow = false;
    $scope.timeinfoDropdownShow = false;
    $scope.meetingsDropdownShow = false;

    $scope.employeeHoverOver = false;
    $scope.timeinfoHoverOver = false;
    $scope.meetingsHoverOver = false;

    $scope.closeEmployeeDropdown = function(){
      if(!$scope.employeeHoverOver)
      {

        show = false;
        $scope.showEmployeeDropdown = false;
      }
    }

    $scope.overEmployeeDropdown = function(){
      $scope.employeeHoverOver = true;
    }

    $scope.leaveEmployeeDropdown = function(){
      $scope.employeeHoverOver = false;
    }

    $scope.closeTimeinfoDropdown = function(){
      if(!$scope.timeinfoHoverOver)
      {

        show = false;
        $scope.showTimeinfoDropdown = false;
      }
    }

    $scope.overTimeinfoDropdown = function(){
      $scope.timeinfoHoverOver = true;
    }

    $scope.leaveTimeinfoDropdown = function(){
      $scope.timeinfoHoverOver = false;
    }

    $scope.closeMeetingsDropdown = function(){
      if(!$scope.meetingsHoverOver)
      {

        show = false;
        $scope.showMeetingsDropdown = false;
      }
    }

    $scope.overMeetingsDropdown = function(){
      $scope.meetingsHoverOver = true;
    }

    $scope.leaveMeetingsDropdown = function(){
      $scope.meetingsHoverOver = false;
    }
}]);

app.controller('NewEmployeeController', ['$scope', 'employeeFactory', function($scope, employeeFactory) {
   $scope.newEmployee = {
    firstName: "",
    lastName: "",
    username: "",
    password: "",
    hireDate: "",
    dateOfBirth: "",
    gender: "",
    manager: "Select One",
    homeAddress: "",
    email: "",
    phoneNumberLandline: "",
    phoneNumberCell: ""
  };

  $scope.employeeList = [];

  employeeFactory.searchEmployee().put(function(resp, headers){
        console.log('success');
        console.log(resp);
        $scope.employeeList = resp;
        //$state.go('app.main');
      },
      function(err){
        // error callback
        console.log('failure');
        console.log(err);
      });

  $scope.createEmployee = function()
  {
    console.log($scope.newEmployee);
    if($scope.newEmployee.manager == "Select One")
      $scope.newEmployee.manager = null;

    employeeFactory.createEmployee().put($scope.newEmployee, function(resp, headers){
        //success callback
      if(resp && resp.token)
          $scope.token = resp.token;
        console.log('success');
        console.log(resp);
        $scope.newEmployee.manager = "Select One";
      },
      function(err){
        // error callback
        $scope.newEmployee.manager = "Select One";
        console.log('failure');
        console.log(err);
      });
  }


}]);

app.controller('EditEmployeeController', ['$scope', 'employeeFactory', function($scope, employeeFactory) {
  $scope.searchEmployee = {
    firstName: "",
    lastName: "",
    hireDate: "",
    dateOfBirth: "",
    gender: ""
  }

  $scope.employeeModal = {
    _id: "",
    firstName: "",
    lastName: "",
    username: "",
    password: "",
    hireDate: "",
    dateOfBirth: "",
    gender: "",
    manager: "",
    homeAddress: "",
    email: "",
    phoneNumberLandline: "",
    phoneNumberCell: ""
  };

  $scope.employeeResult = [];
  $scope.employeeList = [];
  $scope.manager = "Default";
   employeeFactory.searchEmployee().put(function(resp, headers){
        console.log('success');
        console.log(resp);
        $scope.employeeList = resp;
      },
      function(err){
        // error callback
        console.log('failure');
        console.log(err);
      });

   $scope.fade = "fade";
  $scope.visible = "";

  $scope.open = function(item) {
    $scope.fade = "";
    $scope.visible = "visible";    
    $scope.employeeModal._id = item._id;
    $scope.employeeModal.firstName = item.firstName;
    $scope.employeeModal.lastName = item.lastName;
    $scope.employeeModal.username = item.username;
    $scope.employeeModal.password = item.password;
    $scope.employeeModal.hireDate = item.hireDate;
    $scope.employeeModal.dateOfBirth = item.dateOfBirth;
    $scope.employeeModal.gender = item.gender;
    $scope.employeeModal.manager = item.manager;
    $scope.employeeModal.homeAddress = item.homeAddress;
    $scope.employeeModal.email = item.email;
    $scope.employeeModal.phoneNumberLandline = item.phoneNumberLandline;
    $scope.employeeModal.phoneNumberCell = item.phoneNumberCell;
    
    if(item && item.manager)
    {
      $scope.manager = item.manager._id;
    }
    else
    {
      $scope.manager = "Default";
    }
  }

  $scope.close = function() {
    $scope.fade = "fade";
    $scope.visible = "";
  }

  $scope.employeeSearch = function(){    
    employeeFactory.searchEmployee().put($scope.searchEmployee, function(resp, headers){
        console.log('success');
        console.log(resp);
        $scope.employeeResult = resp;
        //$state.go('app.main');
      },
      function(err){
        // error callback
        console.log('failure');
        console.log(err);
      });
  };

  $scope.removeEmployee = function(id){

    employeeFactory.getEmployee().delete({
      id: id
    })
    .$promise.then(
      function(response) {
        console.log('success');
        console.log(response);
      },
      function(response) {
        console.log('failure');
        console.log(response);
      }
    );
  }

  $scope.saveEmployee = function()
  {
    if($scope.manager != "Default")
      $scope.employeeModal.manager = $scope.manager;
    else
      $scope.employeeModal.manager = null;

    employeeFactory.saveEmployee().update({
      id: $scope.employeeModal._id
    }, $scope.employeeModal)
    .$promise.then(
      function(response) {
        console.log('success');
        console.log(response);
      },
      function(response) {
        console.log('failure');
        console.log(response);
      }
    );
  }
}])

app.controller('newTaskController', ['$scope', 'employeeFactory', 'taskFactory', function($scope, employeeFactory, taskFactory) {

  $scope.fade = "fade";
  $scope.visible = "";

  $scope.newTask = {
    title: "",
    leader: "Select One",
    startDate: "",
    endDate: "",
    assignee: [],
    notes: ""
  };

  $scope.selectedTaskAssignee = [];
  $scope.selectedAssigneeMap = [];
  $scope.selectedAssigneeList = [];

  employeeFactory.searchEmployee().put(function(resp, headers){
        console.log('success');
        console.log(resp);
        $scope.leaderList = resp;
        $scope.assigneeList = resp;

        for(var i=0; i< $scope.assigneeList.length; i++)
        {
          $scope.selectedAssigneeMap[$scope.assigneeList[i]._id] = $scope.assigneeList[i];
        }
      },
      function(err){
        // error callback
        console.log('failure');
        console.log(err);
  });

  $scope.addAssignee = function() {
    $scope.newTask.assignee.push({_id: $scope.selectedTaskAssignee[0]});
    $scope.selectedAssigneeList[$scope.selectedTaskAssignee[0]] = {_id: $scope.selectedTaskAssignee, name: $scope.selectedAssigneeMap[$scope.selectedTaskAssignee[0]].firstName + ' ' +
    $scope.selectedAssigneeMap[$scope.selectedTaskAssignee[0]].lastName};
  }

  $scope.getAssigneeListDisplay = function() {
    var result = [];

    for (var key in $scope.selectedAssigneeList) {
      result.push($scope.selectedAssigneeList[key]);
    }

    return result;
  }

  $scope.removeAssignee = function(id) {
    delete $scope.selectedAssigneeList[id];
    $scope.newTask.assignee = [];
    for (var key in $scope.selectedAssigneeList) {
      $scope.newTask.assignee.push({_id: key});
    }
  }

  $scope.createTask = function() {
    $scope.newTask.startDate = new Date($scope.startDate.toString()).toString();
    $scope.newTask.endDate = new Date($scope.endDate.toString()).toString();

    taskFactory.createTask().put($scope.newTask, function(resp, headers){
        //success callback
      if(resp && resp.token)
          $scope.token = resp.token;
        console.log('success');
        console.log(resp);
        //$state.go('app.main');
      },
      function(err){
        // error callback
        console.log('failure');
        console.log(err);
      });
    }
}])
app.controller('editTaskController', ['$scope', 'employeeFactory', 'taskFactory', function($scope, employeeFactory, taskFactory) {

  $scope.searchTask = {
    title: "",
    leader: "Select One",
    startDate: "",
    endDate: ""
  };

  $scope.taskModal = {
    tite: "",
    leader: "Select One",
    startDate: "",
    endDate: "",
    assignee: [],
    notes: ""
  };

    $scope.selectedAssigneeMap = [];

   employeeFactory.searchEmployee().put(function(resp, headers){
        console.log('success');
        console.log(resp);
        $scope.leaderList = [{_id: "Select One", firstName: "Select One", lastName: ""}];
        for(var i=0; i< resp.length; i++)
        {
          $scope.leaderList.push(resp[i]);
        }

        $scope.assigneeList = resp;
        for(var i=0; i< $scope.assigneeList.length; i++)
        {
          console.log('assigneeMap');
          $scope.selectedAssigneeMap[$scope.assigneeList[i]._id] = $scope.assigneeList[i];
        }
      },
      function(err){
        // error callback
        console.log('failure');
        console.log(err);
  });


  $scope.taskSearch = function(){    
    taskFactory.searchTask().put($scope.searchTask, function(resp, headers){
        console.log('success');
        console.log(resp);
        $scope.taskResult = resp;
      },
      function(err){
        // error callback
        console.log('failure');
        console.log(err);
      });
  };

  $scope.removeTask = function(id){

    taskFactory.getTask().delete({
      id: id
    })
    .$promise.then(
      function(response) {
        console.log('success');
        console.log(response);
      },
      function(response) {
        console.log('failure');
        console.log(response);
      }
    );
  }

  $scope.open = function(item) {
    $scope.fade = "";
    $scope.visible = "visible"; 
    $scope.taskModal._id = item._id;
    $scope.taskModal.title = item.title;

    for(var i=0; i< $scope.leaderList.length; i++)
    {
      if($scope.leaderList[i]._id == item.leader._id)
        $scope.leader = $scope.leaderList[i];
    }

    $scope.selectedAssigneeList = [];
    for(var i=0; i< item.assignee.length; i++)
    {
      $scope.selectedAssigneeList[item.assignee[i]['_id']] = {_id: item.assignee[i]['_id'], 
        name: $scope.selectedAssigneeMap[item.assignee[i]['_id']]['firstName'] + ' ' + $scope.selectedAssigneeMap[item.assignee[i]['_id']]['lastName']
      };
    }

    $scope.startDate = new Date(item.startDate);
    $scope.endDate = new Date(item.endDate);
    $scope.taskModal.assignee = item.assignee;
    $scope.taskModal.notes = item.notes;
  }

  $scope.close = function() {
    $scope.fade = "fade";
    $scope.visible = "";
  }

  $scope.getAssigneeListDisplay = function() {
    var result = [];

    for (var key in $scope.selectedAssigneeList) {
      result.push($scope.selectedAssigneeList[key]);
    }

    return result;
  }

   $scope.removeAssignee = function(id) {
    delete $scope.selectedAssigneeList[id];
    $scope.taskModal.assignee = [];
    for (var key in $scope.selectedAssigneeList) {
      $scope.taskModal.assignee.push({_id: key});
    }
  }

}])

app.controller('newMeetingController', ['$scope', 'meetingFactory', 'employeeFactory', function($scope, meetingFactory, employeeFactory) {
    $scope.newMeeting = {
    title: "",
    host: "Select One",
    startTime: "",
    endTime: "",
    duration: {hour: 0, minute: 0},
    attendee: [],
    notes: "",
    };

    $scope.selectedAttendee;
    $scope.selectedAttendeeMap = [];
    $scope.selectedAttendeeList = [];

   employeeFactory.searchEmployee().put(function(resp, headers){
        console.log('success');
        console.log(resp);
        $scope.hostList = resp;
        $scope.attendeeList = resp;
        for(var i=0; i< $scope.attendeeList.length; i++)
        {
          $scope.selectedAttendeeMap[$scope.attendeeList[i]._id] = $scope.attendeeList[i];

        }
      },
      function(err){
        // error callback
        console.log('failure');
        console.log(err);
      });

  $scope.close = function() {
    $scope.fade = "fade";
    $scope.visible = "";
  }

  $scope.addAttendee = function() {
    $scope.newMeeting.attendee.push({_id: $scope.selectedAttendee[0], status: 'undecided'});
    console.log($scope.selectedAttendee);
    console.log($scope.attendeeList);
    $scope.selectedAttendeeList[$scope.selectedAttendee[0]] = {_id: $scope.selectedAttendee[0], name: $scope.selectedAttendeeMap[$scope.selectedAttendee[0]].firstName + ' ' +
    $scope.selectedAttendeeMap[$scope.selectedAttendee[0]].lastName, status: 'undecided'};
    console.log('selected attendee list');
    console.log($scope.selectedAttendeeList);
  }

  $scope.removeAttendee = function(id) {
    delete $scope.selectedAttendeeList[id];
    $scope.newMeeting.attendee = [];
    for (var key in $scope.selectedAttendeeList) {
      $scope.newMeeting.attendee.push({_id: key, status:  $scope.selectedAttendeeList[key].status});
    }
  }

  $scope.getAttendeeListDisplay = function() {
    var result = [];

    for (var key in $scope.selectedAttendeeList) {
      result.push($scope.selectedAttendeeList[key]);
    }

    return result;
  }

  $scope.createMeeting = function() {
    console.log('createMeeting');
    console.log($scope.newMeeting);
    var startTimeStr = $scope.newMeeting.startTime.toString();
    var endTimeStr = $scope.newMeeting.endTime.toString();
    console.log(startTimeStr);
    var sDate = new Date(startTimeStr);
    console.log(sDate.toString());
    console.log(sDate.getDate());
    //var year = startTimeStr.substring(11, 14);
    //var month = 
    console.log(endTimeStr);

    $scope.newMeeting.startTime = new Date($scope.startTime.toString()).toString();
    $scope.newMeeting.endTime = new Date($scope.endTime.toString()).toString();

    console.log($scope.newMeeting);

      employeeFactory.searchEmployee().put(function(resp, headers){
        console.log('success');
        console.log(resp);
        $scope.hostList = resp;
        $scope.attendeeList = resp;
        for(var i=0; i< $scope.attendeeList.length; i++)
        {
          $scope.selectedAttendeeMap[$scope.attendeeList[i]._id] = $scope.attendeeList[i];

        }

        console.log($scope.selectedAttendeeMap);
        //$state.go('app.main');
      },
      function(err){
        // error callback
        console.log('failure');
        console.log(err);
      });

    meetingFactory.createMeeting().put($scope.newMeeting, function(resp, headers){
        //success callback
      if(resp && resp.token)
          $scope.token = resp.token;
        console.log('success');
        console.log(resp);
        //$state.go('app.main');
      },
      function(err){
        // error callback
        console.log('failure');
        console.log(err);
      });
    }
}]);

app.controller('existingMeetingController', ['$scope', 'employeeFactory', 'meetingFactory', function($scope, employeeFactory, meetingFactory) {
  $scope.fade = "fade";
  $scope.visible = "";
  $scope.searchMeeting = {
    title: "",
    host: "Select One",
    startTime: "",
    endTime: "",
    duration: {hours: "", minutes: ""}
  };

  $scope.meetingModal = {
    _id: "",
    attendee: [],
    duration: {},
    startTime: "",
    endTime: "",
    host: "Select One",
    notes: "",
    title: ""
  };

  $scope.selectedAttendee = {details: {}};
  $scope.selectedAttendeeMap = [];
  //$scope.selectedAttendeeList = [];
  $scope.selectedAttendeeList = [];

  employeeFactory.searchEmployee().put(function(resp, headers){
        console.log('success');
        console.log(resp);
        //$scope.hostList = resp;
        $scope.hostList = [{_id: "Select One", firstName: "Select One", lastName: ""}];
        for(var i=0; i< resp.length; i++)
        {
          $scope.hostList.push(resp[i]);

        }
        console.log($scope.hostList);
        $scope.attendeeList = resp;
        for(var i=0; i< $scope.attendeeList.length; i++)
        {
          $scope.selectedAttendeeMap[$scope.attendeeList[i]._id] = $scope.attendeeList[i];

        }

        console.log($scope.selectedAttendeeMap);

        //$state.go('app.main');
      },
      function(err){
        // error callback
        console.log('failure');
        console.log(err);
      });


  $scope.open = function(item) {
    $scope.fade = "";
    $scope.visible = "visible";

    $scope.meetingModal._id = item._id;
    $scope.meetingModal.attendee = item.attendee;
    $scope.meetingModal.duration = item.duration;
    $scope.endTime = new Date(item.endTime);
    for(var i=0; i< $scope.hostList.length; i++)
    {
      if($scope.hostList[i]._id == item.host._id)
        $scope.host = $scope.hostList[i];
    }
    
    $scope.meetingModal.notes = item.notes;
    $scope.startTime = new Date(item.startTime);
    $scope.meetingModal.title = item.title;
    $scope.selectedAttendeeList = [];
    for(var i=0; i< item.attendee.length; i++)
    {
      $scope.selectedAttendeeList[$scope.meetingModal.attendee[i]['_id']] = {_id: $scope.meetingModal.attendee[i]['_id'], status:  $scope.meetingModal.attendee[i]['status'],
        name: $scope.selectedAttendeeMap[$scope.meetingModal.attendee[i]['_id']]['firstName'] + ' ' + $scope.selectedAttendeeMap[$scope.meetingModal.attendee[i]['_id']]['lastName']
      };
    }
  }

  $scope.close = function() {
    $scope.fade = "fade";
    $scope.visible = "";
  }

  $scope.meetingSearch = function(){
    meetingFactory.searchMeeting().put($scope.searchMeeting, function(resp, headers){
        console.log('success');
        console.log(resp);
        $scope.meetingResult = resp;
        //$state.go('app.main');
      },
      function(err){
        // error callback
        console.log('failure');
        console.log(err);
      });
  }

  $scope.addAttendee = function() {
    $scope.meetingModal.attendee.push({_id: $scope.selectedAttendee[0], status: 'undecided'});
    $scope.selectedAttendeeList[$scope.selectedAttendee[0]] = {_id: $scope.selectedAttendee[0], name: $scope.selectedAttendeeMap[$scope.selectedAttendee[0]].firstName + ' ' +
    $scope.selectedAttendeeMap[$scope.selectedAttendee[0]].lastName, status: 'undecided'};
  }

  $scope.removeAttendee = function(id) {
    delete $scope.selectedAttendeeList[id];
    console.log($scope.selectedAttendeeList);
    $scope.meetingModal.attendee = [];
    for (var key in $scope.selectedAttendeeList) {
      $scope.meetingModal.attendee.push({_id: key, status:  $scope.selectedAttendeeList[key].status});
    }
  }

  $scope.getAttendeeListDisplay = function() {
    var result = [];

    for (var key in $scope.selectedAttendeeList) {
      result.push($scope.selectedAttendeeList[key]);
    }

    return result;
  }

  $scope.removeMeeting = function(id){
    meetingFactory.getMeeting().delete({
      id: id
    })
    .$promise.then(
      function(response) {
        console.log('success');
        console.log(response);
      },
      function(response) {
        console.log('failure');
        console.log(response);
      }
    );
  }

  $scope.saveMeeting = function() {
      if($scope.host != "Select One")
        $scope.meetingModal.host = $scope.host._id;
      else
        $scope.meetingModal.host = null;

      $scope.meetingModal.startTime = new Date($scope.startTime.toString()).toString();
      $scope.meetingModal.endTime = new Date($scope.endTime.toString()).toString();
    
      meetingFactory.saveMeeting().update({
        id: $scope.meetingModal._id
      }, $scope.meetingModal)
      .$promise.then(
        function(response) {
          console.log('success');
          console.log(response);
        },
        function(response) {
          console.log('failure');
          console.log(response);
        }
      );

    }
}]);

app.controller('upcomingMeetingController', ['$scope', 'meetingFactory', 'employeeFactory', '$window', function($scope, meetingFactory, employeeFactory, $window) {
  $scope.fade = "fade";
  $scope.visible = "";

  $scope.searchMeeting = {'attendee': $window.sessionStorage.getItem("employeeId")};

  $scope.meetingModal = {
    _id: "",
    attendee: [],
    duration: {},
    startTime: "",
    endTime: "",
    host: "Select One",
    notes: "",
    title: ""
  };

  $scope.status = "Select One";

   meetingFactory.searchUpcomingMeeting().put($scope.searchMeeting, function(resp, headers){
        console.log('success');
        console.log(resp);
        $scope.meetingResult = resp;
        //$state.go('app.main');
      },
      function(err){
        // error callback
        console.log('failure');
        console.log(err);
      });

  $scope.selectedAttendee = {details: {}};
  $scope.selectedAttendeeMap = [];
  //$scope.selectedAttendeeList = [];
  $scope.selectedAttendeeList = [];

  employeeFactory.searchEmployee().put(function(resp, headers){
        console.log('success');
        console.log(resp);
        $scope.hostList = [{_id: "Select One", firstName: "Select One", lastName: ""}];
        for(var i=0; i< resp.length; i++)
        {
          $scope.hostList.push(resp[i]);

        }
        console.log($scope.hostList);
        $scope.attendeeList = resp;
        for(var i=0; i< $scope.attendeeList.length; i++)
        {
          $scope.selectedAttendeeMap[$scope.attendeeList[i]._id] = $scope.attendeeList[i];

        }
      },
      function(err){
        // error callback
        console.log('failure');
        console.log(err);
      });

  $scope.getAttendeeListDisplay = function() {
    var result = [];

    for (var key in $scope.selectedAttendeeList) {
      result.push($scope.selectedAttendeeList[key]);
    }

    return result;
  }

  $scope.saveMeeting = function() {
      $scope.meetingModal.host = $scope.hostId;

      for(var i=0; i< $scope.meetingModal.attendee.length; i++)
      {
        if($scope.meetingModal.attendee[i]._id == $window.sessionStorage.getItem("employeeId"))
        {
          $scope.meetingModal.attendee[i].status = $scope.status;
        }
      }
 
    
      meetingFactory.saveMeeting().update({
        id: $scope.meetingModal._id
      }, $scope.meetingModal)
      .$promise.then(
        function(response) {
          console.log('success');
          console.log(response);
        },
        function(response) {
          console.log('failure');
          console.log(response);
        }
      );
      
    }

  $scope.open = function(item) {
    $scope.fade = "";
    $scope.visible = "visible";

    $scope.meetingModal._id = item._id;
    $scope.meetingModal.attendee = item.attendee;
    $scope.meetingModal.duration = item.duration;
    $scope.meetingModal.endTime = item.endTime;
    for(var i=0; i< $scope.hostList.length; i++)
    {
      if($scope.hostList[i]._id == item.host._id)
      {
        $scope.host = $scope.hostList[i].firstName + ' ' + $scope.hostList[i].lastName;
        $scope.hostId = $scope.hostList[i]._id;
      }
    }
    
    $scope.meetingModal.notes = item.notes;
    $scope.meetingModal.startTime = item.startTime;
    $scope.meetingModal.title = item.title;
    $scope.selectedAttendeeList = [];
    for(var i=0; i< item.attendee.length; i++)
    {
      $scope.selectedAttendeeList[$scope.meetingModal.attendee[i]['_id']] = {_id: $scope.meetingModal.attendee[i]['_id'], status:  $scope.meetingModal.attendee[i]['status'],
        name: $scope.selectedAttendeeMap[$scope.meetingModal.attendee[i]['_id']]['firstName'] + ' ' + $scope.selectedAttendeeMap[$scope.meetingModal.attendee[i]['_id']]['lastName']
      };
    }
  }

  $scope.close = function() {
    $scope.fade = "fade";
    $scope.visible = "";
  }
}]);

app.controller('PersonalTimesheetController', ['$scope', 'timesheetFactory', 'employeeFactory', 'taskFactory', '$window', function($scope, timesheetFactory, employeeFactory, taskFactory, $window) {
  $scope.taskListMap = [];

  $scope.employeeList = [];
  $scope.employeeMap = [];
  $scope.timesheeteShow = false;

  employeeFactory.searchEmployee().put(function(resp, headers){
        $scope.employeeList = resp;
       
        for(var i=0; i< $scope.employeeList.length; i++)
        {
          $scope.employeeMap[$scope.employeeList[i]._id] = $scope.employeeList[i];

        }
      },
      function(err){
        // error callback
        console.log('failure');
        console.log(err);
      });

  $scope.createTimesheet = function(){
    var startingMonday = new Date($scope.startingMonday);
    var endingFriday = new Date($scope.endingFriday);

    $scope.timesheetShow = true;

    $scope.timesheet = {
      employee: {
        firstName: "",
        lastName: "",
        gender: ""
      }
    };

    if(startingMonday.getDay() != 1)
    {
      $window.alert("You must select a Monday for Starting Monday.");
    }

    if(endingFriday.getDay() != 5)
    {
      $window.alert("You must select a Friday for Ending Friday.");
    }

    timesheetFactory.searchPersonalTimesheet().put({'startingMonday': startingMonday, 'endingFriday': endingFriday, 'employee': $window.sessionStorage.getItem('employeeId')}, function(resp, headers){
        if(resp.length != 0)
          return;

        timesheetFactory.createTimesheet().put({'startingMonday': startingMonday, 'endingFriday': endingFriday, 'employee': $window.sessionStorage.getItem('employeeId')}, function(resp, headers){
          //success callback
          if(resp && resp.token)
            $scope.token = resp.token;
            console.log('success');
            console.log(resp);
          //$state.go('app.main');
          },
          function(err){
            // error callback
            console.log('failure');
            console.log(err);
        });
     });
  }

  $scope.getCommentDate = function(date) {
    var d = new Date(date);
    return d.getMonth() + '/' + d.getDate() + '/' + d.getFullYear();
  }

  $scope.getCommentEmployee = function(id){
    return $scope.employeeMap[id].firstName + ' ' + $scope.employeeMap[id].lastName;
  }

  $scope.addTask = function(){
    console.log($scope.selectedTask);
    var taskObj = {
      'task': $scope.selectedTask[0],
      'mondayHours': 0,
      'tuesdayHours': 0,
      'wednesdayHours': 0,
      'thursdayHours': 0,
      'fridayHours': 0, 
      'totalHours': 0
    };
    $scope.timesheet.tasks.push(taskObj);
  }

  $scope.removeTask = function(id){
    var taskBuf = [];

    for(var i=0; i<$scope.timesheet.tasks; i++)
    {
      
      if($scope.timesheet.tasks[i].task != id)
        taskBuf.push($scope.timesheet.tasks[i]);
    }

    $scope.timesheet.tasks = taskBuf;
  }

  $scope.getTitle = function(id){
    return $scope.taskListMap[id].title;
  }

  $scope.postComment = function(){
    var date = new Date();
    var comment = {
      'employee':  $window.sessionStorage.getItem('employeeId'),
      'date': date,
      'comment': $scope.comment
    };
    $scope.timesheet.comments.push(comment);
  }

  $scope.submitTimesheet= function(){
    timesheetFactory.saveTimesheet().update({
        id: $scope.timesheet._id
      }, $scope.timesheet)
      .$promise.then(
        function(response) {
          console.log('success');
          console.log(response);
        },
        function(response) {
          console.log('failure');
          console.log(response);
        }
      );
  }

  $scope.getFilledHours = function(day){
    var total = 0;
    for(var i=0; i<$scope.timesheet.tasks.length; i++)
    {
      if(day == 1)
        total += Number.parseInt($scope.timesheet.tasks[i].mondayHours);
      else if(day == 2)
        total += Number.parseInt($scope.timesheet.tasks[i].tuesdayHours);
      else if(day == 3)
        total += Number.parseInt($scope.timesheet.tasks[i].wednesdayHours);
      else if(day == 4)
        total += Number.parseInt($scope.timesheet.tasks[i].thursdayHours);      
      else if(day == 5)
        total += Number.parseInt($scope.timesheet.tasks[i].fridayHours);      
    }

    return total;
  }

  $scope.searchPersonalTimesheet = function(){
    var startingMonday = new Date($scope.startingMonday);
    var endingFriday = new Date($scope.endingFriday);

    if(startingMonday.getDay() != 1)
    {
      $window.alert("You must select a Monday for Starting Monday.");
    }

    if(endingFriday.getDay() != 5)
    {
      $window.alert("You must select a Friday for Ending Friday.");
    }

    taskFactory.searchPersonalTask().put({'employeeId': $window.sessionStorage.getItem('employeeId')}, function(resp, headers){
        console.log('success');
        $scope.taskList = resp;
        for(var i=0; i< $scope.taskList.length; i++)
        {
          $scope.taskListMap[$scope.taskList[i]._id] = $scope.taskList[i];

        }
        console.log($scope.taskListMap);
      },
      function(err){
        // error callback
        console.log('failure');
        console.log(err);
      });

     timesheetFactory.searchPersonalTimesheet().put({'startingMonday': startingMonday, 'endingFriday': endingFriday, 'employee': $window.sessionStorage.getItem('employeeId')}, function(resp, headers){
        console.log('success');
        console.log(resp);
        $scope.timesheetShow = true;
        $scope.timesheet = resp[0];
        $scope.timePeriod = startingMonday.getMonth() + '/' +startingMonday.getDate() + '/' + startingMonday.getFullYear() + '-' + 
        endingFriday.getMonth() + '/' + endingFriday.getDate() + '/' + endingFriday.getFullYear();
     });
  }
}]);

app.controller('ManagerTimesheetController', ['$scope', 'timesheetFactory', 'employeeFactory', 'taskFactory', '$window', function($scope, timesheetFactory, employeeFactory, taskFactory, $window) {
  $scope.taskListMap = [];

  $scope.employeeList = [];
  $scope.employeeMap = [];
  $scope.timesheetResult = [];
  $scope.timesheeteShow = false;

  employeeFactory.searchEmployee().put(function(resp, headers){
        $scope.employeeList = resp;
       
        for(var i=0; i< $scope.employeeList.length; i++)
        {
          $scope.employeeMap[$scope.employeeList[i]._id] = $scope.employeeList[i];

        }
      },
      function(err){
        // error callback
        console.log('failure');
        console.log(err);
      });

  taskFactory.searchTask().put({}, function(resp, headers){
        $scope.taskList = resp;
        for(var i=0; i< $scope.taskList.length; i++)
        {
          $scope.taskListMap[$scope.taskList[i]._id] = $scope.taskList[i];

        }
      },
      function(err){
        // error callback
        console.log('failure');
        console.log(err);
      });

  $scope.getCommentDate = function(date) {
    var d = new Date(date);
    return d.getMonth() + '/' + d.getDate() + '/' + d.getFullYear();
  }

  $scope.getCommentEmployee = function(id){
    return $scope.employeeMap[id].firstName + ' ' + $scope.employeeMap[id].lastName;
  }

  $scope.addTask = function(){
    console.log($scope.selectedTask);
    var taskObj = {
      'task': $scope.selectedTask[0],
      'mondayHours': 0,
      'tuesdayHours': 0,
      'wednesdayHours': 0,
      'thursdayHours': 0,
      'fridayHours': 0, 
      'totalHours': 0
    };
    $scope.timesheet.tasks.push(taskObj);
  }

  $scope.removeTask = function(id){
    var taskBuf = [];

    console.log('removeTask');
    console.log(id);

    for(var i=0; i<$scope.timesheet.tasks.length; i++)
    {
      console.log($scope.timesheet.tasks[i]);
      
      if($scope.timesheet.tasks[i].task != id)
        taskBuf.push($scope.timesheet.tasks[i]);
    }

    $scope.timesheet.tasks = taskBuf;
  }

  $scope.displayTimesheet = function(index){
    $scope.timesheet = $scope.timesheetResult[index];
    $scope.timesheetShow = true;
  }

  $scope.getTitle = function(id){
    console.log('getTitle');
    console.log($scope.taskListMap);
    console.log(id);
    return $scope.taskListMap[id].title;
  }

  $scope.postComment = function(){
    console.log('post comment');
    var date = new Date();
    var comment = {
      'employee':  $window.sessionStorage.getItem('employeeId'),
      'date': date,
      'comment': $scope.comment
    };
    $scope.timesheet.comments.push(comment);
    console.log($scope.timesheet);
  }

  $scope.submitTimesheet= function(){

    $scope.timesheet.status = "Approved";
    timesheetFactory.saveTimesheet().update({
        id: $scope.timesheet._id
      }, $scope.timesheet)
      .$promise.then(
        function(response) {
          console.log('success');
          console.log(response);
        },
        function(response) {
          console.log('failure');
          console.log(response);
        }
      );
  }

  $scope.getFilledHours = function(day){
    var total = 0;
    for(var i=0; i<$scope.timesheet.tasks.length; i++)
    {
      console.log(i);
      console.log($scope.timesheet.tasks[i]);
      console.log(day);
      if(day == 1)
        total += Number.parseInt($scope.timesheet.tasks[i].mondayHours);
      else if(day == 2)
        total += Number.parseInt($scope.timesheet.tasks[i].tuesdayHours);
      else if(day == 3)
        total += Number.parseInt($scope.timesheet.tasks[i].wednesdayHours);
      else if(day == 4)
        total += Number.parseInt($scope.timesheet.tasks[i].thursdayHours);      
      else if(day == 5)
        total += Number.parseInt($scope.timesheet.tasks[i].fridayHours);      
    }

    return total;
  }

  $scope.searchTimesheetList = function(){
    var startingMonday = new Date($scope.startingMonday);
    var endingFriday = new Date($scope.endingFriday);

      timesheetFactory.searchTimesheet({'startingMonday': startingMonday, 'endingFriday': endingFriday, 'firstName': $scope.firstName, 'lastName': $scope.lastName,'manager': $window.sessionStorage.getItem('employeeId')}).put($scope.searchMeeting, function(resp, headers){
        $scope.timesheetResult = resp;
      },
      function(err){
        // error callback
        console.log('failure');
        console.log(err);
      });
  }
}]);

app.controller('TimesheetController', ['$scope', 'timesheetFactory', 'employeeFactory', 'taskFactory', '$window', function($scope, timesheetFactory, employeeFactory, taskFactory, $window) {
  $scope.taskListMap = [];

  $scope.employeeList = [];
  $scope.employeeMap = [];
  $scope.timesheetResult = [];
  $scope.timesheeteShow = false;

  employeeFactory.searchEmployee().put(function(resp, headers){
        $scope.employeeList = resp;
       
        for(var i=0; i< $scope.employeeList.length; i++)
        {
          $scope.employeeMap[$scope.employeeList[i]._id] = $scope.employeeList[i];

        }
      },
      function(err){
        // error callback
        console.log('failure');
        console.log(err);
      });

  taskFactory.searchTask().put({}, function(resp, headers){
        console.log('task');
        console.log(resp);
        $scope.taskList = resp;
        for(var i=0; i< $scope.taskList.length; i++)
        {
          console.log('set task list map');
          console.log($scope.taskListMap);
          $scope.taskListMap[$scope.taskList[i]._id] = $scope.taskList[i];

        }
        console.log($scope.taskListMap);
      },
      function(err){
        // error callback
        console.log('failure');
        console.log(err);
      });

  $scope.getCommentDate = function(date) {
    var d = new Date(date);
    console.log(d);
    //if(date[0])
    //var resultCmt = date.split('T');
    //return resultCmt[0];
    return d.getMonth() + '/' + d.getDate() + '/' + d.getFullYear();
  }

  $scope.getCommentEmployee = function(id){
    console.log('comment employee');
    console.log($scope.timesheet);
    console.log(id);
    console.log($scope.employeeMap);
    return $scope.employeeMap[id].firstName + ' ' + $scope.employeeMap[id].lastName;
  }

  $scope.addTask = function(){
    console.log($scope.selectedTask);
    var taskObj = {
      'task': $scope.selectedTask[0],
      'mondayHours': 0,
      'tuesdayHours': 0,
      'wednesdayHours': 0,
      'thursdayHours': 0,
      'fridayHours': 0, 
      'totalHours': 0
    };
    $scope.timesheet.tasks.push(taskObj);
    console.log('timesheet');
    console.log($scope.timesheet);
  }

  $scope.removeTask = function(id){
    var taskBuf = [];

    console.log('removeTask');
    console.log(id);

    for(var i=0; i<$scope.timesheet.tasks.length; i++)
    {
      console.log($scope.timesheet.tasks[i]);
      
      if($scope.timesheet.tasks[i].task != id)
        taskBuf.push($scope.timesheet.tasks[i]);
    }

    $scope.timesheet.tasks = taskBuf;
  }

  $scope.displayTimesheet = function(index){
    $scope.timesheet = $scope.timesheetResult[index];
    $scope.timesheetShow = true;
  }

  $scope.getTitle = function(id){
    console.log('getTitle');
    console.log($scope.taskListMap);
    console.log(id);
    return $scope.taskListMap[id].title;
  }

  $scope.postComment = function(){
    console.log('post comment');
    var date = new Date();
    var comment = {
      'employee':  $window.sessionStorage.getItem('employeeId'),
      'date': date,
      'comment': $scope.comment
    };
    $scope.timesheet.comments.push(comment);
    console.log($scope.timesheet);
  }

  $scope.submitTimesheet= function(){

    $scope.timesheet.status = "Approved";
    timesheetFactory.saveTimesheet().update({
        id: $scope.timesheet._id
      }, $scope.timesheet)
      .$promise.then(
        function(response) {
          console.log('success');
          console.log(response);
        },
        function(response) {
          console.log('failure');
          console.log(response);
        }
      );
  }

  $scope.getFilledHours = function(day){
    console.log('getFilledHours');
    var total = 0;
    for(var i=0; i<$scope.timesheet.tasks.length; i++)
    {
      console.log(i);
      console.log($scope.timesheet.tasks[i]);
      console.log(day);
      if(day == 1)
        total += Number.parseInt($scope.timesheet.tasks[i].mondayHours);
      else if(day == 2)
        total += Number.parseInt($scope.timesheet.tasks[i].tuesdayHours);
      else if(day == 3)
        total += Number.parseInt($scope.timesheet.tasks[i].wednesdayHours);
      else if(day == 4)
        total += Number.parseInt($scope.timesheet.tasks[i].thursdayHours);      
      else if(day == 5)
        total += Number.parseInt($scope.timesheet.tasks[i].fridayHours);      
    }

    return total;
  }

  $scope.searchTimesheetList = function(){
    var startingMonday = new Date($scope.startingMonday);
    var endingFriday = new Date($scope.endingFriday);

    if(startingMonday.getDay() != 1)
    {
      $window.alert("You must select a Monday for Starting Monday.");
    }

    if(endingFriday.getDay() != 5)
    {
      $window.alert("You must select a Friday for Ending Friday.");
    }


      timesheetFactory.searchTimesheet({'startingMonday': startingMonday, 'endingFriday': endingFriday, 'firstName': $scope.firstName, 'lastName': $scope.lastName,'manager': $window.sessionStorage.getItem('employeeId')}).put($scope.searchMeeting, function(resp, headers){
        console.log('success');
        console.log(resp);
        $scope.timesheetResult = resp;
        console.log('timesheetResult');
        console.log($scope.timesheetResult);
        //$state.go('app.main');
      },
      function(err){
        // error callback
        console.log('failure');
        console.log(err);
      });
  }

  $scope.searchPersonalTimesheet = function(){
    var startingMonday = new Date($scope.startingMonday);
    var endingFriday = new Date($scope.endingFriday);

    if(startingMonday.getDay() != 1)
    {
      $window.alert("You must select a Monday for Starting Monday.");
    }

    if(endingFriday.getDay() != 5)
    {
      $window.alert("You must select a Friday for Ending Friday.");
    }

     timesheetFactory.searchManagerTimesheet().put({'startingMonday': startingMonday, 'endingFriday': endingFriday, 'firstName': firstName, 'lastName': lastName,'manager': $window.sessionStorage.getItem('employeeId')}, function(resp, headers){
        console.log('success');
        console.log('personal');
        console.log(resp);
        $scope.timesheetShow = true;
        $scope.timesheet = resp[0];
        $scope.timePeriod = startingMonday.getMonth() + '/' +startingMonday.getDate() + '/' + startingMonday.getFullYear() + '-' + 
        endingFriday.getMonth() + '/' + endingFriday.getDate() + '/' + endingFriday.getFullYear();
        console.log($scope.timePeriod);
     });
  }
}]);

app.controller('punchInController', ['$scope', 'punchinFactory', '$window', function($scope, punchinFactory, $window) {
   $scope.status = "PunchIn";
   punchinFactory.getPunchIn().put({'employeeId': $window.sessionStorage.getItem("employeeId")}, function(resp, headers){
      if(resp.length == 0)
      {
           $scope.status = "PunchIn";
           $scope.punchText = "Punch In";
      }
      else
      {
          if(resp[0].endTime == null)
          {
            $scope.status = "PunchOut";
            $scope.punchText = "Punch Out";
          }
          else
          {
            $scope.status = "PunchIn";
            $scope.punchText = "Punch In";
          }
      }
  },
  function(err){

  });

   $scope.getPunchClass = function()
   {
      if($scope.status == "PunchIn")
        return "punch-in-button";
      else
        return "punch-out-button";
   }

   $scope.punch = function() {
      console.log('punch');
      $scope.disabled = true;
      punchinFactory.getPunchIn().put({'employeeId': $window.sessionStorage.getItem("employeeId")}, function(resp, headers){
        console.log('success');
        console.log(resp);
        $scope.employeeList = resp;
        if(resp.length == 0)
        {
          console.log('0');
          
          punchinFactory.punchIn().post({'id': 'new'}, {'employeeId': $window.sessionStorage.getItem("employeeId")}, function(resp, headers){
              //success callback
              if(resp && resp.token)
                $scope.token = resp.token;
              console.log('success');
              console.log(resp);
              $scope.status = "PunchOut";
              $scope.disabled = false;
              //$state.go('app.main');
            },
            function(err){
              // error callback
              console.log('failure');
              console.log(err);
            });
          
        }
        else
        {
           punchinFactory.punchIn().post({'id': resp[0]._id}, {'employeeId': $window.sessionStorage.getItem("employeeId")}, function(resp, headers){
              //success callback
              if(resp && resp.token)
                $scope.token = resp.token;
              console.log('success');
              console.log(resp);
              if(resp.endTime == null)
              {
                $scope.punchText = "Punch Out";
                $scope.status = "PunchOut";
              }
              else
              {
                $scope.punchText = "Punch In";
                $scope.status = "PunchIn";
              }

              $scope.disabled = false;
              //$state.go('app.main');
            },
            function(err){
              // error callback
              console.log('failure');
              console.log(err);
            });
        }
        //$state.go('app.main');
      },
      function(err){
        // error callback
        console.log('failure');
        console.log(err);
      });
   }
}]);