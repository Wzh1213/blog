---
author: 小满zs
description: 来源于小满zs
title: Vue3+TS
readingTime: true
tag:
 - vue3
recommend: 1
---

# VUE 3 + TS(小满zs)

## 用vite创建vue

[vite官网](https://cn.vitejs.dev/)

```
##创建工程
npm init vite@latest
```

**package json 命令解析**

```json
{
  "scripts": {
    "dev": "vite", // 启动开发服务器，别名：`vite dev`，`vite serve`// [!code focus]
    "build": "vite build", // 为生产环境构建产物// [!code focus]
    "preview": "vite preview" // 本地预览生产构建产物// [!code focus]
  }
}
```

## Vite 目录

| public         | 静态文件夹，通常用来存放一些无需编译的东西，比如图片啥的 |
| -------------- | -------------------------------------------------------- |
| src.assets     | 可编译，用来放图片的                                     |
| src.components | 组件存放的地方                                           |
| src.App.vue    | 全局组件                                                 |
| src.main.js    | 用来放公共API的                                          |
| src.index.html | 入口文件                                                 |
| package.json   | 配置一些命令还有依赖包的地方                             |
| tsconfig.json  | 配置文件的，比如严格模式、语法之类的                     |
| vite.config.ts | vite的配置文件                                           |

**index.html 非常重要的入口文件 （webpack，rollup 他们的入口文件都是 enrty input 是一个 js 文件 而 Vite 的入口文件是一个 html 文件，他刚开始不会编译这些 js 文件 只有当你用到的时候 如 script src="xxxxx.js" 会发起一个请求被 vite 拦截这时候才会解析 js 文件）**

vite config ts 这是 vite 的配置文件具体配置项

## 模板语法 && Vue指令

| data()方法  | 返回组件所需要的数据                                         |
| ----------- | ------------------------------------------------------------ |
| methods属性 | 定义组件所需要的方法函数                                     |
| v-if        | Vue提供的条件渲染功能，指定变量为true则渲染这个元素，否则不渲染 |
| v-model     | 双向绑定，输入框中的文字变化时，会将其变化同步到绑定的变量上。反之亦然 |
| setup       | 组合式API                                                    |
| { { } }      | 插值语法，将当前组件中定义的变量插入指定位置，且默认实现绑定效果 |
| v-once      | 这个指令设置的组件在进行变量插值的时候只会插值一次           |
| v-html      | 指定一个Vue变量数据，通过HTML解析的方式将原始HTML替换到指定的位置标签 |
| v-bind      | 与标签属性绑定起来，比如v-bind:id=""，可以直接缩写为:id=" "  |
|             | 对于可以添加参数的指令，参数和指令之间使用冒号分隔           |
| v-on        | 事件绑定指令，v-on可以被@整个替换                            |
| v-else      | 必须紧跟在v-if的后面才能被识别到，if的条件不满足则显示渲染else内的内容 |
| v-show      | 与v-if不一样的是渲染逻辑不一样，v-show指令不管条件是真是假，当前元素都会被渲染。v-if如果是假，则不会渲染 |
| v-for       | 将数组中的数据渲染为列表视图，与index配合的话，index的索引值从0开始。第一个参数为遍历的对象中的属性的值，第二个参数为遍历的对象中的属性的名字，第三个参数为遍历的索引 |

## 组合式API

**`<script setup>`** //自动暴露数据和方法

- 每个 `*.vue` 文件最多只能有一个 `<script setup>` 块 (不包括常规的 `<script>`)
- 该脚本会被预处理并作为组件的 `setup()` 函数使用，也就是说它会在**每个组件实例**中执行。`<script setup>` 的顶层绑定会自动暴露给模板。更多详情请查看 [ 文档](https://v3.cn.vuejs.org/api/sfc-script-setup)。

### ref

接受一个内部值并返回一个响应式且可变的 ref 对象。ref 对象仅有一个 `.value` property，指向该内部值。

```vue
<template>
  <div>{{Man}}</div>
  <div>{{age}}</div>
  <button @click="change()">修改</button>
</template>

<script setup lang="ts">
  import {ref,isRef} from 'vue'
  const Man = ref({name:"小余"})// [!code focus]
  const age = ref(12)// [!code focus]
  const change = () =>{
    Man.value.name = 'yupi'// [!code focus]
    age.value=18// [!code focus]
    console.log(Man)
    console.log(isRef(Man))
  }
</script>
```

### reactive

不同于ref，reactive只能处理对象与数组，但是不需要`.value`,因为使用了Proxy的实例化对象，简称proxy对象

```vue
<template>
  <div>{{person.Man}}</div>// [!code focus]
  <div>{{person.age}}</div>// [!code focus]
  <div>{{person.arr[0]}}</div>// [!code focus]
  <div>{{person.obj.a}}</div>// [!code focus]
  <button @click="change()">修改</button>
</template>
<script setup lang="ts">
  import {ref,isRef} from 'vue'
  let person=reactive({// [!code focus]
  	Man:'小张'，// [!code focus]
  	age：12，// [!code focus]
  	obj：{// [!code focus]
		a：'123'// [!code focus]
	},// [!code focus]
	arr:['1','2']// [!code focus]
  })// [!code focus]
  const change = () =>{
    person.Man = 'yupi'// [!code focus]
    person.age = 18// [!code focus]
  }
</script>
```

### ref与reactive比较

![ref与reactive](https://img.ycitcl.top/image-20230615131306002.png)

### hooks（钩子）

- `computed`: 创建一个计算属性

```js
import { ref, computed } from 'vue';

const count = ref(0);
const doubleCount = computed(() => count.value * 2);// [!code focus]

console.log(doubleCount.value); // 输出：0

count.value = 5;
console.log(doubleCount.value); // 输出：10
```

- `watch`: 监听一个响应式对象的变化

```js
import { ref, watch } from 'vue';

const count = ref(0);

watch(count, (newValue, oldValue) => {// [!code focus]
  console.log(`count的值从\${oldValue}变为\${newValue}`);// [!code focus]
});// [!code focus]

count.value = 5; // 输出：count的值从0变为5
```

- `onMounted`: 在组件被挂载到DOM后执行的钩子函数

- `onUnmounted`: 在组件被从DOM中卸载后执行的钩子函数

### 自定义hooks（钩子）

逻辑复用,分离关注点,提高可测试性,提高组件的可读性,接近函数式编程

推荐[vueUse](https://vueuse.org/guide/)官网（hooks大全）

- 编写

```js
//引用
import {reactive,onMounted,onBeforeUnmount} from 'vue'
//暴露方法
export default function (){
	//定义数据
	let point = reactive({
		x:0,
		y:0
	})
	//定义方法
	function savePoint(e){
		point.x=e.pageX
		point.y=e.pageY
	}
	//钩子函数
	onMounted(()=>{
		window.addEventListen('click',savePoint)// [!code focus]
	})
	onBeforeUnmount(()=>{
		window.removeEventListen('click',savePoint)// [!code focus]
	})
	return point// [!code focus]
}
```

- 使用

```js
import {usePoint} from '../hooks/usePoint'// [!code focus]
let point = usePoint()// [!code focus]
let x = userPoint().x
let y = poin
```

### 生命周期

![image-20230618161058983](https://img.ycitcl.top/image-20230618161058983.png)

```js
console.log('set up');
// 创建
onBeforeMount(() => {
    console.log('onBeforeMount=======>', data.value);
})
onMounted(() => {
    console.log('onMounted=======>', data.value);
})
// 更新hook
onBeforeUpdate(() => {
    console.log('onBeforeUpdate=======>', data.value?.innerHTML);
})
onUpdated(() => {
    console.log('onUpdated=======>', data.value?.innerHTML);
})
// 销毁
onBeforeUnmount(() => {
    console.log('onBeforeUnmount=======>', data.value);
})
onUnmounted(() => {
    console.log('onUnmounted=======>', data.value);
})
```



##  父子组件传参

### 父传子(组件)--vue2

在Vue 3中，父子组件之间可以通过props和事件来实现互相传值。以下是两种常见的方式：

1. 使用props传递数据：父组件通过props属性将数据传递给子组件，子组件通过props接收数据。

父组件：

```vue
<template>
  <div>
    <ChildComponent :message="message" />// [!code focus]
  </div>
</template>

<script>
import ChildComponent from './ChildComponent.vue';

export default {
  data() {
    return {
      message: 'Hello from parent component',
    };
  },
  components: {
    ChildComponent,
  },
};
</script>
```

子组件：

```vue
<template>
  <div>
    <p>{{ message }}</p>
  </div>
</template>

<script>
export default {
  props: {[message]},// [!code focus]
};
</script>
```

### 子传父(组件)--vue2

1. 使用事件进行传值：子组件通过触发事件，向父组件传递数据。父组件监听子组件的事件，获取传递的数据。

父组件：

```vue
<template>
  <div>
    <ChildComponent @message-updated="updateMessage" />// [!code focus]
    <p>{{ message }}</p>
  </div>
</template>

<script>
import ChildComponent from './ChildComponent.vue';

export default {
  data() {
    return {
      message: '',
    };
  },
  methods: {
    updateMessage(newMessage) {
      this.message = newMessage;
    },
  },
  components: {
    ChildComponent,
  },
};
</script>
```

子组件：

```vue
<template>
  <div>
    <button @click="sendMessage">Send Message</button>
  </div>
</template>

<script>
export default {
  methods: {
    sendMessage() {// [!code focus]
      this.\$emit('message-updated', 'Hello from child component');// [!code focus]
    },
  },
};
</script>
```

### defineProps与defineEmits--vue3

- `defineProps` 和 `defineEmits` 都是只能在 `<script setup>` 中使用的**编译器宏**。他们不需要导入，且会随着 `<script setup>` 的处理过程一同被编译掉。
- `defineProps` 接收与 `props` 选项相同的值，`defineEmits` 接收与 `emits` 选项相同的值。
- `defineProps` 和 `defineEmits` 在选项传入后，会提供恰当的类型推导。
- 传入到 `defineProps` 和 `defineEmits` 的选项会从 setup 中提升到模块的作用域。因此，传入的选项不能引用在 setup 作用域中声明的局部变量。这样做会引起编译错误。但是，它*可以*引用导入的绑定，因为它们也在模块作用域内。

父传子

```vue
//父组件传递
<template>
    <About :msg=msg/>
</template>

<script setup lang="ts">
import About from './about.vue'
import { ref } from 'vue'
let msg = ref("Vite Vue")
</script>

//子组件接收
<template>
    <h1>{{ props.msg }}</h1>
</template>
<script setup lang="ts">
import { ref } from 'vue'
let num = ref(123)
// ts方式父传子（标注）
export interface Props {
  msg?: string
}
const props = withDefaults(defineProps<Props>(), {
  msg: 'hhh',
})

// js方式父传子（defineProps）
const props = defineProps({
    msg: {
         type: String,
         default: 'hhh'
    }
})
</script>
```

子传父

```vue
//子组件传递
<template>
    <h1>{{ props.msg }}</h1>
    {{ num }}
    <button @click="send">send</button>
</template>
<script setup lang="ts">
import { ref } from 'vue'
let num = ref(123)

	// js方法子传父（defineEmits）
const emit = defineEmits(["fn"])
const send=()=>{
    emit("fn", num)
}

	// ts方式子传父（标注）
const emit = defineEmits<{
  (e: 'fn', num: number): void
}>()
const send=()=>{
    emit("fn", num.value)
}
</script>

//父组件接收
<template>
    父组件值：{{ num }}  
    <br>
    <About @fn='fuck'/>
</template>

<script setup lang="ts">
import About from './about.vue'
import { ref } from 'vue'
let num = ref(0)
const fuck = (n: number) => {
    num.value=n
}
</script>
```

### v-model实现父子组件之间传参

```vue
//父组件
<template>
    <button @click="show = !show">开关{{ show }}</button>
    <Dialog v-model="show"></Dialog>
</template>
   
<script setup lang='ts'>
import Dialog from "../components/dialog.vue";
import { ref } from 'vue'
const show = ref(false)
</script>

//子组件
<template>
    <div v-if='propData.modelValue ' class="dialog">
        <div class="dialog-header">
            <div>标题</div><div @click="close">x</div>
        </div>
        <div class="dialog-content">
           内容
        </div>
    </div>
</template>

<script setup lang='ts'>

type Props = {
  modelValue:boolean
}
const propData = defineProps<Props>()
const emit = defineEmits(['update:modelValue'])
const close = () => {
    emit('update:modelValue',false)
}
</script>

<style lang='less' scoped>
.dialog{
   width: 300px;
   height: 300px;
   border: 1px solid #ccc;
   position: fixed;
   left:50%;
   top:50%;
   transform: translate(-50%,-50%);
   &-header{
       border-bottom: 1px solid #ccc;
       display: flex;
       justify-content: space-between;
       padding: 10px;
   }
   &-content{
       padding: 10px;
   }
}
</style>
```



## 递归组件

```vue
<!-- 父组件 -->
<template>
    <div @click.stop="clickItem(item,$event)" v-for="(item, index) in data" :key="index" class="tree">
        <input type="checkbox" v-model="item.checked"> <span>{{ item.name }}</span>
        <tree :data="item.children" v-if="item.children?.length"></tree>
    </div>
</template>
    
<script setup lang='ts'>
import tree from '../views/tree.vue';
type TreeList = {
    name: string;
    checked: boolean;
    children?: TreeList[] | [];
};

type Props<T> = {
    data?: T[] | [];
};

defineProps<Props<TreeList>>();
const clickItem = (item: TreeList,e:any) => {
    console.log(item,e)
}
</script>
    
<style lang="less" scoped>
.tree{
    display: flex;
    align-items: center;
}
</style>
<!-- 子组件 -->
<template>
    <div @click.stop="clickItem(item,$event)" v-for="(item, index) in data" :key="index" class="tree">
        <input type="checkbox" v-model="item.checked"> <span>{{ item.name }}</span>
        <tree :data="item.children" v-if="item.children?.length"></tree>
    </div>
</template>
    
<script setup lang='ts'>
import tree from '../views/tree.vue';
type TreeList = {
    name: string;
    checked?: string;
    children?: TreeList[] | [];
};

type Props<T> = {
    data?: T[] | [];
};

defineProps<Props<TreeList>>();
const clickItem = (item: TreeList,e:any) => {
    console.log(item,e)
}
</script>
    
<style lang="less" scoped>
.tree{
    display: flex;
    align-items: center;
}
</style>
```

## 动态组件

```vue
<template>
    <div style="display: flex;">
        <div v-for="(item, index) in data" 
        class="tabs" :class="[active == index ? 'active' : '']"
        @click="switchOne(index,item)">
            {{ item.name }}
        </div>
    </div>
    <div class="content">
        <component :is="componentId"></component>// [!code focus]
    </div>
</template>
    
<script setup lang='ts'>
import { ref, reactive, markRaw } from "vue"
import AVue from '../components/more/A.vue'
import BVue from '../components/more/B.vue'
import CVue from '../components/more/C.vue'
let componentId = ref(markRaw(AVue))
let active = ref(0)

interface Tabs {//定义类型
    name: string,
    com: any
}
const data = reactive<Tabs[]>([
    {
        name: 'A',
        com: markRaw(AVue) 
    },
    {
        name: 'B',
        com: markRaw(BVue) 
    },
    {
        name: 'C',
        com: markRaw(CVue) 
    }
])
const switchOne=(idx:any,item:Tabs)=>{
    active.value=idx
    componentId.value=item.com
}
</script>
    
<style lang="less" scoped>
.tabs {
    border: 1px solid black;
    padding: 1rem;
    margin: auto;
    cursor: pointer;
}

.active {
    background: skyblue;
}
.content{
    border: 1px solid black;
    margin: 0 auto;
    padding: 10px;
}
</style>
```

## 插槽(slot)

- 匿名插槽 <slot></slot>
- 具名插槽 <slot name='footer'></slot>
- 作用域插槽 <template #default='{data}'>
- 动态插槽 <template #[name]>

##  **keep-alive**（缓存功能）

> 有时候我们不希望组件被重新渲染影响使用体验；或者处于性能考虑，避免多次重复渲染降低性能。而是希望组件可以缓存下来，维持当前的状态。这时候就需要用到 `keep-alive` 组件。
>
> keep-alive就是保持活跃的意思，你在里面填入的东西在你切换成其他组件的时候不会被初始化成最初的样子
>
> 开启 keep-alive [生命周期](https://so.csdn.net/so/search?q=生命周期&spm=1001.2101.3001.7020)的变化
>
> - 初次进入时： onMounted> onActivated
> - 退出后触发 `deactivated`
> - 再次进入：
> - 只会触发 onActivated
> - 事件挂载的方法等，只执行一次的放在 onMounted 中；组件每次进去执行的方法放在 onActivated 中

```typescript
<!-- 基本 -->
<keep-alive>
  <component :is="view"></component>
</keep-alive>
 
<!-- 多个条件判断的子组件 -->
<keep-alive>
  <comp-a v-if="a > 1"></comp-a>
  <comp-b v-else></comp-b>
//v-if与else的切换组件，切换后另外一个组件虽然被切换走了，但是通过声明周期我们可以看到不会被销毁
</keep-alive>
 
<!-- 和 `<transition>` 一起使用 -->
<transition>
  <keep-alive>
    <component :is="view"></component>
  </keep-alive>
</transition>
```

**`include` 和 `exclude`**

> include 和 exclude 允许组件有条件地缓存。二者都可以用逗号分隔字符串、正则表达式或一个数组来表示：
>
> 写在`include`里面的组件会被缓存起来，只写keep-alive是默认里面信息全部缓存的
>
> 写在`exclude`里面的组件不会被缓存起来，跟include的属性是完全相反的。如何选择使用可以根据实际情况选择
>
> :`max`属性是决定了我们缓存的最大组件数量，假设我们:max="10"，也就是最多缓存10个组件，可我们keep-alive内部即将缓存的有11个组件，他有内置算法会优先替换掉我们不常用的那一个

```typescript
 <keep-alive :include="keep-alive里的组件" :exclude="" :max=""></keep-alive>

<keep-alive :max="10">
  <component :is="view"></component>
</keep-alive>
```

专属的两个生命组件

> 这个是只有开启keep-alive的时候才会出现的两个生命周期

```typescript
//新的两个
onActivated(()=>{
    console.log('keep-alive的初始化')
})

onDeactivated(()=>{
    console.log('keep-alive的卸载')
})
//对应有关联的两个生命周期
onMounted(()=>{
    console.log('初始化')//这个会随着onActivated一起生效
})
onUnMounted(()=>{
    console.log('卸载')//如果有onDeactivated，则优先生效onDeactivated，onUnMounted则不再生效
})
//所以有一些卸载操作我们可以写在keep-alive独有的生命卸载周期里面
//一些一次性操作则写到onMounted里面，比如一些接口请求一次就行了。onMounted只会在刚开始的时候挂载一次，你组件之前的切换就不会在重新初始化了，但是这个keep-alive的onActivated初始化则会在组件切换的时候不断触发
```

##  依赖注入Provide / Inject

API介绍：父组件用Provide抛出数据，子组件用Inject引用数据

```js
//父组件
import { provide, ref } from 'vue'
import A from '../components/inject.vue'
let flag = ref<number>(1)
provide('flag1', flag)
//子组件
import { inject, Ref, ref } from 'vue'
	//Ref可以设范类，默认值
const flag = inject<Ref<number>>('flag1', ref(123))
const add = () => {
    flag.value ++
}
```

## 兄弟组件传参和Bus

方式1：子传父==>父传子

方式2：BUS(有点难，也不咋用)

方式3：MITT(别人封装方式2的一个库，有空再学)

```typescript
type BusClass<T> = {
    emit: (name: T) => void
    on: (name: T, callback: Function) => void
}
type BusParams = string | number | symbol 
type List = {
    [key: BusParams]: Array<Function>
}
class Bus<T extends BusParams> implements BusClass<T> {
    list: List
    constructor() {
        this.list = {}
    }
    emit(name: T, ...args: Array<any>) {
        let eventName: Array<Function> = this.list[name]
        eventName.forEach(ev => {
            ev.apply(this, args)
        })
    }
    on(name: T, callback: Function) {
        let fn: Array<Function> = this.list[name] || [];
        fn.push(callback)
        this.list[name] = fn
    }
}
 
export default new Bus<number>()
```

## element-plus组件库

```jsx
# 选择一个你喜欢的包管理器

# NPM
$ npm install element-plus --save

# Yarn
$ yarn add element-plus

# pnpm
$ pnpm install element-plus


// main.ts
import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import App from './App.vue'

const app = createApp(App)

app.use(ElementPlus)
app.mount('#app')

// tsconfig.json
{
  "compilerOptions": {
    // ...
    "types": ["element-plus/global"]
  }
}
```

## Scoped和样式穿透

```plain
	vue中的scoped 通过在DOM结构以及css样式上加唯一不重复的标记:data-v-hash的方式，以保证唯一（而这个工作是由过PostCSS转译实现的），达到样式私有化模块化的目的。
Vue 提供了样式穿透:deep() 他的作用就是用来改变 属性选择器的位置
```

## CSS样式

```css
//slot样式
<style scoped>
:slotted(.a) {
	color:red
}
</style>
<template>
	<div class="div">
		小满是个弟弟
	</div>
</template>

//v-bind样式
<script lang="ts" setup>
	import { ref } from 'vue'
	const red = ref<string>('red')
</script>

<style lang="less" scoped>
	.div{
		color:v-bind(red)
	}

</style>

//module样式
<template>
	<div :class="$style.red">
		小满是个弟弟
	</div>
</template>

<style module>
	.red {
		color: red;
		font-size: 20px;
	}
</style>
```

## TailWind CSS 

[官方文档](https://www.tailwindcss.cn/)

[小满zs文档](https://blog.csdn.net/qq1195566313/article/details/124951311)

```plain
1.初始化项目
npm init vue@latest
2.安装 Tailwind 以及其它依赖项
npm install -D tailwindcss@latest postcss@latest autoprefixer@latest
3.生成配置文件
npx tailwindcss init -p
```

## 前端处理跨域问题

```jsx
export default defineConfig({
	plugins: [vue()],
	server:{
		proxy:{
			'/api':{
				target:"http://localhost:9001/", //跨域地址
				changeOrigin:true, //支持跨域
				rewrite:(path) => path.replace(/^\/api/, "")//重写路径,替换/api
			}
		}
	}
})
```

## Tips:解决后端传underfind和null值问题

> 空值合并运算符 `??`
>
> const data = getName ?? '666'



