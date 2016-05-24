//tripsController.js
(function () {

    "use strict";

    //Getting the existing module
    angular.module("app-trips")
        .controller("tripsController", tripsController);

    function tripsController($http) {

        var vm = this;

        vm.trips = [];

        vm.newTrip = {};

        vm.errorMessage = "";
        vm.isBusy = true;

        $http.get('/api/trips')
            .then(
                function (response) {
                    //Success
                    angular.copy(response.data, vm.trips);
                },
                function (error) {
                    //Fail
                    vm.errorMessage = "Fail to load data: " + error;
                }
            )
            .finally(function () {
                vm.isBusy = false;
            });

        vm.addTrip = function () {

            vm.isBusy = true;
            vm.errorMessage = "";

            $http.post('/api/trips', vm.newTrip)
                .then(function (response) {
                    //Success
                    vm.trips.push(response.data);
                    vm.newTrip = {};
                },
                function (error) {
                    //Faliure
                    vm.errorMessage = "Fail to save new Trip: " + error;
                })
                .finally(function () {
                    vm.isBusy = false;
                });

            vm.newTrip = {};
        };

    }

})();