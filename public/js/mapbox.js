/* eslint-disable */

const tourLocation = JSON.parse(
  document.getElementById('map').dataset.locations
);

// console.log(tourLocation);

mapboxgl.accessToken =
  'pk.eyJ1IjoianVzdC1rd2VzaSIsImEiOiJjbGZrMzR6c3UwNWhnM3N0YTJyN25rdHJ3In0.wtA2dCSx4oQBWrlWdPrzpw';
const map = new mapboxgl.Map({
  container: 'map', // container ID
  style: 'mapbox://styles/just-kwesi/clfk45v2q00b401nxvxgjjna4', // style URL
  scrollZoom: false,
  //   center: [-74.5, 40], // starting position [lng, lat]
  //   zoom: 9, // starting zoom
});

const bounds = new mapboxgl.LngLatBounds();

tourLocation.forEach((loc) => {
  // add marker
  const el = document.createElement('div');
  el.className = 'marker';

  new mapboxgl.Marker({
    element: el,
    anchor: 'bottom',
  })
    .setLngLat(loc.coordinates)
    .addTo(map);

  //add popup
  new mapboxgl.Popup({
    offset: 30,
  })
    .setLngLat(loc.coordinates)
    .setHTML(`<p>Day ${loc.day}: ${loc.description}</p>`)
    .addTo(map);

  bounds.extend(loc.coordinates);
});

map.fitBounds(bounds, {
  padding: {
    top: 200,
    bottom: 100,
    left: 100,
    right: 100,
  },
});
