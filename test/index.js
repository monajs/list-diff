require('babel-register')
const listDiff = require('../index.js')

listDiff(['a', 'b', 'c', 'd'], ['f', 'c', 'd', 'a'])