export const locService = {
	getLocs,
	saveLocation,
	getLocByName,
	createLoc,
	saveLoc
};
import { storageService } from './storage.service.js';

const STORAGE_KEY = 'locationsDB';

const locs = [
	{
		id: 2,
		name: 'Greatplace',
		lat: 32.047104,
		lng: 34.832384,
		weather: 'sunny',
		createdAt: Date.now(),
		updatedAt: 111
	},
	{
		id: 1,
		name: 'Neveragain',
		lat: 32.047201,
		lng: 34.832581,
		weather: 'rainy',
		createdAt: Date.now(),
		updatedAt: 222
	}
];

const gLocs = locs;

function getLocs() {
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			resolve(locs);
		}, 2000);
	});
}

function saveLocation() {
	storageService.saveToStorage(STORAGE_KEY, locs);
}


function getLocByName(val) {
	return gLocs.map(loc => loc.name === val)
}

function createLoc(loc) {

	const location = {
		id: id++,
		name: loc,
		lat: gCurrLat,
		lng: gCurrLng,
		weather: 'rainy',
		createdAt: Date.now(),
		updatedAt: 222
	}

	return location
}

function saveLoc(loc) {
	gLocs.unshift(loc)
	locService.saveLocation(STORAGE_KEY, gLocs);
}
