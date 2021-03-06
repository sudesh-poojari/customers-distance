"use strict";

class Reader {


	/**
	 * fetchCustomers returns promise which resolves to data list of customer from github
	 *
	 **/

	fetchCustomers() {

		return new Promise(function (resolve, reject) {

			var https = require('https');
			var options = {
				host: 'gist.githubusercontent.com',
				port: 443,
				path: '/brianw/19896c50afa89ad4dec3/raw/6c11047887a03483c50017c1d451667fd62a53ca/gistfile1.txt',
				method: 'GET'
			}

			var req = https.request(options, function(res) {

				var customersStr = '';
				res.on('data', function(data) {
					customersStr += data;
				});

				res.on('end', function () {
					resolve(customersStr);
				});
			});
			req.end();

			req.on('error', function(err) {
				reject(err);
			});

		});

	}

}

module.exports = new Reader();