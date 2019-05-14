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

// START Modal
$(window).on('load',function(){
    $('#StartModalLong').modal('show');
});
