require('babel-register')
const listDiff = require('../src/diff.js')

const diff = listDiff([{
	key: '1',
	name: 'a'
}, {
	key: '2',
	name: 'b'
}, {
	key: '3',
	name: 'c'
}, {
	key: '4',
	name: 'd'
}], [{
	key: '6',
	name: 'f'
}, {
	key: '3',
	name: 'c'
}, {
	key: '4',
	name: 'd'
}, {
	key: '1',
	name: 'a'
}], 'key')

console.log(diff.moves)