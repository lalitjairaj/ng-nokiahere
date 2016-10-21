/**
 * Created by a598519 on 21-10-2016.
 */
mappingModule.controller('mappingController',['$scope','mapService',function($scope,mapService){

    $scope.applicationId = '';
    $scope.applicationCode = '';

    $scope.mapRendered = false;
    $scope.getMap = function()
    {
        $scope.mapObject = mapService.createMap('map',$scope.applicationId,$scope.applicationCode);
        var coordinates = mapService.getLocation();
        $scope.mapObject.setCenter(coordinates.location);
        $scope.mapObject.setZoom(coordinates.zoom);
        $scope.mapRendered = true;
    }

}]);