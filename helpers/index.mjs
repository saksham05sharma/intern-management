// The function to omit a particluar key from an object
export const omit = (obj, key) => {
	let object = obj;
	if (obj._doc) object = obj.toJSON();
	const { [key]: omitted, ...rest } = object;
	return rest;
};

// The function to filter object from an array of objects with a particular value
export const filter = (arr, value) => arr.filter((ele) => ele !== value);

// Max and Min

export const max = (a, b) => (a > b ? a : b);
export const min = (a, b) => (a < b ? a : b);

// The Sleep function for to delay the execution of a process

export const sleep = (seconds) =>
	new Promise((resolve) => setTimeout(resolve, seconds * 1000));
// The function to produce random numbers between a range

export const random = (min, max) =>
	Math.floor(Math.random() * (max - min + 1)) + min;

// The function to get a field of any object from an array of objects

export const pluck = (field, value, arr, requested) =>
	arr.find((a) => a[field] === value)[requested];

// The function to remove selected elements from an array

export const remove = (arr, ...args) => {
	let _arr = arr.slice();
	args.forEach((val) => {
		_arr.splice(_arr.indexOf(val), 1);
	});
	return _arr;
};
