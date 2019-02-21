/***
 * Diff two list in O(N).
 * @param {Array} oldTree - Original List
 * @param {Array} newTree - New List
 * @param {String} key - Compare Key
 * @returns {Object} {moves: <Array>}
 *                  - moves is a list of actions that telling how to remove and insert
 */

const { each } = require('./util')

const types = {
	MOVE: 'move',
	REMOVE: 'remove',
	INSERT: 'insert'
}

function listDiff (oldTree, newTree, key) {
	let oldTreeMap = list2Map(oldTree, key)
	const newTreeMap = list2Map(newTree, key)
	let lastIndex = 0
	let nextIndex = 0
	let moves = []

	while (nextIndex < newTree.length) {
		const currentItem = newTree[nextIndex]
		if (has(oldTreeMap, currentItem[key])) {
			const oldItem = oldTreeMap[currentItem[key]]
			const mountIndex = oldItem._mountIndex
			if (lastIndex >= mountIndex) {
				// move
				moves.push({
					type: types.MOVE,
					originIndex: mountIndex,
					currentIndex: nextIndex,
					item: currentItem
				})
			}
			lastIndex = Math.max(mountIndex, lastIndex)
		} else {
			// insert
			moves.push({
				type: types.INSERT,
				originIndex: null,
				currentIndex: nextIndex,
				item: currentItem
			})
		}
		nextIndex = nextIndex + 1
	}

	each(oldTree, (v, i) => {
		if (!has(newTreeMap, v[key])) {
			// remove
			moves.push({
				type: types.REMOVE,
				originIndex: i,
				currentIndex: null,
				item: v
			})
		}
	})

	return {
		moves
	}
}

function list2Map (list, key) {
	let map = {}
	each(list, (v, i) => {
		v._mountIndex = i
		map[v[key]] = v
	})
	return map
}

function has (map, key) {
	return map[key] !== undefined
}

module.exports = listDiff