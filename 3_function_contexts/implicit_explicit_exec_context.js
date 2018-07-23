// Practice Problems: Implicit and Explicit Function Execution Contexts

// 1. What will the code below output?

function func() {
  return this;
}

var context = func();

console.log(context);

// Window {postMessage: ƒ, blur: ƒ, focus: ƒ, close: ƒ, frames: Window, …}

// For a function declared in the global scope, `this` references the global object, i.e. window.


// 2. What will the code below output? Explain the difference, if any, between this output and that of problem 1.

var o = {
  func: function() {
    return this;
  },
};

var context = o.func();

console.log(context);

// {func: ƒ}

// Here the execution context is the object `o`, which is referenced by `this` within the method defined in `o`.


// 3. What will the code below output?

var message = 'Hello from the global scope!';

function deliverMessage() {
  console.log(this.message);
}

deliverMessage(); // 'Hello from the global scope!'

var foo = {
  message: 'Hello from the function scope!',
};

foo.deliverMessage = deliverMessage;

foo.deliverMessage(); // 'Hello from the function scope!'

// During the first function execution in line 43, `this` references the global object, with the gloabl variable `message` being logged.

// In the second execution, `this` within `foo.delivermessage()` method references the object `foo`, hence `foo.message` property is logged.


// 4. What will the code below output?

var a = 10;
var b = 10;
var c = {
  a: -10,
  b: -10,
};

function add() {
  return this.a + b;
}

c.add = add;

console.log(add()); // 20
console.log(c.add()); // 0

// in the global function execution, `this.a` has a value of 10. Within the object `c`, `this.a` references -10. In both cases `b` references 10.


// 5. The problems above all feature implicit function execution context. What methods have we learned so far that allow us to explicitly specify what a function's execution context should be?

// `Function` methods `call` and `apply` allow us to change the execution context explicitly.


// 6. In the code below, use call to invoke add as a method on bar but with foo as execution context. What will this return?

var foo = {
  a: 1,
  b: 2,
};

var bar = {
  a: 'abc',
  b: 'def',
  add: function() {
    return this.a + this.b;
  },
};

// `call`ing `bar.add` on `foo`:

bar.add.call(foo); // 3


// 7. Given the code and desired output below, would it make more sense to use call or apply to supply explicit context and arguments to outputList? Implement a solution using one of the methods, such that the desired output is logged, and explain your choice.

var fruitsObj = {
  list: ['Apple', 'Banana', 'Grapefruit', 'Pineapple', 'Orange'],
  title: 'A Collection of Fruit',
};


function outputList() {
  console.log(this.title + ':');

  var args = [].slice.call(arguments);

  args.forEach(function(elem) {
    console.log(elem);
  });
}

// invoke outputList here

outputList.apply(fruitsObj, fruitsObj.list);

// Desired output:
//
// A Collection of Fruit:
// Apple
// Banana
// Grapefruit
// Pineapple
// Orange

// We use `apply` method here as `outputList` expects individual arguments to be passed in to it. `apply` takes the input array and passes the elements to the function as arguments.

// If we wanted to use call, we would have to use the spread operator `...` on the input array.

outputList.call(fruitsObj, ...fruitsObj.list);
// A Collection of Fruit:
// Apple
// Banana
// Grapefruit
// Pineapple
// Orange


// 8. For an extra challenge, consider this line of code from the previous problem:

var args = [].slice.call(arguments);

// Inside of JavaScript functions, arguments is an object that holds all of the arguments passed to the function. Bearing in mind that the function author wants to iterate over the arguments later in the method using an Array method, why do you think he or she is invoking call?

// `arguments` is an array-like object and not an array, so we could not use `forEach` method directly on `arguments`. Here `args` is an array with the same elements as `arguments`, created by calling `slice` on `arguments` using `call`.
