# List Diff（O(N)）

✨✨ 对比两个列表的差异，计算最小编辑距离

[![npm](https://img.shields.io/npm/v/@monajs/list-diff.svg?style=flat-square)](https://www.npmjs.com/package/@monajs/list-diff)
[![npm](https://img.shields.io/npm/dt/@monajs/list-diff.svg?style=flat-square)](https://www.npmjs.com/package/@monajs/list-diff)

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

#### output:
```
[{
    type: 'insert',
    originIndex: null,
    currentIndex: 1,
    item: { key: '5', name: 'e' }
}, {
    type: 'insert',
    originIndex: null,
    currentIndex: 2,
    item: { key: '6', name: 'f' }
}, {
    type: 'move',
    originIndex: 0,
    currentIndex: 3,
    item: { key: '1', name: 'a' }
}, {
    type: 'insert',
    originIndex: null,
    currentIndex: 4,
    item: { key: '7', name: 'g' }
}, {
    type: 'remove',
    originIndex: 2,
    currentIndex: null,
    item: { key: '3', name: 'c' }
}]
```

## 联系我
> 微信：yx12032331
