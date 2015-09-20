"use strict";

class DistanceCalculator {


	/**
	 * calculate return distance between two latitude and longitudes in KM
	 * @param {number} latitude1 - Latitude of first point
	 * @param {number} longitude1 - Longitude of first point
	 * @param {number} latitude1 - Latitude of second point
	 * @param {number} longitude2 - Longitude of second point
	 *
	 **/

	calculate(latitude1, longitude1, latitude2, longitude2) {

		if (typeof latitude1 == 'undefined') {
			throw new Error('Latitude 1 required');
		}

		if (typeof longitude1 == 'undefined') {
			throw new Error('Longitude 1 required');
		}

		if (typeof latitude2 == 'undefined') {
			throw new Error('Latitude 2 required');
		}

		if (typeof longitude2 == 'undefined') {
			throw new Error('Longitude 2 required');
		}

		if (latitude1 < -90 || latitude1 > 90) {
			throw new Error('Invalid Latitude 1.');
		}

		if (longitude1 < -180 || longitude1 > 180) {
			throw new Error('Invalid Longitude 1.');
		}

		if (latitude2 < -90 || latitude2 > 90) {
			throw new Error('Invalid Latitude 2.');
		}

		if (longitude2 < -180 || longitude2 > 180) {
			throw new Error('Invalid Longitude 2.');
		}

		var radianlatitude1 = Math.PI * latitude1/180;
		var radianlatitude2 = Math.PI * latitude2/180;
		var radianlongitude1 = Math.PI * longitude1/180;
		var radianlongitude2 = Math.PI * longitude2/180;
		var theta = longitude1-longitude2
		var radiantheta = Math.PI * theta/180;
		var dist = Math.sin(radianlatitude1) * Math.sin(radianlatitude2) + Math.cos(radianlatitude1) * Math.cos(radianlatitude2) * Math.cos(radiantheta);
		dist = Math.acos(dist);
		dist = dist * 180/Math.PI;
		dist = dist * 60 * 1.1515;
		dist = dist * 1.609344;
		return dist.toFixed(3);
	}

}

module.exports = new DistanceCalculator();