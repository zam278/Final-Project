// sets up my mapbox access token so they can track my usage of their basemap services
mapboxgl.accessToken = 'pk.eyJ1IjoiY3dob25nIiwiYSI6IjAyYzIwYTJjYTVhMzUxZTVkMzdmYTQ2YzBmMTM0ZDAyIn0.owNd_Qa7Sw2neNJbK6zc1A';

// creaate the map
var map = new mapboxgl.Map({
  container: 'mapContainer',
  style: 'mapbox://styles/mapbox/dark-v9',
  center: [-73.954639,40.697429],
  zoom: 12,
});

// Add zoom and rotation controls to the map.
map.addControl(new mapboxgl.NavigationControl());

//  show modal when page loads
$(document).ready(function(){
    $("#myModal").modal('show');
});

// a helper function for looking up colors and descriptions for NYC land use codes
var StationLookup = (code) => {
  switch (code) {
    case 1:
      return {
        color: '#b22055',
        // name: '1 & 2 Family',
      };
// use jquery to programmatically create a Legend
// for numbers 1 - 11, get the land use color and description
for (var i=1; i<2; i++) {
  // lookup the landuse info for the current iteration
  const stationInfo = StationLookup(i);

  // this is a simple jQuery template, it will append a div to the legend with the color and description
  $('.legend').append(`
    <div>
      ${stationInfo.description}
    </div>
  `)
}

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
        'line-color': '#41ae76',

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


       // add an empty data source, which we will use to highlight the station the user is hovering over
        map.addSource('highlight-feature', {
          type: 'geojson',
          data: {
            type: 'FeatureCollection',
            features: []
          }
        })

        // add a layer for the highlighted station
        map.addLayer({
          id: 'highlight-line',
          type: 'line',
          source: 'highlight-feature',
          paint: {
            'line-width': 3,
            'line-opacity': 0.9,
            'line-color': 'black',
          }
        });


       // when the mouse moves, do stuff!
       map.on('mousemove', function (e) {
         // query for the features under the mouse, but only in the station layer
         var features = map.queryRenderedFeatures(e.point, {
             layers: ['l_train_stops'],
         });

         // get the first feature from the array of returned features.
         var station = features[0]


         if (station) {  // if there's a a station under the mouse, do stuff
           map.getCanvas().style.cursor = 'pointer';
       // make the cursor a pointer

           // lookup the corresponding description for the land use code
           var stationDescription = StationLookup(parseInt(station.properties.name)).description;

           // use jquery to display the address and land use description to the sidebar
           $('#name').text(l_station.properties.name);


           // set this lot's polygon feature as the data for the highlight source
           map.getSource('highlight-feature').setData(station.geometry);
         } else {
           map.getCanvas().style.cursor = 'default'; // make the cursor default

           // reset the highlight source to an empty featurecollection
           map.getSource('highlight-feature').setData({
             type: 'FeatureCollection',
             features: []
           });
         }
       })
      })
