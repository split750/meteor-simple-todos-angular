
   // This code only runs on the client
  
  Accounts.ui.config({
    passwordSignupFields: "USERNAME_ONLY"
  });


  angular.module('simple-todos',['angular-meteor', 'accounts.ui', 'angular-meteor.auth']);
  
  angular.module('simple-todos').controller('TodosListCtrl', ['$scope', '$meteor', '$reactive',
    function ($scope, $meteor, $reactive) {

      $reactive(this).attach($scope);

      this.subscribe('tasks');

      /*$scope.tasks = $meteor.collection(function() {
        return Tasks.find($scope.getReactively('query'), {sort: {createdAt: -1}})
      });
      */

      $scope.helpers({
        tasks() {
          return Tasks.find($scope.getReactively('query'), {sort: {createdAt: -1}})
        }
      });


      $scope.addTask = function (newTask) {
        Meteor.call('addTask', newTask);
      };
 
      $scope.deleteTask = function (task) {
        Meteor.call('deleteTask', task._id);
      };
 
      $scope.setChecked = function (task) {
        Meteor.call('setChecked', task._id, !task.checked);
      };

      $scope.setPrivate = function (task) {
        Meteor.call('setPrivate', task._id, !task.private);
      };

      $scope.$watch('hideCompleted', function() {
        if ($scope.hideCompleted)
          $scope.query = {checked: {$ne: true}};
        else
          $scope.query = {};
      });

      $scope.incompleteCount = function () {
        return Tasks.find({ checked: {$ne: true} }).count();
      };
 
    }]);
