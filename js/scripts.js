// sets up my mapbox access token so they can track my usage of their basemap services
mapboxgl.accessToken = 'pk.eyJ1IjoiY3dob25nIiwiYSI6IjAyYzIwYTJjYTVhMzUxZTVkMzdmYTQ2YzBmMTM0ZDAyIn0.owNd_Qa7Sw2neNJbK6zc1A';

// creaate the map
var map = new mapboxgl.Map({
  container: 'mapContainer',
  style: 'mapbox://styles/mapbox/dark-v9',
  center: [-73.991890,40.748753],
  zoom: 12,
});

// Add zoom and rotation controls to the map.
map.addControl(new mapboxgl.NavigationControl());

//  show modal when page loads
$(document).ready(function(){
    $("#myModal").modal('show');
});

// we can't add our own sources and layers until the base style is finished loading
map.on('style.load', function() {
  map.addSource('bars',{
    type: 'geojson',
    data: 'data/bars.geojson',
  });

  map.addLayer({
     id: 'bars-circle',
     type: 'circle',
     source: 'bars',
     paint: {
       'circle-radius': 5,
       'circle-color': '#FFF'
     }
   })

   map.addSource('subway_lines',{
     type: 'geojson',
     data: 'data/subway_lines.geojson',
   });

   map.addLayer({
      id: 'subway_lines-L',
      type: 'line',
      source: 'subway_lines',
      paint: {
        'line-color': 'blue',

      },

      filter: ["==","name","L"]


    }, 'waterway-label')

    map.addLayer({
       id: 'subway_lines-line',
       type: 'line',
       source: 'subway_lines',
       paint: {
         'line-color': 'white',

       },

       filter: ["!=","name","L"]


     }, 'waterway-label')

     map.addSource('l_train_stops_buffer',{
       type: 'geojson',
       data: 'data/l_train_stops_buffer.geojson',
     });

     map.addLayer({
        id: 'l_train_stops_buffer-circle',
        type: 'circle',
        source: 'l_train_stops_buffer',
        paint: {
          'circle-radius': 5,
          'circle-color': 'orange'

        }
      })

})
