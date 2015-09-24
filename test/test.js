var chai = require('chai');
var expect = chai.expect;

var customerDistance = require('../index');
var customerLib = require('../lib/');

describe('Parser', function () {

	it('Data output', function () {

		var inputData = "";
		var output = customerLib.parser.parse(inputData);
		expect(output).to.eql([]);

		inputData = `{"latitude": "51.92893", "user_id": 1, "name": "Alice Cahill", "longitude": "-10.27699"}
{"latitude": "51.8856167", "user_id": 2, "name": "Ian McArdle", "longitude": "-10.4240951"}
{"latitude": "52.3191841", "user_id": 3, "name": "Jack Enright", "longitude": "-8.5072391"}
{"latitude": "53.807778", "user_id": 28, "name": "Charlie Halligan", "longitude": "-7.714444"}
`;
		output = customerLib.parser.parse(inputData);
		var expectedOutput = [ { latitude: '51.92893',
							    user_id: 1,
							    name: 'Alice Cahill',
							    longitude: '-10.27699' },
							  { latitude: '51.8856167',
							    user_id: 2,
							    name: 'Ian McArdle',
							    longitude: '-10.4240951' },
							  { latitude: '52.3191841',
							    user_id: 3,
							    name: 'Jack Enright',
							    longitude: '-8.5072391' },
							  { latitude: '53.807778',
							    user_id: 28,
							    name: 'Charlie Halligan',
							    longitude: '-7.714444' } ];
		expect(output).to.eql(expectedOutput);
	});

	it('Validate', function () {

		expect(customerLib.parser.parse.bind(customerLib)).to.throw("Please provide input string to parse.");
		expect(customerLib.parser.parse.bind(customerLib, [])).to.throw("Invalid argument expected string.");
		expect(customerLib.parser.parse.bind(customerLib, "[{]}")).to.throw("Invalid data to parse");

	});
});

describe('Distance', function () {

	it('Output', function () {

		var lat1 = '38.898556', lon1 = '-77.037852', lat2 = '38.897147', lon2 = '-77.043934';
		var output = customerLib.distance.calculate(lat1, lon1, lat2, lon2);
		expect(output).to.equals("0.549");

	});

	it('Validate', function () {

		var lat1 = '38.898556', lon1 = '-77.037852', lat2 = '38.897147', lon2 = '-77.043934';
		var undefinedVar, invalidLatitude = 91, invalidLongitude = 181;

		expect(customerLib.distance.calculate.bind(customerLib, undefinedVar, lon1, lat2, lon2)).to.throw("Latitude 1 required");
		expect(customerLib.distance.calculate.bind(customerLib, lat1, lon1, undefinedVar, lon2)).to.throw("Latitude 2 required");
		expect(customerLib.distance.calculate.bind(customerLib, lat1, undefinedVar, lat2, lon2)).to.throw("Longitude 1 required");
		expect(customerLib.distance.calculate.bind(customerLib, lat1, lon1, lat2, undefinedVar)).to.throw("Longitude 2 required");

		expect(customerLib.distance.calculate.bind(customerLib, invalidLatitude, lon1, lat2, lon2)).to.throw("Invalid Latitude 1.");
		expect(customerLib.distance.calculate.bind(customerLib, lat1, lon1, invalidLatitude, lon2)).to.throw("Invalid Latitude 2.");
		expect(customerLib.distance.calculate.bind(customerLib, lat1, invalidLongitude, lat2, lon2)).to.throw("Invalid Longitude 1.");
		expect(customerLib.distance.calculate.bind(customerLib, lat1, lon1, lat2, invalidLongitude)).to.throw("Invalid Longitude 2.");

	});

});

describe('Customer', function () {

	it('Check Get Customer by Distance', function (done) {

		var expectedOutput = { '4': 'Ian Kehoe',
							  '5': 'Nora Dempsey',
							  '6': 'Theresa Enright',
							  '8': 'Eoin Ahearn',
							  '11': 'Richard Finnegan',
							  '12': 'Christina McArdle',
							  '13': 'Olive Ahearn',
							  '15': 'Michael Ahearn',
							  '17': 'Patricia Cahill',
							  '23': 'Eoin Gallagher',
							  '24': 'Rose Enright',
							  '26': 'Stephen McArdle',
							  '29': 'Oliver Ahearn',
							  '30': 'Nick Enright',
							  '31': 'Alan Behan',
							  '39': 'Lisa Ahearn' };

		customerDistance.getCustomersByDistance(100).then(function (output) {
			expect(output).to.eql(expectedOutput);
			done();
		}).catch(function (err) {
			done(err);
		});

	});

	it('Filter by distance', function () {

		var inputData = [ { latitude: '51.92893',
						    user_id: 1,
						    name: 'Alice Cahill',
						    longitude: '-10.27699' },
						  { latitude: '51.8856167',
						    user_id: 2,
						    name: 'Ian McArdle',
						    longitude: '-10.4240951' },
						  { latitude: '52.3191841',
						    user_id: 3,
						    name: 'Jack Enright',
						    longitude: '-8.5072391' },
						  { latitude: '53.807778',
						    user_id: 28,
						    name: 'Charlie Halligan',
						    longitude: '-7.714444' } ];

		var output = customerDistance.filterCustomersByDistance(inputData, 200);
		var expectedOutput = { '3': 'Jack Enright', '28': 'Charlie Halligan' };
		expect(output).to.eql(expectedOutput);

		output = customerDistance.filterCustomersByDistance(inputData, 100);
		expect(output).to.eql({});

		output = customerDistance.filterCustomersByDistance([], 100);
		expect(output).to.eql({});

	});

	it('Validate by distance', function () {

		var undefinedVar, distance = 200;
		var customers = [ { latitude: '51.92893',
						    user_id: 1,
						    name: 'Alice Cahill',
						    longitude: '-10.27699' },
						  { latitude: '51.8856167',
						    user_id: 2,
						    name: 'Ian McArdle',
						    longitude: '-10.4240951' },
						  { latitude: '52.3191841',
						    user_id: 3,
						    name: 'Jack Enright',
						    longitude: '-8.5072391' },
						  { latitude: '53.807778',
						    user_id: 28,
						    name: 'Charlie Halligan',
						    longitude: '-7.714444' } ];

		expect(customerDistance.filterCustomersByDistance.bind(customerDistance, undefinedVar, distance)).to.throw("Invalid customers.");
		expect(customerDistance.filterCustomersByDistance.bind(customerDistance, customers, undefinedVar)).to.throw("Invalid distance.");
		expect(customerDistance.filterCustomersByDistance.bind(customerDistance, customers, "2ad")).to.throw("Invalid distance.");
	});

	it('Sort by Id', function () {

		var inputData = { '3': 'Jack Enright', '28': 'Charlie Halligan', '2': 'Ian McArdle', '1': 'Alice Cahill'};
		var output = customerDistance.sortCustomersById(inputData);
		var expectedOutput = {'1': 'Alice Cahill', '2': 'Ian McArdle', '3': 'Jack Enright', '28': 'Charlie Halligan'};
		expect(output).to.eql(expectedOutput);

		output = customerDistance.sortCustomersById({'1': 'Test'});
		expect(output).to.eql({'1': 'Test'});

		output = customerDistance.sortCustomersById({});
		expect(output).to.eql({});

	});

	it('Validate Sort', function () {
		expect(customerDistance.sortCustomersById.bind(customerDistance)).to.throw("Invalid Customers.");
		expect(customerDistance.sortCustomersById.bind(customerDistance, "")).to.throw("Invalid Customers.");
		expect(customerDistance.sortCustomersById.bind(customerDistance, {'as': 'Test', 'aq': 'Test2'})).to.throw("Invalid Customer user_id.");
	});

});