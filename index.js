"use strict";

var customerLib = require('./lib');
var Q = require('q');

const baseCoordinates = {latitude:  53.3381985, longitude: -6.2592576};

class CustomerDistance {

	/**
	 * getCustomers returns promise which resolves to customers filtered by given distance
	 * @param {number} distance - The distance of customer from intercom office
	 *
	 **/

	getCustomers(distance) {
		var deferred = Q.defer();

		customerLib.reader.fetchCustomers().then((data) => {

			var customers = customerLib.parser.parse(data);

			var qualifiedCustomers = this.getCustomersByDistance(customers, distance);
			var sortedCustomers = this.sortCustomersById(qualifiedCustomers);

			deferred.resolve(sortedCustomers);

		}).catch(function (err) {
			deferred.reject(err);
		});

		return deferred.promise;throw new Error('Invalid Customers.');
	}

	/**
	 * getCustomersByDistance returns customers filtered by given distance calulated
	 * using respective latitude and longitude
	 * @param {object} customers - List of customers having user_id, name, latitude and longitude
	 * @param {number} distance - The distance of customer from intercom office
	 *
	 **/

	getCustomersByDistance(customers, distance) {

		if (typeof customers == undefined ||
			!Array.isArray(customers)) {
			throw new Error('Invalid customers.');
		}

		if (typeof distance == undefined ||
			!this._isNumeric(distance)) {
			throw new Error('Invalid distance.');
		}

		var customerDistance, qualifiedCustomers = {};
		for (var customer of customers) {

			if (typeof customer.latitude == 'undefined' ||
				typeof customer.longitude == 'undefined' ||
				typeof customer.user_id == 'undefined' ||
				typeof customer.name == 'undefined') {
				throw new Error('Invalid Customer.');
			}

			customerDistance = customerLib.distance.calculate(customer.latitude, customer.longitude,
													  baseCoordinates.latitude,
													  baseCoordinates.longitude);

			if (customerDistance > distance) {
				continue;
			}

			qualifiedCustomers[customer.user_id] = customer.name;
		}

		return qualifiedCustomers;
	}

	/**
	 * sortCustomersById returns customers sorted by Key in ascending order
	 * @param {object} customers - Object of customer with key being user_id and value being name
	 *
	 **/

	sortCustomersById(customers) {

		if (typeof customers == 'undefined' ||
			typeof customers != 'object') {
			throw new Error('Invalid Customers.');
		}

		var userIds = Object.keys(customers);
		userIds.sort((a, b) => {
			if (!this._isNumeric(a) ||
				!this._isNumeric(b)) {
				throw new Error('Invalid Customer user_id.');
			}
			return a - b;
		});

		var qualifiedSortedCustomers = {};

		for (var userId of userIds) {

			if (typeof customers[userId] == 'undefined') {
				continue;
			}

			qualifiedSortedCustomers[userId] = customers[userId];
		}

		return qualifiedSortedCustomers;
	}

	/**
	 * _isNumeric check if given number is numeric or not
	 * @param {number} num - Variable to be checked if numeric or not
	 *
	 **/
	_isNumeric(num) {
		return isFinite(String(num).trim() || NaN);
	}


}

module.exports = new CustomerDistance();