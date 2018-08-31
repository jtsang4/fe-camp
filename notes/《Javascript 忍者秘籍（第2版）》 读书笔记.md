# 《Javascript 忍者秘籍（第2版）》 读书笔记

这本书的第二版找不到中文版，因此下了一本英文版的来啃，可能会有翻译或者理解的偏差。

## Table of contents

* [第一章 随处可见的 Javascript](#section1)
* [第二章 运行中的页面](#section2)
* [第三张 一等的函数](#section3)
* [第四章 理解函数调用](#section4)
* [第五章 闭包和作用域](#section5)
* [第六章 Generator 和 Promise](#section6)

<h2 id="section1">第一章 随处可见的 Javascript</h2>

### 理解 Javascript

> Javascript 是怎么演进的

由 ECMAScript 委员会负责这门语言的标准化工作，他们已经完成了 Javascript 的 ES7/ES2016 版。ES7 相对于 ES6 来说，是一个相对较小的升级。他们的目标也正是逐年小规模地更新这门语言。

在这本书中，会完整探索一遍 ES6 的特性，也会关注到 ES7 的特性，例如 `async` 函数，可以让我们更好地编写异步代码。

只有标准的制定还不够，JS 的执行依赖于 JS 引擎，可惜的是尽管浏览器引擎的开发工程师们已经持续地在保持更新了，你还是会发现不少想用的特性并没有在浏览器中实现。

> 利用 transpiler 进行转换

在浏览器还没有实现我们想要用的特性时，我们可以用类似 [traceur](https://github.com/google/traceur-compiler) 或 [babel](https://babeljs.io/)) 的 transpiler（transforming + compiling）来将用新特性书写的代码转换成可以在浏览器上运行的代码。

### 理解浏览器

今天，Javascript 已经可以在许多环境中运行了。但是作为起源的、作为灵感来源的、我们关注的主要环境还是 - 浏览器。

![621624cac5767a74374b1e1f3f42b496.png]()

我们会关注于如下内容:

* DOM（The Document Object Module） - DOM 是 UI 的结构化描述，一个 web 应用的基础。要写出好的应用，除了要深入理解 JS core 以外，还需要知道 DOM 是怎么创造的，怎样去高效地操作 DOM。
* 事件 - 大量的应用都是事件驱动的，这意味着我们的代码执行通常由事件所触发。事件有多种多样，例如网络请求，定时器，还有 UI 交互比如点击、鼠标滑动等。我们会深入地探索事件的机制，并额外注意一个常被忽视的神秘东西 *定时器*。
* 浏览器 API - 为了帮我们与更多东西联结起来，浏览器为我们提供了一些 API，例如获取设备信息，本地存储或者是和远程服务器进行通信等，我们会在这本书里过一遍这些东西。

### 采用最佳实践

除了深入了解 JS、编写跨浏览器的代码以外，还有一些能力也是高手不可或缺的，它们由前人探索总结而出，用于提升代码的质量，被认为是最佳的实践，它们包括如下要素:

* 调试技巧（debugging skill）
* 测试（tesing）
* 性能分析（Performance analysis）

> 调试技巧

最早地时候，调试 JS 纯靠 `alert`，把值打出来看看对不对。幸运的是，现在随着调试工具的快速发展，我们有了许多更加方便更加强大的调试工具，例如 Firebug，Chrome DevTools 等，这些调试工具大部分基于相同的做法，这些最早是在 Firebug 中出现的，例如查看DOM，调试 JS，编写CSS，查看网络请求和事件等。

> 测试

在这本书中，我们使用测试来确保所写出的代码如预期一样工作。（其实这里有更深的话题，比如TDD，敏捷开发等）在我们测试时，所使用到的主要函数是 `assert`，这是一个断言函数，判断给定的条件是否为真。一般的形式如下:

`assert(condition, message)`

例如 `assert(a === 1, 'Disaster! a is not 1!')`，当 `a` 不为 1 时，错误信息就会显示出来。

> 性能分析

尽管现在的浏览器引擎在性能上已经取得了惊人的提升，但这不意味着我们就可以写一些草率的、低效的代码。因此我们需要做一些事情来做性能分析。看下面这段代码:

```Javascript
console.time('timer1')

for (let i = 0; i < maxCount; i++) {
  // 一些操作
}

console.timeEnd('timer1')
```

这里我们用了 `console` 这个浏览器内建的对象。在代码执行到最后一行时，`console.timeEnd` 会输出从开始计时到计时结束所使用的时间。这段时间就反映了中间 for 循环中的代码的性能。

<h2 id="section2">第二章 运行中的页面</h2>

以下是一个从用户输入 URL 开始的完整的网页应用生命周期总览:

![1b353007f29e5b2646f3a8428c0e4290.png]()

> 事件处理

主要存在一下几种事件:

* 浏览器事件（如 onload）
* 网络事件
* 用户交互事件
* 定时器事件

<h2 id="section3">第三章 一等的函数</h2>

在 Javascript 中，对象有这些特性:

* 可以用字面量 `{}` 创建
* 可以被赋值给变量、数组和其它对象的属性
* 可以作为函数参数
* 可以作为函数返回值
* 可以增加属性

在 Javascript 中函数也具有这些特性，因此，把函数当做"**一等公民**"。

> 函数定义

* 函数声明
* 函数表达式
* 箭头函数
* `new Function('a', 'b', 'a+b')`
* Generator 函数

> Parameter 和 Argument

以前一直把这两个混着用，这里正式定义一下这两个名称:

* **Parameter**: 函数定义中被列到参数列表中的那些变量
* **Argument**: 调用函数时，传递给函数的参数

<h2 id="section4">第四章 理解函数调用</h2>

普通函数(非箭头函数)调用的执行上下文中，存在两个隐式变量: `this` 和 `arguments`。

`this` 具有函数的环境信息(function context)，`arguments` 具有函数执行时实际传递的参数信息。

> `arguments` 是函数 parameters 的别名

比如一个函数的参数列表是: `(a, b)`，那么给 `arguments[0], arguments[1]` 分别赋值，也会改变 `a` 和 `b` 的值，同理改变 `a` 或 `b` 也会更改 `arguments` 的值。

但在严格模式(strict mode)下，`arguments` 被限制了一些特性:

1. 不允许对 `arguments` 赋值
2. `argumebts[i]` 不再追踪参数变化，即别名的特性丧失
3. 禁止使用 `arguments.callee`

> 函数的调用方式

函数有四种调用模式: **函数调用模式、方法调用模式、构造器调用模式和 apply/call 调用模式**。

在这四种调用模式中，`this` 分别指向 `window/global`，所属对象，构造出来的对象，指定的 this。

> call 和 apply

如果我们有一串相互之间无关的变量参数，那么这时候用 `call` 比较好；如果我们已经有了一个数组或者这些量作为集合很方便，那么用 `apply`。

> 箭头函数

箭头函数没有自己的 `this` 和 `arguments`，直接使用外部作用域的。

例如这种情况:

```Javascript
var a = 123
const obj = {
  a: 456,
  meth: () => {
    return this.a
  }
}

obj.meth() // 123
```

<h2 id="section5">第五章 闭包和作用域</h2>

> 闭包

我理解的闭包就是访问其它作用域的行为

> 私有变量

一些面向对象的编程语言支持私有变量，当我们为一个对象提供方法时，外部只需要使用提供的方法，不必要接触实现这些方法的细节，这时候私有变量就派上了用处。不幸的是 Javascript 中没有这种特性，但通过闭包，我们可以实现类似私有变量的功能:

```Javascript
function Ninja() {
  var feints = 0 // 类似私有变量
  this.getFeints = function(){
    return feints
  }
  this.feint = function(){
    feints++
  }
}

var ninja1 = new Ninja()
ninja1.feint()
```

此时 `feints` 变量作为闭包访问的值，可以在对象内部保存对象的状态，从而实现了类似私有变量的功能。

> 结合回调函数自我维持状态

闭包可用于为回调函数维持状态，每次函数运行时，都利用闭包维持一个独立的状态:

```Javascript
function animate(id) {
  const elem = document.getElementById(id)
  let tick = 0;
  const timer = setInterval(function(){
    if (tick < 100) {
      elem.style.left = elem.style.top = tick + "px"
      tick++
    } else {
      clearInterval(timer)
    }
  }, 10)
}
```

每当需要为一个元素执行 animate 时，只用传递 id 即可，如果不利用闭包这么做，那么 elem, tick, timer 都需要放到全局空间中，当需要为多个元素执行 animate 时，这种方案就会变得行不通了。闭包在这里就可以结合匿名回调函数，在每次执行 animate 时，单独维持一个状态。

> 追踪函数的执行上下文

执行上下文分为两种：全局执行上下文(global execution context)和函数执行上下文(function execution context)。

函数调用的时候，会形成一个"执行上下文栈"(execution context stack)，也经常被叫作调用栈(call stack)。在栈底的是全局执行上下文，当有函数执行的时候，就会形成新的函数执行上下文，上一个执行上下文就会暂停，直到新的函数执行完毕，再恢复上一个暂停的执行上下文。

<h2 id="section6">第六章 Generator 和 Promise</h2>

> Generator

我自己的感觉 *Generator* 相比于传统的函数的区别在于，generator 为外层代码提供了与函数内部交流的能力，可以读取函数的内部，可以在外部传递值控制 generator 的执行，比如原本需要用回调函数配合函数内部的值来做的事情，因为有了 generator，函数内部的值都可以一起提供给外部了(传统函数只能提供一个值)，就可以直接在外部使用值而不用回调函数。

举个例子：假设我们需要遍历 DOM 树并对每个节点进行某种操作，在使用 generator 之前，可能的做法是提供一个函数从指定的 DOM 节点开始进行遍历，并传递一个回调函数进去，在每个 DOM 节点上执行操作，类似这样 `function traverseDOM(root, callback)`，但有了 generator 后，可以这样 `function* traverseDOM(root)`，利用 generator 得到所有节点后，进行 `for..of`，然后对每个节点单独进行操作。从语义和书写上来说，这样的代码都是更好读好懂的。

> Promise

Promise.race() API 中，第一个完成(fulfill 或者 reject)的 promise 决定这次的状态。