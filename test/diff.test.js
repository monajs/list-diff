require('babel-register')
const listDiff = require('../src/diff.js')
const { each } = require('../src/util')
const { types } = require('../src/config')
const chai = require('chai')
chai.should()

describe('test diff.js', () => {
	// 数组全等对比
	function assertListEqual (list1, list2) {
		each(list1, (item, idx) => {
			each(list2, (v, i) => {
				if (idx === i) {
					item.should.be.deep.equal(v)
				}
			})
		})
	}

	// 数组还原
	function patch (oldList, moves) {
		const oldList1 = JSON.parse(JSON.stringify(oldList))
		const resList = []
		let newListLength = oldList1.length
		moves.forEach(move => {
			if (move.type === types.INSERT) {
				resList[move.currentIndex] = move.item
				newListLength = newListLength + 1
			} else if (move.type === types.MOVE) {
				oldList1.forEach((item, idx) => {
					if (idx === move.originIndex) {
						oldList1[idx] = undefined
					}
				})
				resList[move.currentIndex] = move.item
			} else if (move.type === types.REMOVE) {
				oldList1[move.originIndex] = undefined
				newListLength = newListLength - 1
			}
		})

		const oldList2 = oldList1.filter(v => {
			return v !== undefined
		})
		resList.length = newListLength
		each(resList, (item, idx) => {
			if (item === undefined) {
				resList[idx] = oldList2.shift()
			}
		})
		return resList
	}

	it('Removing items in the front', () => {
		const oldList = [
			{ key: '1', name: 'a' },
			{ key: '2', name: 'b' },
			{ key: '3', name: 'c' },
			{ key: '4', name: 'd' }
		]
		const newList = [
			{ key: '2', name: 'b' },
			{ key: '3', name: 'c' },
			{ key: '4', name: 'd' }
		]
		const diff = listDiff(oldList, newList, 'key')
		diff.moves.length.should.equal(1)
		const list = patch(oldList, diff.moves)
		assertListEqual(newList, list)
	})

	it('Removing items in the middel', () => {
		const oldList = [
			{ key: '1', name: 'a' },
			{ key: '2', name: 'b' },
			{ key: '3', name: 'c' },
			{ key: '4', name: 'd' }
		]
		const newList = [
			{ key: '1', name: 'a' },
			{ key: '4', name: 'd' }
		]
		const diff = listDiff(oldList, newList, 'key')
		// diff.moves.length.should.equal(2)
		// const list = patch(oldList, diff.moves)
		// assertListEqual(newList, list)
	})
})
