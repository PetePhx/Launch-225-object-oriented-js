var john = {
  firstName: 'John',
  lastName: 'Doe',
  greetings: function() {
    console.log('hello, ' + this.firstName + ' ' + this.lastName);
  },
};

var foo = john.greetings; // Strips context
foo();

// "hello, undefined undefined"


function repeatThreeTimes(func) {
  func();       // can't do func.call(john), out of scope
  func();
  func();
}

function foo() {
  var john = {
    firstName: 'John',
    lastName: 'Doe',
    greetings: function() {
      console.log('hello, ' + this.firstName + ' ' + this.lastName);
    },
  };

  repeatThreeTimes(john.greetings); // Strips context
}

foo();

// "hello, undefined undefined"
// "hello, undefined undefined"
// "hello, undefined undefined"

// supplying the context as an argument:

function repeatThreeTimes(func, context) {
  func.call(context);
  func.call(context);
  func.call(context);
}

function foo() {
  var john = {
    firstName: 'John',
    lastName: 'Doe',
    greetings: function() {
      console.log('hello, ' + this.firstName + ' ' + this.lastName);
    },
  };

  repeatThreeTimes(john.greetings, john);
}

foo();

// "hello, John Doe"
// "hello, John Doe"
// "hello, John Doe"


// hard binding, when we can't supply the context explicitly

function repeatThreeTimes(func) {
  func();
  func();
  func();
}

function foo() {
  var john = {
    firstName: 'John',
    lastName: 'Doe',
    greetings: function() {
      console.log('hello, ' + this.firstName + ' ' + this.lastName);
    },
  };

  repeatThreeTimes(john.greetings.bind(john));
}

foo();

// "hello, John Doe"
// "hello, John Doe"
// "hello, John Doe"


// Internal Function Losing Context

var obj = {
  a: 'hello',
  b: 'world',
  foo: function() {
    function bar() {
      console.log(this.a + ' ' + this.b);
    }

    bar();
  },
};

obj.foo();        // undefined undefined

// Solution 1: Preserve Context with a Local Variable in the Lexical Scope

var obj = {
  a: 'hello',
  b: 'world',
  foo: function() {
    var self = this; // `self = this` or `that = this`

    function bar() {
      console.log(self.a + ' ' + self.b);
    }

    bar();
  }
};

obj.foo();
// hello world

// Solution 2: Pass the Context to Internal Functions

var obj = {
  a: 'hello',
  b: 'world',
  foo: function() {
    function bar() {
      console.log(this.a + ' ' + this.b);
    }

    bar.call(this);
  }
};

obj.foo();
// hello world

// Solution 3: Bind the Context with a Function Expression

var obj = {
  a: 'hello',
  b: 'world',
  foo: function() {
    var bar = function() {
      console.log(this.a + ' ' + this.b);
    }.bind(this);
    bar();
  }
};

obj.foo();
// hello world


// Function as Argument Losing Surrounding Context

function repeatThreeTimes(func) {
  func();
  func();
  func();
}

var john = {
  firstName: 'John',
  lastName: 'Doe',
  greetings: function() {
    repeatThreeTimes(function() {
      console.log('hello, ' + this.firstName + ' ' + this.lastName);
    });
  },
};

john.greetings();

// "hello, undefined undefined"
// "hello, undefined undefined"
// "hello, undefined undefined"

// solutions: similar to the previous case:

// Use a local variable in the lexical scope to store this

var obj = {
  a: 'hello',
  b: 'world',
  foo: function() {
    var that = this; // <===
    [1, 2, 3].forEach(function(number) {
      console.log(String(number) + ' ' + that.a + ' ' + that.b); // <===
    });
  },
};

obj.foo();

// 1 hello world
// 2 hello world
// 3 hello world

// Bind the argument function with the surrounding context

var obj = {
  a: 'hello',
  b: 'world',
  foo: function() {
    [1, 2, 3].forEach(function(number) {
      console.log(String(number) + ' ' + this.a + ' ' + this.b);
    }.bind(this)); // <===
  },
};

obj.foo();

// 1 hello world
// 2 hello world
// 3 hello world

// provide thisArg to some methods like forEach, map, every, some:

var obj = {
  a: 'hello',
  b: 'world',
  foo: function() {
    [1, 2, 3].forEach(function(number) {
      console.log(String(number) + ' ' + this.a + ' ' + this.b);
    }, this); // <====
  },
};

obj.foo();

// 1 hello world
// 2 hello world
// 3 hello world
