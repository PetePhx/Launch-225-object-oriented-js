// Practice Problems: Constructor Functions and Prototypes (1)

// 1. What does the following code log to the console?

var a = 1;
var foo;
var obj;

function Foo() {
  this.a = 2;
  this.bar = function() {
    console.log(this.a);
  };
  this.bar();
}

foo = new Foo(); // 2

foo.bar(); // 2
Foo(); // 2 (overwrites the global var `a` to 2)

obj = {};
Foo.call(obj); // assigns property `a` and method `bar` to `obj`, then executes obj.bar (logs 2)
obj.bar(); // 2

console.log(this.a); // 2


// 2. What does the following code log to the console?

var RECTANGLE = {
  area: function() {
    return this.width * this.height;
  },
  circumference: function() {
    return 2 * (this.width + this.height);
  },
};

function Rectangle(width, height) {
  this.width = width;
  this.height = height;
  this.area = RECTANGLE.area(); // executed in the RECTANGLE context, returning `NaN`
  this.circumference = RECTANGLE.circumference(); // executed in the RECTANGLE context. `NaN`
}

var rect1 = new Rectangle(2, 3);
console.log(rect1.area); // NaN
console.log(rect1.circumference); // NaN

// Method invokations in lines 43 and 44 are explicitly in the context of RECTANGLE, which has undefined properties width and height, resulting in NaN output for arithmetic operations.

// How do you fix this problem?

// We need to execute the area() and circumference() methods within the constructor context:

function Rectangle(width, height) {
  this.width = width;
  this.height = height;
  this.area = RECTANGLE.area.call(this); // executed in Rectangle context
  this.circumference = RECTANGLE.circumference.call(this); // executed in the Rectangle context
}

var rect1 = new Rectangle(2, 3);
console.log(rect1.area); // 6
console.log(rect1.circumference); // 10


// 3. Write a constructor function Circle, that takes a radius as an argument. You should be able to call an area method on the created objects to get the circle's area. Test your implementation with the following code:

function Circle(radius) {
  this.radius = radius;
}

Circle.prototype.area = function () {
  return Math.PI * this.radius * this.radius;
}

var a = new Circle(3);
var b = new Circle(4);

console.log(a.area().toFixed(2)); // 28.27
console.log(b.area().toFixed(2)); // 50.27


// 4. What will the following code log out and why?

var ninja;
function Ninja() {
  this.swung = true;
}

ninja = new Ninja();

Ninja.prototype.swingSword = function() {
  return this.swung;
};

console.log(ninja.swingSword()); // true

// The method `swingSword` for Ninja.prototype is shared by all the objects that are created by the constructor function Ninja since they have Ninja.prototype as their prototype object.


// 5. What will the following code log out and why?

var ninja;
function Ninja() {
  this.swung = true;
}

ninja = new Ninja();

Ninja.prototype = { // <======== Reassignment of Ninja.prototype
  swingSword: function() {
    return this.swung;
  },
};

console.log(ninja.swingSword()); // TypeError: ninja.swingSword is not a function

// Since Ninja.prototype is reassigned in line 113, it is not the same object anymore as the prototype object for ninja, hence swingSword is not inherited by ninja.

console.log(ninja.__proto === Ninja.prototype); // false


// 6. Implement the method described in the comments below:

var ninjaA;
var ninjaB;
function Ninja() {
  this.swung = false;
}

ninjaA = new Ninja();
ninjaB = new Ninja();

Ninja.prototype.swing = function () {
  this.swung = true;
  return this;
}

// Add a swing method to the Ninja prototype which
// returns itself and modifies swung

console.log(ninjaA.swing().swung);      // this needs to be true
console.log(ninjaB.swing().swung);      // this needs to be true


// 7. In this problem, we'll ask you to create a new instance of an object, without having direct access to the constructor function:

var ninjaA = (function() {
  function Ninja(){};
  return new Ninja();
})();

// create a ninjaB object

// approach 1:
var ninjaB = Object.create(ninjaA.__proto__);
console.log(ninjaB.constructor === ninjaA.constructor);    // this should be true

// approach 2:
var ninjaB = new ninjaA.constructor();
console.log(ninjaB.constructor === ninjaA.constructor);    // this should be true

// approach 3:
var ninjaB = Object.create(ninjaA);
ninjaB.__proto__ = ninjaB.__proto__.__proto__;
console.log(ninjaB.constructor === ninjaA.constructor);    // this should be true
