/**
 * Created by a598519 on 21-10-2016.
 */

mappingModule.factory('mapService', ['$http','$log', function ($http) {

    return {
        createMap: function (mapContainer, appId, appCode) {
            //$('#' + mapContainer).empty();
            var platform = new H.service.Platform({
                app_id: appId,
                app_code: appCode,
                useCIT: true,
                useHTTPS: true
            });
            var defaultLayers = platform.createDefaultLayers();

            //Step 2: initialize a map  - not specificing a location will give a whole world view.
            var map = new H.Map(document.getElementById(mapContainer),
                defaultLayers.normal.map);

            //Step 3: make the map interactive
            // MapEvents enables the event system
            // Behavior implements default interactions for pan/zoom (also on mobile touch environments)
            var behavior = new H.mapevents.Behavior(new H.mapevents.MapEvents(map));

            // Create the default UI components
            var ui = H.ui.UI.createDefault(map, defaultLayers);

            var rectControl = new H.ui.ZoomRectangle();
            ui.addControl("rectControl", rectControl);

            // adding Overview(Mini Map) Control
            var overviewControl = new H.ui.Overview(defaultLayers.normal.map);
            ui.addControl("overviewControl", overviewControl);


            // adding distance measure(Ruler) Control
            var distanceMeasurement = new H.ui.DistanceMeasurement();
            ui.addControl("distanceMeasurement", distanceMeasurement);


            overviewControl.setAlignment('bottom-right');
            distanceMeasurement.setAlignment('bottom-right');


            //$log.log('map created');
            return map;
        }, 
        
        plotPoints: function (successHandler, failureHandler) { 
            $http(
                {
                    method: 'GET',
                    url: '../json/dataPoints.json'
                }
            ).then(successHandler, failureHandler);
        },
        getLocation: function () {
            //Service call here
            //dummy value of new delhi
            return {
                location: {
                    lat: 28.6139, lng: 77.2090
                },
                zoom: 14
            }
        }
    }
    ;
}]);