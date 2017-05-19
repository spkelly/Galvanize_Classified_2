(() => {
  'use strict';
  console.log('controller is working');
  var app = angular.module('app');

  app.controller('showAllController', showAllController);
  app.controller('newAdController', newAdController);
  app.controller('editAdController', editAdController);

  function showAllController(ads, $scope, $state , $location, resourceService){
    $scope.filterText = [];
    const vm  = this;
    vm.ads = ads.data;
    $scope.something = "hello"

    vm.delete = function(id){
      resourceService.deleteAd(id)
        .then((data) =>{
          $location.path(window.location.reload());
        })
    }
  }

  function newAdController(resourceService, $location){
    const vm = this;
    console.log('hello')

    vm.createAd = function(ad){
      resourceService.makeAd(ad)
        .then((data) =>{
            $location.path('/');
        })
    }
  }

  function editAdController(ad, resourceService, $stateParams,$location){
    const id = $stateParams.id;
    const vm = this;

    vm.ad = ad.data;
    console.log(vm)
    console.log('editing');

    vm.submitEdit = function(ad){
      resourceService.editAd(id,ad).then((data) =>{
        console.log("editing ad", ad);
        $location.path('/');
      })

    }
  }
  showAllController.$inject = ['ads', '$scope', '$location', '$state', 'resourceService'];
  newAdController.$inject = ['resourceService', '$location'];
  editAdController.$inject = ['ad', 'resourceService','$stateParams','$location'];
})();
