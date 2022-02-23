export const locService = {
	getLocs,
	saveLocation
};
import { storageService } from './storage.service.js';

const STORAGE_KEY = 'locationsDB';

const locs = [
	{
		id: 1,
		name: 'Greatplace',
		lat: 32.047104,
		lng: 34.832384,
		weather: 'sunny',
		createdAt: Date.now(),
		updatedAt: 111
	},
	{
		id: 2,
		name: 'Neveragain',
		lat: 32.047201,
		lng: 34.832581,
		weather: 'rainy',
		createdAt: Date.now(),
		updatedAt: 222
	}
];

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
