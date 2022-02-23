import { locService } from './services/loc.service.js';
import { mapService } from './services/map.service.js';

window.onload = onInit;
window.onAddMarker = onAddMarker;
window.onPanTo = onPanTo;
window.onGetLocs = onGetLocs;
window.onGetUserPos = onGetUserPos;
window.onGoAndSaveLoc = onGoAndSaveLoc;
window.onSaveLoc = onSaveLoc;
window.onGo = onGo;
window.onDelete = onDelete;
window.onGetPosition = onGetPosition;

function onInit() {
	mapService
		.initMap()
		.then(() => {
			console.log('Map is ready');
		})
		.catch(() => console.log('Error: cannot init map'));
	renderLocations();
}

// This function provides a Promise API to the callback-based-api of getCurrentPosition
function getPosition() {
	console.log('Getting Pos');
	return new Promise((resolve, reject) => {
		navigator.geolocation.getCurrentPosition(resolve, reject);
	});
}

function onAddMarker() {
	console.log('Adding a marker');
	mapService.addMarker({ lat: 32.0749831, lng: 34.9120554 });
}

function onGetLocs() {
	locService.getLocs().then((locs) => {
		console.log('Locations:', locs);
		document.querySelector('.locs').innerText = JSON.stringify(locs);
	});
}

function onGetUserPos() {
	getPosition()
		.then((pos) => {
			console.log('User position is:', pos.coords);
			document.querySelector('.user-pos').innerText = `Latitude: ${pos.coords.latitude} - Longitude: ${pos.coords
				.longitude}`;
		})
		.catch((err) => {
			console.log('err!!!', err);
		});
}

function onPanTo() {
	console.log('Panning the Map');
	mapService.panTo(35.6895, 139.6917);
}

// var elLocName = document.querySelector('.search-input');
// console.log(elLocName)

function onSaveLoc(name, lat, lng) {
	// createLoc(loc)
	saveLoc(name, lat, lng);
	renderLocations(name)
}

function onGoAndSaveLoc() {
	createLoc(loc);
}

function renderLocations() {
	console.log(mapService)

	var strHtmls = locService.gLocs.map(loc => {
		return `<table>
							<tr>
								<td>${loc.name}</td>
									<td> <button onclick="onGo(${loc.lat},${loc.lng})">GO</button></td>
								<td><button onclick="onDelete('${loc.name}')">Delete</button></td>
							</tr>
						</table>		
					`
	})
	document.querySelector('.locations-table').innerHTML = strHtmls.join('')
}

function onGo(lat, lng) {
	var location = {
		lat,
		lng
	}
	// console.log(lat, lng)
	mapService.panTo(location)
}


function onDelete(loc) {
	var idx = getLocIdxByName(loc)
	locService.deleteLoc(idx)
	renderLocations()
}

function getLocIdxByName(name) {
	console.log(locService)
	return locService.gLocs.findIndex(loc => name === loc.name)
}

function onGetPosition() {
    navigator.geolocation.getCurrentPosition(mapService.showLocation, mapService.handleLocationError);
}
