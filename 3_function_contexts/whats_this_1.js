// Practice Problems: What is this? (1)

// While working through these practice problems, assume that the code runs within a web page.

// 1. What does this point to in the code below?

function whatIsMyContext() {
  return this;
}

// Since the function is declared in the global namespace, `this` refers to the global object if we execute the function in the glbal scope. HOwever, depending on the execution context, `this` could refer to different objects.


// 2. What does this point to in the code below?

function whatIsMyContext() {
  return this;
}

whatIsMyContext();

// Here the execution is implicitly in the global context, so `this` refers to the global object `Window`

console.log(whatIsMyContext());

// Window {postMessage: ƒ, blur: ƒ, focus: ƒ, close: ƒ, frames: Window, …}


// 3. What does this point to in the code below?

function foo() {
  function bar() {
    function baz() {
      console.log(this);
    }

    baz();
  }

  bar();
}

foo(); // Window

// The inner functions are executed implicitly in the global context.


// 4. What does this point to in the code below?

var obj = {
  count: 2,
  method: function() {
    return this.count;
  },
};

obj.method(); // 2

// Since the method `method` is executed within the context of the object `obj`, `this` refers to `obj`.


// 5. What does the following program log to the console?

function foo() {
  console.log(this.a);
}

var a = 2;
foo(); // 2

// Since we have implicit global execution context, `this.a` refers to the global variable `a`.


// 6. What does the following program log to the console?

var a = 1;
function bar() {
  console.log(this.a);
}

var obj = {
  a: 2,
  foo: bar,
};

obj.foo(); // 2

// since `foo` in invoked on `obj`, `obj` becomes the execution context, with `this.a` in line 78 refering to `obj.a`.


// 7. What does the following code log to the console?

var foo = {
  a: 1,
  bar: function() {
    console.log(this.baz());
  },

  baz: function() {
    return this;
  },
};

foo.bar(); // {a: 1, bar: ƒ, baz: ƒ}
var qux = foo.bar;
qux(); // Uncaught TypeError: this.baz is not a function

// In line 104 we have the object foo returned. Even though `baz` is invoked in the inner scope, it is invoked with the explicit context set to foo when invoked as: `this.baz()`.

// Line 106 raises an exception for unknown function, since `qux` is now removed from its original context of `foo` and executed implicitly in the global context, where `this.baz()` is not defined.
