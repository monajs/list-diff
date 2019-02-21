exports.each = function (array, fn) {
	for (let i = 0; i < array.length; i++) {
		fn(array[i], i)
	}
}