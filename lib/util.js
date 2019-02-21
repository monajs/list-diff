"use strict";

exports.each = function (array, fn) {
	for (var i = 0; i < array.length; i++) {
		fn(array[i], i);
	}
};