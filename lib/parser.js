"use strict";

class Parser {


	/**
	 * parse parses given string and returns data object
	 * @param {string} data - String containing records new line separated
	 *
	 **/

	parse(data) {

		if (typeof data == 'undefined') {
			throw new Error("Please provide input string to parse.");
		}

		if (typeof data != 'string') {
			throw new Error("Invalid argument expected string.");
		}

		var parsedData = [];

		var dataPerLine = data.split(/[\n\r]+/g);

		for (var row of dataPerLine) {

			if (row.length <= 0) {
				continue;
			}

			try {
				//Trusting JSON object as the data source is fixed
				var rowJson = JSON.parse(row);
				parsedData.push(rowJson);
			} catch (e) {
				throw new Error('Invalid data to parse');
			}

		}

		return parsedData;

	}

}
	
module.exports = new Parser();