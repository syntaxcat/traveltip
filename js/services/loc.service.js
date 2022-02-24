var gLocs;
import { storageService } from './storage.service.js';

const STORAGE_KEY = 'locationsDB';

window.saveLoc = saveLoc;

let id = 0;

var locs = [
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

gLocs = storageService.loadFromStorage(STORAGE_KEY) || locs;

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
	return gLocs.map((loc) => loc.name === val);
}

function createLoc(name, lat, lng) {
	const location = {
		id: id++,
		name,
		lat,
		lng,
		weather: 'rainy',
		createdAt: Date.now(),
		updatedAt: 222
	};

	return location;
}

function saveLoc(name, lat, lng) {
	const newLoc = createLoc(name, lat, lng);
	gLocs.unshift(newLoc);
	locService.saveLocation(STORAGE_KEY, gLocs);
}

function deleteLoc(idx) {
	gLocs.splice(idx, 1);
	storageService.saveToStorage(STORAGE_KEY, gLocs);
}

export const locService = {
	getLocs,
	saveLocation,
	getLocByName,
	createLoc,
	saveLoc,
	deleteLoc,
	gLocs
};
