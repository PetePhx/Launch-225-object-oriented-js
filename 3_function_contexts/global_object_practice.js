// Practice Problems: The Global Object

// 1. In a browser environment, what object serves as the implicit execution context?

//  `window`


// 2. In a browser environment, what does the code below log?

a = 10;

console.log(window.a === a); // true

// since `a` is a property of the global object (window)


// 3. What does the code below log?

function func() {
  var b = 1;
}

func();

console.log(b); // Uncaught ReferenceError: b is not defined

// Since `b` is a local variable defined within the `func` scope.


// 4. What does the code below log?

function func() {
  b = 1;
}

func();

console.log(b);  // 1

// Execution of func() creates `b` as a property of the global object, which is then printed.


// 5. Of the variables a, b, and c below, can any be successfully deleted?

var a = 1;
b = 'Hi there';
var c = '-50';

delete a; // => false
delete b; // => true
delete c; // => flase

// `b`, unlike `a` and `c` is an undeclared global variable, hence deletable.


// 6. In the code below, will we be able to delete func?

function func() {
  console.log("I'm a function!");
}

delete func; // => false

//  since func is defined by declaration, it can not be deleted.


// 7. Of the variables a, b, and c below, can any be deleted?

window.a = 1;
b = 2;
var c = b;

delete window.a; // => true
delete window.b; // => true
delete window.c; // => false

// variables `a` and `b` are not declared, hence deletable, unlike `c`.
