	// create the module and name it crudApp
        var crudApp = angular.module('crudApp', ['ngRoute']);

	// configure our routes
	crudApp.config(function($routeProvider) {
		$routeProvider
                        // route for the about page
			.when('/about', {
				templateUrl : 'pages/about.html',
				controller  : 'aboutController'
			})
			// route for the home page
			.when('/', {
				templateUrl : 'pages/home.html',
				controller  : 'mainController'
			});
	});

	// create the controller and inject Angular's $scope
	crudApp.controller('mainController', function($scope,$http,$animate) {
		// create a message to display in our view
		$scope.message = 'Everyone come and see how good I look!';
                getInfo();
                function getInfo(){
                    // Sending request to EmpDetails.php files
                    
                    $http({
                        method: "POST",
                        url: "jobDetails.php",
                        dataType: 'json',
                        data: {'job_status':'1'},
                        headers: { "Content-Type": "application/json" }
                    }).then(function(result) {
                      //Success
                            angular.forEach(result.data, function(value, key) {
                              value.initials = value.contact_name.charAt(0);
                          });
                          $scope.details = result.data;
                          var invitedTab = angular.element(document.querySelector('#invited'));
                          $animate.addClass(invitedTab, "active");
                          
                          var acceptedTab = angular.element(document.querySelector('#accepted'));
                          $animate.removeClass(acceptedTab, "active");
                     }, function() {
                     //Error
                     }); 
                }
                
                $scope.UpdateInfo = function(info){console.log(info);
                    $http.post('updateDetails.php',{"id" : info.id,"action" : info.op}).success(function(data){
                    if (data == true) {
                        getInfo();
                    }
                    });
                }
                
	});

	crudApp.controller('aboutController', function($scope,$http,$animate) {
		$scope.message = 'Look! I am an about page.';
                getInfo();
                function getInfo(){
                    $http({
                        method: "POST",
                        url: "jobDetails.php",
                        dataType: 'json',
                        data: {'job_status':'2'},
                        headers: { "Content-Type": "application/json" }
                    }).then(function(result) {
                      //Success
                            angular.forEach(result.data, function(value, key) {
                              value.initials = value.contact_name.charAt(0);
                          });
                          $scope.details = result.data;
                          var invitedTab = angular.element(document.querySelector('#invited'));
                          $animate.removeClass(invitedTab, "active");
                          
                          var acceptedTab = angular.element(document.querySelector('#accepted'));
                          $animate.addClass(acceptedTab, "active");
                     }, function(error) {
                     //Error
                     }); 
                }
	});
        


