---
author: 小满zs
description: 来源于小满zs Pinia
title: Pinia 🍍
readingTime: true
tag:
 - vue3
recommend: 2
---

# Pinia 🍍

## 安装，介绍

> 前言 全局状态管理工具
>
> Pinia.js 有如下特点：
>
> - 完整的 ts 的支持；
> - 足够轻量，压缩后的体积只有 1kb 左右；
> - 去除 mutations，只有 state，getters，actions；
> - actions 支持同步和异步；
> - 代码扁平化没有模块嵌套，只有 store 的概念，store 之间可以自由使用，每一个 store 都是独立的
> - 无需手动添加 store，store 一旦创建便会自动添加；
> - 支持 Vue3 和 Vue2

让我们来看看他跟VueX的区别

| pinia                   | VueX     |
| :---------------------- | :------- |
| State                   | State    |
| Getters                 | Getters  |
|                         | Mutaions |
| Actions  同步异步都支持 | Actions  |

[pinia官方文档][https://pinia.vuejs.org/] or [pinia在GitHub地址][https://github.com/vuejs/pinia]

1. 安装

```js
yarn add pinia
//你自己选一个就行了，看你用哪个包管理器
npm install pinia//小满在这里有加一个-S，这是生产模式，还有一个是-D是开发模式
//生产模式(依赖-S)：会把包添加到 package.json 的 dependencies 下，这些包在项目打包上线后依然需要使用项目才能正常运行
//开发模式(依赖-D)：会把包添加到 package.json 的 devDependencies 下，这些包只在做项目的时候会使用到，在项目打包上线后不依赖于这些包项目依然可以正常运行
```

2. 引入注册 Vue3

> 在main.ts或者js中引入，这得看你用的是js还是ts了哈哈
>
> 因为main.ts是用来放公共API的地方，所以在这里引入~

```js
import { createApp } from 'vue'
import App from './App.vue'
import {createPinia} from 'pinia'//引入
//Vue3叫createPinia
//Vue2叫PiniaVuePlugin
 
const store = createPinia()//调用一下
let app = createApp(App)
 
app.use(store)//使用pinia
 
app.mount('#app')
```

## 初始化仓库 Store

```js
import { defineStore } from 'pinia'
import { Names } from './store-namespce'
 
export const useTestStore = defineStore(Names.Test, {
     state:()=>{
         return {
             current:1
         }
     },
     //类似于computed 可以帮我们去修饰我们的值
     getters:{
 
     },
     //类似methods 可以操作异步 和 同步 提交state
     actions:{
 
     }
})
```

```
//例子
import {useTestStore} from "./store"
//然后进行调用一下
const Test = useTestStore()
```



## state

> 拥有5种方式来进行修改值

### 1.State 是允许直接修改值的(*)

```ts
<template>
     <div>
         <button @click="Add">+</button>
          <div>
             {{Test.current}}
          </div>
     </div>
</template>
<script setup lang='ts'>
import {useTestStore} from './store'
const Test = useTestStore()
const Add = () => {
    Test.current++ //就直接修改就完事了，在VueX中是不被允许的
}
</script>
```

### 2. 批量修改 State 的值

> 在他的实例上有 $patch 方法可以批量修改多个值

```ts
<template>
     <div>
         <button @click="Add">+</button>
          <div>
             {{Test.current}}
          </div>
          <div>
            {{Test.age}}
          </div>
     </div>
</template>
<script setup lang='ts'>
import {useTestStore} from './store'
const Test = useTestStore()
const Add = () => {
    Test.$patch({
       current:200,
       age:300
    })
}
</script>
```

### 3. 批量修改函数形式(*)

> 推荐使用函数形式 可以自定义修改逻辑
>
> 可以在里面进行if判断，for循环啥的都可以，明显灵活很多

```ts
<template>
     <div>
         <button @click="Add">+</button>
          <div>{{Test.current}}</div>
          <div>{{Test.age}}</div>
     </div>
</template>
<script setup lang='ts'>
import {useTestStore} from './store'
const Test = useTestStore()
const Add = () => {
    Test.$patch((state)=>{//这里的state就是我们在store仓库中的state(然后里面return了数值)
       state.current++;
       state.age = 40
    })
}
</script>
```

### 4. 通过原始对象修改整个实例

> `$state` 您可以通过将 store 的属性设置为新对象来替换 store 的整个状态
>
> 缺点就是必须修改整个对象的所有属性

```ts
<template>
     <div>
         <button @click="Add">+</button>
          <div>
             {{Test.current}}
          </div>
          <div>
            {{Test.age}}
          </div>
     </div>
</template>
<script setup lang='ts'>
import {useTestStore} from './store'
const Test = useTestStore()
const Add = () => {
    Test.$state = {
       current:10,//全部都得修改，不然会报错，你也可以修改成一样的数值或者内容，但是不能不写
       age:30
    }    
}
</script>
```

### 5. 通过 actions 修改(*)

> 定义 Actions
>
> 在 actions 中直接使用 this 就可以指到 state 里面的值

```js
import { defineStore } from 'pinia'
import { Names } from './store-naspace'
export const useTestStore = defineStore(Names.TEST, {
  state:()=>{
      return {
         current:1,
         age:30
      }
  },
  actions:{
      setCurrent () {//不能使用箭头函数，因为this的指向会出现问题
          this.current++
          //this是由定义好的store实例调用，箭头函数只会保存当前作用域的this，所以需要传统方式定义函数，根据调用者来改变this指向
      }
  }
})
```

### 使用方法直接在实例调用

```ts
<template>
     <div>
         <button @click="Add">+</button>
          <div>
             {{Test.current}}
          </div>
          <div>
            {{Test.age}}
          </div>
     </div>
</template>
 
<script setup lang='ts'>
import {useTestStore} from './store'
const Test = useTestStore()
const Add = () => {
     Test.setCurrent()
}
 
</script>

```

## 结构store

### 差异对比

> 修改 Test current 解构完之后的数据不会变
>
> 而源数据是会变的
>
> 在pinia是不允许直接解构，是会失去响应式的

```js
const Test = useTestStore()
 //pinia解构不具有响应式
const { current, name } = Test//这是解构
console.log(current, name);
```

### 解决方案可以使用 storeToRefs

```js
import { storeToRefs } from 'pinia'
const Test = useTestStore()
const { current, name } = storeToRefs(Test)//在解构之前先包一层
```

> 循环 store 通过 isRef isReactive 判断 如果是响应式对象直接拷贝一份给 refs 对象 将其原始对象包裹 toRef 使其变为响应式对象 

## Actions（支持同步异步）

#### 1.同步

> 同步 直接调用即可

```ts
//商店store下的index.ts文件
import { defineStore } from 'pinia'
import { Names } from './store-naspace'
export const useTestStore = defineStore(Names.TEST, {
    state: () => ({
        counter: 0,
    }),
    actions: {
        increment() {
            this.counter++
        },
        randomizeCounter() {
            this.counter = Math.round(100 * Math.random())//同步写法，直接使用即可
        },
    },
})
```

#### 2.异步

> 异步 可以结合 async await 修饰
>
> Promise 的构造函数接收一个参数，是函数，并且传入两个参数：`resolve`，`reject`，分别表示异步操作执行成功后的回调函数和异步操作执行失败后的回调函数。

```ts
import { defineStore } from 'pinia'
import { Names } from './store-naspace'
type Result = {
    name: string
    isChu: boolean
}
const Login = (): Promise<Result> => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({
                name: '小满',
                isChu: true
            })
        }, 3000)
    })
}
export const useTestStore = defineStore(Names.TEST, {
    state: () => ({
        user: <Result>{},//定义泛型
        name: "123"
    }),
    actions: {
        async getLoginInfo() {//异步操作
            const result = await Login()//调用了上面的Login异步操作
            this.user = result;
            this.user = setName("大飞机")//
        },
        setName(name:string){
            this.name = name;
        }
    },
})
```

## getters

> 在使用 this 访问时，需要定义返回类型（在 TypeScript 中），这是因为 TypeScript 中的一个已知限制 这不会影响使用箭头函数定义的 getter，也不会影响不使用 this 的 getter

#### 普通函数

> 1. 普通函数形式可以使用 this
>
> 2. getter 只会依赖状态，可能会使用到其他 getter，因此可以在定义常规函数时通过 this 访问到整个 store 的实例

```ts
    getters:{
       newCurrent ():number {
           return ++this.current
       }
    },
```

#### getters 互相调用

>与计算属性一样，可以组合多个 getter。通过 this 访问任何其他 getter

```ts
    getters:{
       newCurrent ():number | string {
           return ++this.current + this.newName
       },
       newName ():string {
           return `$-${this.name}`
       }
    },
```

## API

### 1.$reset

> 重置store到他的初始状态
>
> 调用 $reset ();
>
> 将会把 state 所有值 重置回 原始状态

```ts
const reset = ()=>{
    Test.$reset()
}//直接进行初始化，调用reset即可
```

### 2. 监听state 的改变(?watch)

> 类似于 Vuex 的 abscribe 只要有 state 的变化就会走这个函数

```ts
Test.$subscribe((args,state)=>{//subscribe是订阅的意思
   console.log(args,state);//返回两个值如下
})
```

## pinia插件（有点复杂，以后学）

> pinia 和 vuex 都有一个通病 页面刷新状态会丢失
>
> 我们可以写一个 pinia 插件缓存他的值

```ts
const __piniaKey = '__PINIAKEY__'
//定义兜底变量
type Options = {
   key?:string
}
//定义入参类型
//将数据存在本地
const setStorage = (key: string, value: any): void => {//设置的存储函数
localStorage.setItem(key, JSON.stringify(value))
}
//存缓存中读取
const getStorage = (key: string) => {
return (localStorage.getItem(key) ? JSON.parse(localStorage.getItem(key) as string) : {})}//判断有没有key，没有就返回空对象
 
//利用函数柯丽华接受用户入参
const piniaPlugin = (options: Options) => {
 
//将函数返回给pinia  让pinia  调用 注入 context
return (context: PiniaPluginContext) => {
 
const { store } = context;
 
const data = getStorage(`${options?.key ?? __piniaKey}-${store.$id}`)//将数据取出来
 
store.$subscribe(() => {
 
setStorage(`${options?.key ?? __piniaKey}-${store.$id}`, toRaw(store.$state));//
 
})
 
//返回值覆盖pinia 原始值
return {
 
...data
 
}
 
}
 
}
 
//初始化pinia
const pinia = createPinia()
//注册pinia 插件
pinia.use(piniaPlugin({
key: "pinia"
}))
```

![image-20230624095802339](https://img.ycitcl.top/image-20230624095802339.png)
