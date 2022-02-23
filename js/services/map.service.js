export const mapService = {
	initMap,
	addMarker,
	panTo
};

import { storageService } from './services/storage.service.js';

var gMap;

function initMap(lat = 32.0749831, lng = 34.9120554) {
	console.log('InitMap');
	return _connectGoogleApi().then(() => {
		console.log('google available');
		gMap = new google.maps.Map(document.querySelector('#map'), {
			center: { lat, lng },
			zoom: 15
		});
		console.log('Map!', gMap);
		gMap.addListener('click', (e) => {
			addMarker(e.latLng);
			console.log('e', e);
			panTo(e.latLng);
			console.log('e.LatLng', e.latLng);
			saveLocation();
		});
	});
}

function addMarker(loc) {
	var marker = new google.maps.Marker({
		position: loc,
		map: gMap,
		title: 'Hello World!'
	});
	return marker;
}

function panTo(laLatLng) {
	// var laLatLng = new google.maps.LatLng(lat, lng);
	gMap.panTo(laLatLng);
	console.log(laLatLng.lat(), laLatLng.lng());
}
// function panTo(lat, lng) {
// 	var laLatLng = new google.maps.LatLng(lat, lng);
// 	gMap.panTo(laLatLng);
// }

function _connectGoogleApi() {
	if (window.google) return Promise.resolve();
	const API_KEY = 'AIzaSyBIIJxF_yfMzCne22NG36zhttQQMsIQhp8';
	var elGoogleApi = document.createElement('script');
	elGoogleApi.src = `https://maps.googleapis.com/maps/api/js?key=${API_KEY}`;
	elGoogleApi.async = true;
	document.body.append(elGoogleApi);

	return new Promise((resolve, reject) => {
		elGoogleApi.onload = resolve;
		elGoogleApi.onerror = () => reject('Google script failed to load');
	});
}
