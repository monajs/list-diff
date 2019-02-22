# Mona - List Diff（O(N)）

✨✨ 对比两个列表的差异，计算最小编辑距离

<p align="center">
    <img src="https://img.shields.io/npm/v/@monajs/list-diff.svg?style=flat" alt="npm version" />
    <img src="https://travis-ci.org/youzan/@monajs/list-diff.svg?branch=master" alt="Build Status" />
    <img src="https://img.shields.io/npm/dm/@monajs/list-diff.svg" alt="downloads" />
    <img src="https://img.shields.io/codecov/c/github/youzan/list-diff/dev.svg" alt="Coverage Status" />
</p>

## 相关文档

* https://zhuanlan.zhihu.com/p/20346379
* https://github.com/livoras/blog/issues/13

## 安装

```bash
$ npm i --save @monajs/list-diff
```

## 使用

```js
import listDiff from '@monajs/list-diff'

const oldList = [
    { key: '1', name: 'a' },
    { key: '2', name: 'b' },
    { key: '3', name: 'c' },
    { key: '4', name: 'd' }
]
const newList = [
    { key: '2', name: 'b' },
    { key: '5', name: 'e' },
    { key: '6', name: 'f' },
    { key: '1', name: 'a' },
    { key: '7', name: 'g' },
    { key: '4', name: 'd' }
]

const diff = listDiff(oldList, newList, 'key')
console.log(diff.moves)
```

## 联系我
> 微信：599321378
