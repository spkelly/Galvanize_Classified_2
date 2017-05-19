(() =>{
  'use strict';
  angular.module('app').config(config)

  config.$inject = ['$stateProvider', '$urlRouterProvider', '$locationProvider']

  function config($stateProvider, $urlRouterProvider, $locationProvider) {
    console.log($locationProvider);
    $locationProvider.html5Mode(true)

    $stateProvider
      .state('index', {
        url: '/',
        controller: 'showAllController',
        controllerAs: '$ctrl',
        templateUrl: 'templates/show.template.html',
        resolve:{
          ads: getAllAds
        }
      })
      .state({
        name: 'newAd',
        url: '/classifieds/new',
        controller: 'newAdController',
        controllerAs: '$ctrl',
        templateUrl: 'templates/new.template.html'
      })
      .state({
        name: 'editAd',
        url: '/classifieds/:id/edit',
        controller: 'editAdController',
        controllerAs: '$ctrl',
        templateUrl: 'templates/edit.template.html',
        resolve:{
          ad: getAdById
        }
      })
  }

  function getAllAds(resourceService){
    return resourceService.getAds().then((ads) =>{
      return ads
    });
  }

  function getAdById(resourceService, $location, $stateParams){
    return resourceService.getAd($stateParams.id).then((ad) => {
      return ad
    })
  }
})();
