'use strict';

/***
 * Diff two list in O(N).
 * @param {Array} oldTree - Original List
 * @param {Array} newTree - New List
 * @param {String} key - Compare Key
 * @returns {Object} {moves: <Array>}
 *                  - moves is a list of actions that telling how to remove and insert
 */

var _require = require('./util'),
    each = _require.each;

var _require2 = require('./config'),
    types = _require2.types;

function listDiff(oldTree, newTree, key) {
	var oldTreeMap = list2Map(oldTree, key);
	var newTreeMap = list2Map(newTree, key);
	var lastIndex = 0;
	var nextIndex = 0;
	var moves = [];

	while (nextIndex < newTree.length) {
		var currentItem = newTree[nextIndex];
		if (has(oldTreeMap, currentItem[key])) {
			var oldItem = oldTreeMap[currentItem[key]];
			var mountIndex = oldItem._mountIndex;
			if (lastIndex > mountIndex) {
				// move
				var move = {
					type: types.MOVE,
					originIndex: mountIndex,
					currentIndex: nextIndex,
					item: currentItem
				};
				moves.push(move);
			}
			lastIndex = Math.max(mountIndex, lastIndex);
		} else {
			// insert
			var _move = {
				type: types.INSERT,
				originIndex: null,
				currentIndex: nextIndex,
				item: currentItem
			};
			moves.push(_move);
		}
		nextIndex = nextIndex + 1;
	}

	each(oldTree, function (v, i) {
		if (!has(newTreeMap, v[key])) {
			// remove
			var _move2 = {
				type: types.REMOVE,
				originIndex: i,
				currentIndex: null,
				item: v
			};
			moves.push(_move2);
		}
	});

	return {
		moves: moves
	};
}

function list2Map(list, key) {
	var map = {};
	each(list, function (v, i) {
		var item = Object.assign({}, v);
		item._mountIndex = i;
		map[v[key]] = item;
	});
	return map;
}

function has(map, key) {
	return map[key] !== undefined;
}

module.exports = listDiff;