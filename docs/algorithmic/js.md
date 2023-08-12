---
description: 收录算法相关文章
title: JavaScript
readingTime: true
tag:
 - 算法
recommend: 1
---

# JavaScript 算法

## 数组扁平化 
> let arr = [1, [2, [3, 4，5]]];
> 
> console.log(flatten(arr)); // [1, 2, 3, 4，5]
```js
// toString() + split() 实现  
return arr.toString().split(',').map(item => Number(item));

// reduce 实现
return arr.reduce((target, item) => {
    return target.concat(Array.isArray(item) ? flatten(item) : item);
}, [])

// join() + split() 实现
return arr.join(',').split(',').map(item => Number(item));

// 递归实现
let res = [];
arr.forEach(item => {
    if (Array.isArray(item)) {
        res = res.concat(flatten(item))
    } else {
        res.push(item);
    }
});
return res;

// 扩展运算符实现
while(arr.some(item => Array.isArray(item))){
    arr = [].concat(...arr);
}
return arr;
```