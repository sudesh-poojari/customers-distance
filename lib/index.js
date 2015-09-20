"use strict";

class CustomerLib {

	constructor() {
		this.reader = require('./reader');
		this.parser = require('./parser');
		this.distance = require('./distance-calculator');
	}
}

module.exports = new CustomerLib();