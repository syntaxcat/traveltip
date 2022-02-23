export const mapService = {
	initMap,
	addMarker,
	panTo
};

import { locService } from './loc.service.js';

var gMap;
let infoWindow;
let marker;

function _onSaveLoc(lat, lng) {
	onSaveLoc(infoWindowInputValue, lat, lng);
}
window.infoWindowInputValue = '';
window._onSaveLoc = _onSaveLoc;
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
			infoWindow.close();
			infoWindow = new google.maps.InfoWindow({
				content: `<div class="msg">Name this location?
							<input type="text" class="user-location" oninput="infoWindowInputValue = this.value" placeholder="Enter loc name" size=10>
							<button class="save-btn" onclick="_onSaveLoc(
                                ${e.latLng.lat()},
                                ${e.latLng.lng()}
                            )">Save</button>
							</div>`,
				position: e.latLng
			});
			addMarker(e.latLng);
			infoWindow.open(gMap);
			console.log('e', e);
			panTo(e.latLng);
			console.log('e.LatLng', e.latLng);
		});
		infoWindow = new google.maps.InfoWindow();
		infoWindow.open();

		marker = new google.maps.Marker({ map: gMap });
	});
}

function addMarker(loc) {
	marker = new google.maps.Marker({
		position: loc,
		map: gMap,
		title: 'Hello World!',
		visible: true
	});
	return marker;
}

function panTo(laLatLng) {
	// var laLatLng = new google.maps.LatLng(lat, lng);
	gMap.panTo(laLatLng);
	console.log(laLatLng.lat(), laLatLng.lng());
}

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
