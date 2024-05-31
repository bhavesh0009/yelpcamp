mapboxgl.accessToken = mapToken;
// campground = JSON.parse(campground);
console.log(campground.geometry)

const map = new mapboxgl.Map({
    container: 'map', // container ID
    style: 'mapbox://styles/mapbox/streets-v12', // style URL
    center: campground.geometry.coordinates,
    zoom: 9, // starting zoom
});

new mapboxgl.Marker()
    .setLngLat(campground.geometry.coordinates)
    .addTo(map);