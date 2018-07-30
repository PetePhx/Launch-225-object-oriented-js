// Practice Problems: Constructor Functions and Prototypes (2)

// 1. Follow the steps below:

  // 1. Create an object called shape that has a getType method.
  // 2. Define a Triangle constructor function whose prototype is shape. Objects created with Triangle should have four own properties: a, b, c (representing the sides of a triangle), and type.
  // 3. Add a new method to the prototype called getPerimeter.

// Test your implementation with the following code:

var shape = {
  getType: function() { return this.type; },
};

function Triangle(a, b, c) {
  this.a = a;
  this.b = b;
  this.c = c;
  this.type = 'triangle';
}

Triangle.prototype = shape;

Triangle.prototype.getPerimeter = function () { return this.a + this.b + this.c; };

Triangle.prototype.constructor = Triangle;

var t = new Triangle(1, 2, 3);
console.log(t.constructor);                 // Triangle(a, b, c)
console.log(t.constructor === Triangle);    // true
console.log(shape.isPrototypeOf(t));        // true
console.log(t.getPerimeter());              // 6
console.log(t.getType());                   // "triangle"


// 2. Since a constructor is just a function, it can be called without the new operator, and this can lead to unexpected results and errors especially for inexperienced programmers.

// Write a constructor function that can be used with or without the new operator, and return the same result in either form. Use the code below to check your solution:

function User(first, last) {
  if (this.__proto__ !== User.prototype) return (new User(first, last));
  this.name = first + ' ' + last;
}

// Or

function User(first, last) {
  if (this.constructor !== User) return (new User(first, last));
  this.name = first + ' ' + last;
}

var name = 'Jane Doe';
var user1 = new User('John', 'Doe');
var user2 = User('John', 'Doe');

console.log(name);         // Jane Doe
console.log(user1.name);   // John Doe
console.log(user2.name);   // John Doe


// 3. Create a function that can create an object with a given object as its prototype, without using Object.create.

function createObject(obj) {
  var obj2 = {};
  obj2.__proto__ = obj;
  return obj2;
}

// or:

function createObject(obj) {
  function Temp() {};
  Temp.prototype = obj;
  return new Temp();
}

var foo = {
  a: 1
};

var bar = createObject(foo);
console.log(bar.a);                          // 1
console.log(foo.isPrototypeOf(bar));         // true


// 4. Similar to the problem above, create a begetObject method that you can call on any object to create an object inherited from it:

Object.prototype.begetObject = function () {
  return Object.create(this);
};

// or (without Object.create)

Object.prototype.begetObject = function () {
  function Temp () {};
  Temp.prototype = this;
  return new Temp();
};


var foo = {
  a: 1,
};

var bar = foo.begetObject();
console.log(foo.isPrototypeOf(bar));         // true


// 5. Create a function `neww`, so that it works like the new operator:

function neww(constr, args) {
  var obj = {};
  obj.__proto__ = constr.prototype;
  constr.apply(obj, args);
  return obj;
}

// or

function neww(constr, args) {
  var obj = Object.create(constr.prototype);
  constr.apply(obj, args);
  return obj;
}


function Person(firstName, lastName) {
  this.firstName = firstName;
  this.lastName = lastName;
}

Person.prototype.greeting = function() {
  console.log('Hello, ' + this.firstName + ' ' + this.lastName);
};

var john = neww(Person, ['John', 'Doe']);
john.greeting();          // Hello, John Doe
console.log(john.constructor);         // Person(firstName, lastName) {...}
console.log(john.constructor === Person);         // true
