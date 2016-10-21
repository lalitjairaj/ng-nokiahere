/**
 * Created by a598519 on 21-10-2016.
 */

mappingModule.factory('mapService', [ function () {
    return {
        createMap : function (mapContainer,appId,appCode)
        {
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
            //$log.log('map created');
            return map;
        },
        getLocation: function()
        {
            //Service call here
            //dummy value of new delhi
            return {
                location:{
                    lat:28.6139, lng:77.2090
                },
                zoom: 14
            }
        }
    }
    ;
}]);