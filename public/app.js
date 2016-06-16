(function() {
		'use strict'
		angular.module('main', [])
			.controller('mainCtrl', function($scope, $http) {
				$scope.format = 'm/d/yy h:mm:ss a';
				var messageLength;
				var maxLine = 3;
				var minLine = 1;
				//$scope.opp = [];
				$http.get('/info').success(function(data) {
					$scope.opp = data;

					messageLength = $scope.opp.length;
					$scope.messageNum = maxLine;
					$scope.myOption = $scope.opp[1];
					$scope.more = $scope.opp.length == 1;
					$scope.less = $scope.opp.length >= 3;
				})
				$scope.showMore = function() {
					$scope.messageNum = $scope.opp.length;
					$scope.less = true;
					$scope.more = false;
				}
				$scope.showLess = function() {
					$scope.messageNum = minLine;
					$scope.more = true;
					$scope.less = false;
				};

				if (messageLength >= maxLine) {
					$scope.more = true;
				} else if (messageLength < maxLine && messageLength > minLine) {
					$scope.less = true;
				} else
					$scope.more = false;
				$scope.less = false;



			})
			.directive('myDirective', function($interval, dateFilter) {
				function link(scope, element, attrs) {
					var format, timeOutId;
					var updateTime = function() {
						element.text(dateFilter(new Date(), format));	
					}
					scope.$watch(attrs.myDirective, function(value) {
						format	 = value;
						updateTime();
					})
					element.on('$destory', function() {

						$interval.cancel(timeOutId);
					})

					timeOutId = $interval(function() {
						updateTime();
					}, 1000)

				}
				return {
					link:link
				}
			})
	


})()