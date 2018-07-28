var foo = {
  a: 1,
  b: 2,
};

var bar = Object.create(foo);
var baz = Object.create(bar);
var qux = Object.create(baz);

Object.getPrototypeOf(qux) === baz;       // true
Object.getPrototypeOf(baz) === bar;       // true
Object.getPrototypeOf(bar) === foo;       // true

foo.isPrototypeOf(qux);                   // true - because foo is on qux's prototype chain


var foo = {
  a: 1,
  b: 2,
};                                // created with object literal

Object.getPrototypeOf(foo) === Object.prototype;      // true

// Problems

// 1. Use the method we learned above to assign foo below to a new Object with prot as its prototype.

var prot = {};

var foo = Object.create(prot);



// 2. Use getPrototypeOf to demonstrate the prototypal relationship between prot and foo.

console.log(Object.getPrototypeOf(foo) === prot); // true


// 3. Use isPrototypeOf to demonstrate the prototypal relationship between prot and foo.

console.log(prot.isPrototypeOf(foo)); // true


// 4. What will the last two lines of the code below return? Why?

var prot = {};

var foo = Object.create(prot);

prot.isPrototypeOf(foo); // true
Object.prototype.isPrototypeOf(foo); // true

// prot is the prototype of foo. Object.prototype is at the end of all prototype chains, hence also a prototype of foo
