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
        description: 'Lorimer St',
      };
    case 2:
      return {
        description: 'Sutter Ave',
      };
    case 3:
      return {
        description: '1st Ave',
      };
    case 4:
      return {
        description: 'Grand St',
      };
    case 5:
      return {
        description: 'Graham Ave',
      };
    case 6:
      return {
        description: 'Bedford Ave',
      };
    case 7:
      return {
        description: 'Montrose Ave',
      };
    case 8:
      return {
        description: 'Atlantic Ave',
      };
    case 9:
      return {
        description: 'Halsey St',
      };
    case 10:
      return {
        description: 'Myrtle - Wyckoff Aves',
      };
    case 11:
      return {
        description: 'Livonia Ave',
      };
    case 12:
      return {
        description: 'Canarsie - Rockaway Pkwy',
      };
    case 13:
      return {
        description: 'E 105th St',
      };
    case 14:
      return {
        description: 'New Lots Ave',
      };
    case 15:
      return {
        description: 'DeKalb Ave',
      };
    case 16:
      return {
        description: 'Bushwick - Aberdeen',
      };
    case 17:
      return {
        description: 'Broadway Junction',
      };
    case 18:
      return {
        description: 'Jefferson St',
      };
    case 19:
      return {
        description: 'Transportation & Utility',
      };
    case 18:
      return {
        description: 'Morgan Ave',
      };
    case 19:
      return {
        description: '3rd Ave',
      };
    case 20:
      return {
        description: 'Union Sq - 14th St',
      };
    case 21:
      return {
        description: '6th Ave',
      };
    case 22:
      return {
        description: '8th Ave',
      };

    default:
      return {
        description: 'Other',
      };
  }
};

// use jquery to programmatically create a Legend
// for numbers 1 - 11, get the land use color and description
for (var i=1; i<23; i++) {
  // lookup the landuse info for the current iteration
  const stationInfo = StationLookup(i);

  // this is a simple jQuery template, it will append a div to the legend with the description
  $('.legend').append(`
      <div class="sidebar" style="background-color:${stationInfo.description};"></div>
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
     'layout': {
        'visibility': 'visible',
   },
     paint: {
       'circle-radius': 5,
       'circle-color': 'red',
   }
 });


   map.addSource('rest_along_L',{
     type: 'geojson',
     data: 'data/rest_along_L.geojson',
   });

   map.addLayer({
      id: 'restaurant-circle',
      type: 'circle',
      source: 'rest_along_L',
      'layout': {
         'visibility': 'visible',
    },
      paint: {
        'circle-radius': 8,
        'circle-color': 'blue',
        'circle-opacity': 0.6,
    }
  });


   map.addSource('subway_lines',{
     type: 'geojson',
     data: 'data/subway_lines.geojson',
   });

   map.addLayer({
      id: 'subway_lines-L',
      type: 'line',
      source: 'subway_lines',
      'layout': {
         'visibility': 'visible',
    },
      paint: {
        'line-color': '#41ae76',
      }
// to filter the layer and include only L line
      filter: ["==","name","L"]
    });

    map.addLayer({
       id: 'subway_lines-line',
       type: 'line',
       source: 'subway_lines',
       'layout': {
          'visibility': 'visible',
     },
       paint: {
         'line-color': 'white',
     }
// to include all subway lines
       filter: ["!=","name","L"]
     });


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
    });

      map.addSource('l_train_stops',{
        type: 'geojson',
        data: 'data/l_train_stops.geojson',
      });

      map.addLayer({
         id: 'L-stops-circle',
         type: 'circle',
         source: 'l_train_stops',
         'layout': {
            'visibility': 'visible',
       },
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
          }
      });

var toggleableLayerIds = [ 'bars-circle', 'restaurant-circle', 'subway_lines-line', 'L-stops-circle'];

for (var i = 0; i < toggleableLayerIds.length; i++) {
   var id = toggleableLayerIds[i];

    var link = document.createElement('a');
    link.href = '#';
    link.className = 'active';
    link.textContent = id;

    link.onclick = function (e) {
        var clickedLayer = this.textContent;
        e.preventDefault();
        e.stopPropagation();

        var visibility = map.getLayoutProperty(clickedLayer, 'visibility');

        if (visibility === 'visible') {
            map.setLayoutProperty(clickedLayer, 'visibility', 'none');
            this.className = '';
        } else {
            this.className = 'active';
            map.setLayoutProperty(clickedLayer, 'visibility', 'visible');
        }
    };

        var layers = document.getElementById('menu');
        layers.appendChild(link);
        }


 // when the mouse moves, do stuff!
  map.on('mousemove', function (e) {
         // query for the features under the mouse, but only in the station layer
         var features = map.queryRenderedFeatures(e.point, {
             layers: ['L-stops-circle'],
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
