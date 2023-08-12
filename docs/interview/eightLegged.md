---
description: 收录八股文相关文章
title: 八股文
readingTime: true
tag:
 - 招聘
recommend: 1
---

# 八股文

## 如何优化Vue中的大量条件选择v-if

**缺点**：
- 页面渲染性能下降，加载时间增加： 每个v-if 都需要遍历并计算这些条件，尤其是在条件选择复杂且计算开销较大时，会导致初始渲染的耗时增加，从而延长页面的加载时间。
- 冗余代码增加：过多的v-if 会导致模板代码变得冗长和难以维护。导致代码可读性降低，难以理解和调试。
- 可维护下降：当模板中存在大量的v-if时，由于每个条件判断都是独立的，修改其中一个条件可能需要修改多个地方，增加了出错的可能性，并使维护变得复杂。
- 内存增加： 每个v-if条件都会生成对应的DOM元素，并在切换条件时进行创建和销毁，当模板中存在大量的v-if时，会导致内存占用增加，对性能和资源消耗产生影响。

**解决方案**：
- 计算属性computed,v-if条件在computed中进行判断
- 用v-show代替v-if，解决缺点1，4
- 异步动态组件Dynamic components，结合了工厂模式的使用，在工厂组件中注册所有的component组件
- 将条件逻辑分解到更小的子组件

## 防抖和节流

**防抖**指的是在一定时间内只能**触发**一次事件，例如：搜索框输入过快、滚动条跳动频繁等。
```js
function debounce(fn, delay = 500) {
  let timer = null;//[!code focus]
  return function(...args) {
    if (timer !== null) {
      clearTimeout(timer);  //[!code focus]
    }
    timer = setTimeout(() => {
      fn.apply(this, args);//[!code focus]
      timer = null;//[!code focus]
    }, delay);
  };
}
```

**节流**指的是在一定时间内只能**执行**一次事件，例如：下拉加载更多、页面滚动等。
```js
function throttle(fn, delay = 500) {
  let last = 0;
  return function(...args) {//[!code focus]
    let now = new Date().getTime();//[!code focus]
    if (now - last > delay) {//[!code focus]
      last = now;//[!code focus]
      fn.apply(this, args);//[!code focus]
    }
  };
}
```

