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

//Get modal element
var modal = document.getElementsByClassName('simpleModal');
//get close button
var closeBtn = document.getElementByClassName('closeBtn'); [0];

//Listen for close click
closeBtn.addEventListener('click', closeModal);
// Listen for outside click
window.addEventListener('click', outsideClick);
// Function to close the modal
function closeModal (){
  modal.style.display = 'none';
}
// Function to close the modal if outside click
function outsideClick (e){
  if(e.target == modal){
    modal.style.display = 'none';
  }
}

// call geojson files
$.getJSON('subway_lines'.geojson, function(data) {
	// the data is now available inside this function only as 'data'
	console.log(data);
})
