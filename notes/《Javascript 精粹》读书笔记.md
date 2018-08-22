# 《Javascript: The Good Parts》读书笔记

本文是我看《Javascript 精粹》的读书笔记，但不是对文章的直接摘抄，我会把一些自己认为的重要部分进行记录或概括总结，有的地方会对书中的内容做一些改变，主要目的是方便自己的记忆和日后的回忆。

目录

* [第一章 精华](#section1)
* [第二章 语法](#section2)
* [第三章 对象](#section3)
* [第四章 函数](#section4)
* [第五章 继承](#section5)
* [第六章 数组](#section6)
* [第七章 正则表达式](#section7)
* [第八章 方法](#section8)
* [第九章 代码风格](#section9)
* [第十章 优美的特性](#section10)

<h2 id="section1">第一章 精华</h2>

> 为什么要用 Javascript？

在浏览器上的话没得选，只能用 Javascript，虽然现在有了 web assembly，但是 Wasm 相关的 Web API 还不够完善，对应浏览器上的生态也远远不够，所以目前浏览器上还是 Javascript 的天下，基于这个原因，我们就有了使用 Javascript 的根本动力。

> 分析 Javascript

* Javascript 的继承不同于类继承，它采用原型继承
* Javascript 是一个**弱类型的动态语言**。*弱类型*就是偏向于容忍隐式的类型转换，比如 int 可以转换为 double，而*动态类型*是指编译的时候无法得知数据的类型，只有在代码执行的时候才能得知数据的类型，因此类型错误只有运行时才会暴露，不像静态类型的语言，类型错误在编译时就发生了。

<h2 id="section2">第二章 语法</h2>

> 数值

* Javascript 只有一个单一的数值类型。它在内部被表示为64位的浮点数。
* `1e2` 表示 1 * 10^2，即100
* 值 `Infinity` 表示 1.79769313486231570e+308 的值

> 字符串

* 在 Javascript 被创建的时候，Unicode 采用16位字符集，因此所有的 Javascript 字符都是16位的
* 字符的 Unicode 表示法: `'A' === '\u0041'`

> 语句

被当做 false 的值有: `undefined`, `null`, `false`, `''`, `0`, `NaN`。JS 中的五个简单数据类型都被包括了，其中数值型的 0 和 NaN 都算了进来

> 运算符的优先级

|运算符|说明|
|-|-|
|. [] ()|属性存取及函数调用|
|delete new typeof + - !|一元运算符|
|* / % | 乘、除、取模|
|+ -|加/连接字符串、减|
|>= <= > <|不等式运算|
|=== !==|等式运算|
|&&|逻辑与|
|\|\||逻辑或|
|?:|三元运算符|

自用一句话口诀: **存取调用一，算关逻位赋**

<h2 id="section3">第三章 字面量</h2>

Javascript 中的简单数据类型有: *undefined, null, 字符串，布尔值，数值型，在 ES6 中还有一个 `Symbol`*。它们也有方法可以调用，那为什么说它们是简单数据类型呢？**原因是这几个类型的值都是不可变的，生成出来以后无法 mutate**。可以尝试一下如下代码:

```Javascript
const foo = 2
foo.k = 'test'

console.log(foo.k) // undefined
```

> 引用

对象通过引用来传递，它们永远不会被拷贝(即没有直接拷贝一份值得方法)

> 原型

每一个对象都有一个 `__proto__` 属性，指向其构造器函数的 `prototype`，同时因为构造器函数的原型也是对象，所以构造器的 `prototype` 的 `__proto__` 指向 `Object` 的 `prototype`，而 `Object.prototype` 的 `__proto__` 比较特殊，指向 `null`。

这段话有点绕，用代码来解释更加直观，假设有一个对象 `foo` 由构造函数 `Foo` 构建:

```Javascript
foo.__proto__ === Foo.prototype // true
Foo.prototype.__proto__ === Object.prototype // true
Object.prototype.__proto__ === null // true
```

<h2 id="section4">第四章 函数</h2>

函数在 Javascript 中是一等公民，它可以存在变量、对象、数组中，可以被作为参数传递，可以作为其它函数的返回值。

每个函数在被创建时有两个附加属性，函数的上下文和实现函数行为的代码。

> 调用

**在 Javascript 中函数一个有四种调用模式: 函数调用模式、构造器调用模式、apply 调用模式、方法调用模式**。这些调用方式在初始化函数执行上下文中的 `this` 时有所差异。

> 递归

递归函数会直接或者间接地调用自身。递归是一种强大的编程技术，它将一个问题分解为一组相似的子问题，每一个都用一个寻常解<sub>[1](#notation1)</sub>去解决。一般来说，一个递归函数调用自身去解决它的子问题。

汉诺塔问题，假设总数为 disc，初始盘子为 src，辅助盘子为 aux，目标盘子为 dst:

```Javascript
function hanoi(disc, src, aux, dst) {
  if (disc > 0){
    hanoi(disc - 1, src, dst, aux)
    document.writeln(`Move disc ${disc} from ${src} to ${dst}`)
    hanoi(disc - 1, aux, src, dst)
  }
}
```

这种思路把问题拆分为了三个子问题: 先把 n - 1 个盘子从 src 移到 aux 辅助盘子，之后把最底下的盘子移到 dst，最后把 n - 1 个盘子移到 dst。通过这种递归，事情变得简单了许多。

> 闭包

闭包就是取用其它作用域的变量。比如内部函数可以访问外部函数的变量，而不用进行复制。

> 模块

模块是一个提供接口，却隐藏状态与实现的函数或对象。通过模块，几乎可以完全摒弃全局变量的使用，从而减少这个糟糕特性带来的影响。

模块的一般形式是：一个定义了私有变量和函数的函数。利用闭包创建可以访问私有变量和函数的特权函数，之后返回这个特权函数，或者把它保存到一个可访问的地方。

> 级联

如果我们让对象的方法返回 `this`，那么就可以实现链式调用对象的方法。

> 柯里化

```Javascript
const curry = function(fn) {
  const args = [].slice.call(arguments, 1)
  return function() {
    const newArgs = args.concat([].slice.call(arguments))
    fn.apply(this, newArgs)
  }
}
```

> memoization

*在计算机领域，记忆(memoization)是主要用于加速程序计算的一种优化技术，它使得函数避免重复处理之前已被计算过的输入，而返回已缓存的结果。*

对于计算 fibonacci 数列，可以有如下方法:

```Javascript
function fibonacci(n) {
  return n < 2 ? n : fibonacci(n - 1) + fibonacci(n - 2)
}

// 计算第 0, 1, 2 ... 10 个数列的结果
Array(11).fill(1).forEach((item, index) => {
  const i = index
  console.log(`第 ${i} 个数列的结果为: ${fibonacci(i)}`)
})
```

在这个过程中，fibonacci 函数被调用了453次，其中10次使我们自己调用。在这453次中，重复计算了很多次之前计算过的值，如果我们能够让函数记忆住运算过的值，就能显著地减少它的运算量。

我们可以这样做:

```Javascript
const fibonacci = (function() {
  const memo = [0, 1]
  const fib = function(n) {
    const result = memo[n]
    if (typeof result !== 'number') { // 这里有一个陷阱，直接写 !result 的话，n === 0 时会失败导致栈溢出
      const calcResult = fib(n - 1) + fib(n - 2)
      memo[n] = calcResult
      return calcResult
    }
    return result
  }
  return fib
})()
```

再计算上面 0, 1, 2...10 的结果，只用调用 fibonacci 函数 29 次，其中 11 次是我们调用的。这样做极大地减少了运算量。

我个人认为，运算量非常大的时候才需要考虑这样处理，因为它需要占用更多的内存。首先现在 CPU 的运算能力已经足够快了，日常的网页应用，还不需要牺牲内存来提升计算能力，其次这种行为相当于缓存，对于前端来说，大部分都是实时数据和UI状态，而不是固定不变的计算数值，缓存计算数值的意义不是那么大（[reselect](https://github.com/reduxjs/reselect) 倒是有缓存机制，还没仔细看过它的缓存实现和思考它能带来足够的意义）。不过在别的领域，也许内存不是关键，运算速度才是关键，比如复杂图形渲染，游戏领域，可能这种牺牲内存来提升运算速度的方案会更有用武之地。

<h2 id="section5">第五章 继承</h2>

在大多数编程语言中，继承都是一个重要的主题。

对于类继承的语言(如 Java)，继承带来了两个好处，一是可以极大地提升代码的复用，减少工作量的同时把软件抽象得更加简；二是引入了一套类型系统的规范，工程师无需编写显示类型转换的代码，工作量将大量减轻。

Javascript 是一门弱类型语言，它不需要关注类型转换，对象的继承关系变得无关紧要，对一个对象来说，更重要的是它能做什么，而不是它从哪里来。因此，Javascript 采用了一种更具表现力的**原型继承模式**。

在基于类的语言中，对象是类的实例，并且类可以从另一个类继承。而 Javascript 是一门基于原型继承的语言，因此对象直接从其它对象继承。

在正式进入继承之前，可以先记住一句话: **在 Javascript 中，一切非基本类型的值都是对象**，因为除了基本类型，其它值都是可以 mutate 的。

> 伪类

1. 创建一个新的构造函数时

像上面说的，函数也是一个对象，当创建一个新的构造函数时，本质上是用 Function 构造器创建了一个新的函数对象，此时 Function 构造器会为我们做一件类似这样的事

```Javascript
this.prototype = { constructor: this }
```

为新的函数对象添加一个 prototype 属性，它的值是一个包含 constructor 的对象。有了这个 prototype 属性，原型继承的道路就被打通了。

2. 使用 `new` 操作符时

假设对一个构造函数 `Foo` 进行 `new` 操作，相当于执行了这样的一个 `simulateNew` 函数:

```Javascript
function simulateNew(Foo, ...args) {
  // 创建一个以 Foo.prototype 为原型的新对象
  const that = Object.create(Foo.prototype)
  
  // 调用构造器，初始化对象的值
  const other = Foo.apply(that, args)
  
  // 如果构造的返回值不是一个对象，就返回新创建的那个对象
  return (typeof other === 'object' && other) || that
}
```

3. 扩充一个函数构造器的原型

```Javascript
const Mammal = function(name) {
  this.name = name
}

Mammal.prototype.get_name = function() {
  return this.name
}

Mammal.prototype.says = function() {
  return this.saying || ''
}
```

4. 构造一个伪类来继承另一个类

```Javascript
const Cat = function(name) {
  this.name = name
  this.saying = 'meow'
}

// 替换 Cat.prototype 为一个 Mammal 的实例
Cat.prototype = new Mammal()

// 扩充新原型对象，添加 purr, get_name 方法
Cat.prototype.purr = function(n) {
  return Array(n).fill('r').join('-')
}
Cat.prototype.get_name = function() {
  return `${this.name} says: My name is ${this.says()} ${this.name}`
}

const myCat = new Cat('Cinderella')
myCat.says() // 'meow'
myCat.purr(5) // 'r-r-r-r-r'
myCat.get_name() // 'Cinderella says: My name is meow Cinderella'
```

现在我们有了这些行为像"类"的构造器函数，但是还存在一些问题，比如没有私有环境，所有属性都是公开的。并且无法访问到父类(super)里面被覆盖了的方法。

还有一个更大的风险是，如果在调用构造函数时，忘记了使用 `new` 关键字，原型的方法中的 this 会指向全局变量，从而污染全局变量。更恼人的是，这种问题不会有编译警告，也不会有执行错误。为了避免这个问题，我们还约定构造函数的首字符必须大写，其它函数都不这么做，这样从书写上就能看出来是否不正确地使用了构造函数。

在基于类的语言中，类继承是代码重用的唯一方式，但在 Javascript 中，还有更多更好的选择。

> 差异化继承

差异化继承，就是把上面步骤中 `new Mammal()` 步骤得到的对象，换成一个已经定义好了的对象作为新的类的原型，而不是需要的时候才 `new Mammal()` 出来。之后根据子类和原型对象的差异，去配置差异的部分。

> 函数化

函数化继承就是利用函数创造对象，利用函数 mutate 对象，而不是利用构造器来生成对象。它可以为我们带来更多的灵活性，也不需要使用 `new`，此外很重要地，它还给我们提供了实现私有变量和函数的能力。

函数化地实现"继承"的步骤:

1. 创建一个新对象
2. 定义私有变量和方法
3. 扩充此新对象，为其添加属性和方法
4. 返回此新对象

伪代码说明:

```Javascript
const constructor = function(spec, my) {
  let 其它的私有变量
  my = my || {}
  
  把共享的函数和变量添加到 my 中
  
  const that = 一个新对象
  
  为 that 添加属性和方法
  
  return that
}
```

spec 对象包含了需要创建 that 对象的所有信息，my 用于在"继承连"中按需要共享信息。

示例:

```Javascript
// 利用上述思路，先得到一个"父类" mamal
const mammal = function(spec) {
  const that = {}
  
  that.get_name = function() {
    return spec.name
  }
  
  that.says = function() {
    return spec.saying || ''
  }
  
  return that
}

// 根据"父类" mammal，创建一个"子类" cat
const cat = function(spec) {
  spec.saying = spec.saying || 'meow'
  
  const that = mammal(spec)
  that.purr = function(n) {
    return Array(n).fill('r').join('-')
  }
  that.get_name = function() {
    return `${spec.name} says: My name is ${that.says()} ${spec.name}`
  }
  
  return that
}
```

这里我看完觉得书中说的算作继承有点牵强，但不失为一种可复用地创建对象的好方法。这里做的是先通过"父类"生成对象，然后在"子类"函数中去 mutate 此对象，最后返回此对象。其次，通过闭包来实现私有的变量和函数。

注释说明
---

<dl>
  <dt id="notation1">注释 1</dt>
  <dd>原文中使用了 "trivial solution"，该词组为数学中的术语，可翻译为寻常解或者明显解。作者用在此处意在说明递归用一般的方式去解决每一个子问题。具体可参考 https://zh.wikipedia.org/wiki/格林函数</dd>
</dl>