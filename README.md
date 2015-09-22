# Customers Distance
NodeJS application to fetch customers by distance from intercom HQ


## Executing the code

```var customerDistance = require('customers-distance');
customerDistance.getCustomers(100).then(function (data) {
	console.log("Filtered & Sorted Customer", data);
}).catch(function (err) {
	console.log("Error", err);
});
```
