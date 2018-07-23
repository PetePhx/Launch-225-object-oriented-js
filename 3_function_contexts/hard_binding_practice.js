// Practice Problems: Hard Binding Functions with Contexts

// 1. What function can we use to permanently bind a function to a particular execution context?

// Function.bind


// 2. What will the code below log to console?

var obj = {
  message: 'JavaScript',
};

function foo() {
  console.log(this.message);
}

foo.bind(obj); // returns a new function bound to obj

// nothing is logged, as `foo` is not executed.


// 3. What will the code below output?

var a = 1;
var b = -1;
var obj = {
  a: 2,
  b: 3,
};

function foo() {
  return this.a + this.b;
}

var bar = foo.bind(obj);

console.log(foo()); // 0. Execution context is global
console.log(bar()); // 5. Execution context for `bar` is `obj`


// 4. What will the code below log to the console?

var positiveMentality = {
  message: 'JavaScript makes sense!',
};

var negativeMentality = {
  message: 'JavaScript makes no sense!',
};

function foo() {
  console.log(this.message);
}

var bar = foo.bind(positiveMentality);

negativeMentality.logMessage = bar; // bar is bound to positiveMessage
negativeMentality.logMessage(); // 'JavaScript makes sense!'

// The execution context for bar is fixed to positiveMessage. negativeMentality.logMessage points to the same functino as bar, hence will be executed in the same execution context as bar.


// 5. What will the code below output?

var obj = {
  a: 'Amazebulous!',
};
var otherObj = {
  a: "That's not a real word!",
};

function foo() {
  console.log(this.a);
}

var bar = foo.bind(obj);

bar.call(otherObj); // 'Amazebulous!'

// Since `bar` has a hard binding to `obj`, even when invoking it with `call` and passing a different object as the execution context, it is still run in the original context of `obj`.
