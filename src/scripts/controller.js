/**
 * Created by a598519 on 21-10-2016.
 */
mappingModule.controller('mappingController', ['$scope', 'mapService','$log', function ($scope, mapService,$log) {

    $scope.applicationId = '';
    $scope.applicationCode = '';

    $scope.mapRendered = false;
    $scope.getMap = function () {
        $scope.mapObject = mapService.createMap('map', $scope.applicationId, $scope.applicationCode); 
        var coordinates = mapService.getLocation(); 
        $scope.successHandler = function (value) { 
            var obj = null;
            var group = new H.map.Group();

            obj = value.data.points;
            for (var i = 0 ; i <= obj.length - 1 ; i++) {

                var position = {
                    lat: obj[i].toLatitude,
                    lng: obj[i].toLongitude
                };


                var vehicleIcon = $scope.getDirectionIcon(obj[i]);
                var icon = new H.map.Icon(vehicleIcon);

                var marker = new H.map.Marker(position, { icon: icon });
                group.addObject(marker);
            }
            $scope.mapObject.addObject(group);
            $scope.mapObject.setViewBounds(group.getBounds());
        }
        $scope.errorHandler = function (response) {
            $log.log(response);
        }
        Number.prototype.toRad = function () {
            return this * Math.PI / 180;
        };
        Number.prototype.toDeg = function () {
            return this * 180 / Math.PI;
        };

        $scope.getDirectionIcon = function (point) {
            var image = "";
            var lat2 = point.toLongitude;
            var lat1 = point.fromLongitude;
            var dLon = (lat2 - lat1).toRad();
            var y = Math.sin(dLon) * Math.cos(lat2);
            var x = Math.cos(lat1) * Math.sin(lat2) - Math.sin(lat1) * Math.cos(lat2) * Math.cos(dLon);
            var brng = Math.atan2(y, x).toDeg();
            var bearings = ["NE", "E", "SE", "S", "SW", "W", "NW", "N"];
            var index = brng - 22.5;
            if (index < 0)
                index += 360;
            index = parseInt(index / 45);

            var direction = (bearings[index]);
            switch (direction) {

                case "N":
                    image = "../Images/vehicle_north.png";
                    break;
                case "NE":
                    image = "../Images/vehicle_northeast.png";
                    break;
                case "NW":
                    image = "../Images/vehicle_northwest.png";
                    break;
                case "S":
                    image = "../Images/vehicle_south.png";
                    break;
                case "SE":
                    image = "../Images/vehicle_southeast.png";
                    break;
                case "SW":
                    image = "../Images/vehicle_southwest.png";
                    break;
                case "W":
                    image = "../Images/vehicle_west.png";
                    break;
                case "E":
                    image = "../Images/vehicle_east.png";
                    break;
                default:
                    image = "../Images/Vehicle.png"
                    break;
            }
            return image;
        };
        
        mapService.plotPoints($scope.successHandler, $scope.errorHandler);
        $scope.mapObject.setCenter(coordinates.location);
       $scope.mapObject.setZoom(coordinates.zoom);
        $scope.mapRendered = true;
    }

}]);