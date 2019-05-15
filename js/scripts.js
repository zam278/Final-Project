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
       'circle-color': 'red',
     }
   })

   map.addSource('rest_along_L',{
     type: 'geojson',
     data: 'data/rest_along_L.geojson',
   });

   map.addLayer({
      id: 'restaurant-circle',
      type: 'circle',
      source: 'rest_along_L',
      paint: {
        'circle-radius': 8,
        'circle-color': 'blue',
        'circle-opacity': 0.6,
        // 'circle-color': 'green',
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
        'line-color': 'orange',
        'opacity-line': 0.4

      },
// to filter the layer and include only L line
      filter: ["==","name","L"]


    }, 'waterway-label')

    map.addLayer({
       id: 'subway_lines-line',
       type: 'line',
       source: 'subway_lines',
       paint: {
         'line-color': 'white',

       },
// to include all subway lines
       filter: ["!=","name","L"]


     }, 'waterway-label')
     //
     // map.addSource('0.5_buffer',{
     //   type: 'geojson',
     //   data: 'data/0.5_buffer.geojson',
     // });
     //
     // map.addLayer({
     //    id: 'buffer-fill',
     //    type: 'fill',
     //    source: '0.5_buffer',
     //    paint: {
     //      // 'circle-radius': 5,
     //      'fill-color': '#ccece6',
     //      'fill-opacity': 0.3,
     //    }
     //  })


          // map.addSource('0.5_buffer-2',{
          //   type: 'geojson',
          //   data: 'data/0.5_buffer-2.geojson',
          // });
          //
          // map.addLayer({
          //    id: 'buffer2-fill',
          //    type: 'fill',
          //    source: '0.5_buffer-2',
          //    paint: {
          //      // 'circle-radius': 5,
          //      'fill-color': '#66c2a4',
          //      'fill-opacity': 0.3,
          //
          //    }
          //  })
     // map.addLayer({
     //    id: 'buffer-line',
     //    type: 'line',
     //    source: 'train_stops_buffer',
     //    paint: {
     //      // 'circle-radius': 5,
     //      'line-color': 'red',

     map.addSource('small-buffer',{
       type: 'geojson',
       data: 'data/small-buffer.geojson',
     });

     map.addLayer({
        id: 'small-buffer-fill',
        type: 'fill',
        source: 'small-buffer',
        paint: {
          // 'circle-radius': 5,
          'fill-color': '#fff',
          'fill-opacity': 0.1,

        }
      })

      map.addSource('l_train_stops',{
        type: 'geojson',
        data: 'data/l_train_stops.geojson',
      });

      map.addLayer({
         id: 'L-stops-circle',
         type: 'circle',
         source: 'l_train_stops',
         paint: {
           'circle-radius': 8,
           'circle-color': 'yellow',
         }
       })


})
