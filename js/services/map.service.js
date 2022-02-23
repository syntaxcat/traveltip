export const mapService = {
	initMap,
	addMarker,
	panTo,
	showLocation,
	handleLocationError,
	searchAddress
};

const API_KEY = 'AIzaSyBIIJxF_yfMzCne22NG36zhttQQMsIQhp8';

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

function panTo(pos) {
	gMap.panTo(pos);
}

function _connectGoogleApi() {
	if (window.google) return Promise.resolve();
	var elGoogleApi = document.createElement('script');
	elGoogleApi.src = `https://maps.googleapis.com/maps/api/js?key=${API_KEY}`;
	elGoogleApi.async = true;
	document.body.append(elGoogleApi);

	return new Promise((resolve, reject) => {
		elGoogleApi.onload = resolve;
		elGoogleApi.onerror = () => reject('Google script failed to load');
	});
}

function showLocation(position) {
	initMap(position.coords.latitude, position.coords.longitude);
}

function handleLocationError(error) {
	var locationError = document.getElementById('locationError');

	switch (error.code) {
		case 0:
			locationError.innerHTML = 'There was an error while retrieving your location: ' + error.message;
			break;
		case 1:
			locationError.innerHTML = "The user didn't allow this page to retrieve a location.";
			break;
		case 2:
			locationError.innerHTML = 'The browser was unable to determine your location: ' + error.message;
			break;
		case 3:
			locationError.innerHTML = 'The browser timed out before retrieving the location.';
			break;
	}
}

function searchAddress(address) {
	const geocoder = new google.maps.Geocoder();
	geocoder.geocode({ address: address }, function(results, status) {
		if (status == 'OK') {
			panTo(results[0].geometry.location);
		} else {
			alert('Geocode was not successful for the following reason: ' + status);
		}
	});
}
