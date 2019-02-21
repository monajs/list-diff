/***
 * Diff two list in O(N).
 * @param {Array} oldTree - Original List
 * @param {Array} newTree - New List
 * @param {String} key - Compare Key
 * @returns {Object} {moves: <Array>}
 *                  - moves is a list of actions that telling how to remove and insert
 */

const { each } = require('./util')
const { types } = require('./config')

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
				const move = {
					type: types.MOVE,
					originIndex: mountIndex,
					currentIndex: nextIndex,
					item: currentItem
				}
				moves.push(move)
			}
			lastIndex = Math.max(mountIndex, lastIndex)
		} else {
			// insert
			const move = {
				type: types.INSERT,
				originIndex: null,
				currentIndex: nextIndex,
				item: currentItem
			}
			moves.push(move)
		}
		nextIndex = nextIndex + 1
	}

	each(oldTree, (v, i) => {
		if (!has(newTreeMap, v[key])) {
			// remove
			const move = {
				type: types.REMOVE,
				originIndex: i,
				currentIndex: null,
				item: v
			}
			moves.push(move)
		}
	})

	console.log(moves)
	return {
		moves
	}
}

function list2Map (list, key) {
	let map = {}
	each(list, (v, i) => {
		const item = Object.assign({}, v)
		item._mountIndex = i
		map[v[key]] = item
	})
	return map
}

function has (map, key) {
	return map[key] !== undefined
}

module.exports = listDiff
