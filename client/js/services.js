(() => {
  'use strict';
  angular.module('app')
    .service('resourceService', resourceService)

    function resourceService($http) {
      const API_URL = '/api/classifieds'
      this.getAds = function() {
        return $http.get(API_URL);
      };
      this.makeAd = function(ad) {
        console.log('posting');
        return $http.post(API_URL, ad);
      };
      this.getAd = function(id){
        return $http.get(`${API_URL}/${id}`);
      };
      this.editAd = function(id, ad) {
        return $http.patch(`${API_URL}/${id}`,ad);
      };

      this.deleteAd = function(id) {
        return $http.delete(`${API_URL}/${id}`);
      };
    }

  resourceService.$inject = ['$http'];
})();
