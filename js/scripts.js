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


var StationLookup = (code) => {
  switch (code) {
    case 1:
      return {
        color: '#f4f455',
        description: 'Lorimer St',
      };
    case 2:
      return {
        color: '#f7d496',
        description: 'Sutter Ave',
      };
    case 3:
      return {
        color: '#FF9900',
        description: '1st Ave',
      };
    case 4:
      return {
        color: '#f7cabf',
        description: 'Grand St',
      };
    case 5:
      return {
        color: '#ea6661',
        description: 'Graham Ave',
      };
    case 6:
      return {
        color: '#d36ff4',
        description: 'Bedford Ave',
      };
    case 7:
      return {
        color: '#dac0e8',
        description: 'Montrose Ave',
      };
    case 8:
      return {
        color: '#5CA2D1',
        description: 'Atlantic Ave',
      };
    case 9:
      return {
        color: '#8ece7c',
        description: 'Halsey St',
      };
    case 10:
      return {
        color: '#bab8b6',
        description: 'Myrtle - Wyckoff Aves',
      };
    case 11:
      return {
        color: '#5f5f60',
        description: 'Livonia Ave',
      };
    case 12:
      return {
        color: '#5f5f60',
        description: 'Canarsie - Rockaway Pkwy',
      };
    case 13:
      return {
        color: '#f4f455',
        description: 'E 105th St',
      };
    case 14:
      return {
        color: '#f7d496',
        description: 'New Lots Ave',
      };
    case 15:
      return {
        color: '#FF9900',
        description: 'DeKalb Ave',
      };
    case 16:
      return {
        color: '#f7cabf',
        description: 'Bushwick - Aberdeen',
      };
    case 17:
      return {
        color: '#ea6661',
        description: 'Broadway Junction',
      };
    case 18:
      return {
        color: '#d36ff4',
        description: 'Jefferson St',
      };
    case 19:
      return {
        color: '#dac0e8',
        description: 'Transportation & Utility',
      };
    case 18:
      return {
        color: '#5CA2D1',
        description: 'Morgan Ave',
      };
    case 19:
      return {
        color: '#8ece7c',
        description: '3rd Ave',
      };
    case 20:
      return {
        color: '#bab8b6',
        description: 'Union Sq - 14th St',
      };
    case 21:
      return {
        color: '#5f5f60',
        description: '6th Ave',
      };
    case 22:
      return {
        color: '#5f5f60',
        description: '8th Ave',
      };

    default:
      return {
        color: '#5f5f60',
        description: 'Other',
      };
  }
};

// use jquery to programmatically create a Legend
// for numbers 1 - 11, get the land use color and description
for (var i=1; i<23; i++) {
  // lookup the landuse info for the current iteration
  const stationInfo = StationLookup(i);

  // this is a simple jQuery template, it will append a div to the legend with the color and description
  $('.legend').append(`
    <div>
      <div class="legend-color-box" style="background-color:${stationInfo.color};"></div>
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
  });


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

           // use jquery to display the station description to the sidebar
           $('#name').text(station.properties.name);


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
