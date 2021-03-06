angular.module('Pardna')
.controller('HomeCtrl', ['$scope', '$window', '$mdToast', '$mdDialog', 'jwtHelper', 'localStorageService', 'userService', HomeCtrl]);

function HomeCtrl($scope, $window, $mdToast, $mdDialog, jwtHelper, localStorageService, userService) {

  $scope.user = userService.user;
  console.log($scope.user);
  /**
  $mdToast.show(
    $mdToast.simple()
    .content('Welcome back!')
    .position("top right")
    .hideDelay(3000)
  );**/

  if(typeof $scope.user.login_count !== "undefined" && $scope.user.login_count === 0) {

  }


  // Add new pardna
  $scope.data = {
    selectedIndex: 0,
    secondLocked:  true,
    secondLabel:   "Item Two",
    bottom:        false
  };
  $scope.next = function() {
    $scope.data.selectedIndex = Math.min($scope.data.selectedIndex + 1, 2) ;
  };
  $scope.previous = function() {
    $scope.data.selectedIndex = Math.max($scope.data.selectedIndex - 1, 0);
  };

  $scope.color = {
    red: Math.floor(Math.random() * 255),
    green: Math.floor(Math.random() * 255),
    blue: Math.floor(Math.random() * 255)
  };
  $scope.rating1 = 3;
  $scope.rating2 = 2;
  $scope.rating3 = 4;
  $scope.disabled1 = 0;
  $scope.disabled2 = 70;

  $scope.sendCode = function(ev) {
    $mdDialog.show({
      controller: SendCodeDialogCtrl,
      templateUrl: 'send-code.tmpl.html',
      parent: angular.element(angular.element(document.querySelector('#popupContainer'))),
      targetEvent: ev,
      clickOutsideToClose:true
    })
    .then(function(answer) {
      $scope.status = 'You said the information was "' + answer + '".';
    }, function() {
      $scope.status = 'You cancelled the dialog.';
    });
  };

  $scope.verifyCode = function(ev) {
    $mdDialog.show({
      controller: SendCodeDialogCtrl,
      templateUrl: 'verify-code.tmpl.html',
      parent: angular.element(angular.element(document.querySelector('#popupContainer'))),
      targetEvent: ev,
      clickOutsideToClose:true
    })
    .then(function(answer) {
      $scope.status = 'You said the information was "' + answer + '".';
      $scope.user = userService.user;
    }, function() {
      $scope.status = 'You cancelled the dialog.';
      $scope.user = userService.user;
    });
  };

  $scope.firstLogin = function(ev) {
    // Appending dialog to document.body to cover sidenav in docs app

    var confirm = $mdDialog.confirm()
          .title('Welcome to Parda.com!')
          .content('<p>This is you Pardna Dashboard, where you will see an overview of your account</p><p>We sent and activation link to your email address. Please click the link to enable features</p><p>Please alson complete your personal details so you can setup your Pardna group, invite others and begin saving together</p>')
          .ariaLabel('Welcome to Parda.com!')
          .targetEvent(ev)
          .ok('Please do it!')
          .cancel('OK');
    $mdDialog.show(confirm).then(function() {
      $scope.status = 'ok';
    }, function() {
      $scope.status = 'cancel';
    });
  };

  var alert;
    $scope.showAlert = showAlert;
  function showAlert() {
      alert = $mdDialog.alert({
        title: 'Attention',
        content: 'This is an example of how easy dialogs can be!',
        ok: 'Close'
      });
      $mdDialog
        .show( alert )
        .finally(function() {
          alert = undefined;
        });
    }

  // $scope.firstLogin();

  // $scope.showAlert();



  $scope.view = {};
  $scope.view.tabs = [
    {
      "icon_class": "fa fa-user",
      "label": "Your Details",
      "template": ""
    },
    {
      "icon_class": "fa fa-gbp",
      "label": "Pardna Details",
      "template": ""
    },
    {
      "icon_class": "fa fa-lock",
      "label": "Direct Debit",
      "template": ""
    },
    {
      "icon_class": "fa fa-users",
      "label": "Invite Friends",
      "template": ""
    },
  ]

}
