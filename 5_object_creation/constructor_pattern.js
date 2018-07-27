// Constructor Function
function Person(firstName, lastName) {
  this.firstName = firstName;
  this.lastName = lastName || '';
  this.fullName = function () { return (this.firstName + ' ' + this.lastName).trim(); };
}

var john = new Person('John', 'Doe');
var jane = new Person('Jane');

console.log(john.fullName()); // John Doe

console.log(john.constructor); // [Function: Person]

console.log(john instanceof(Person)); // true


// Problems

// 1. What naming convention separates constructor functions from other functions?

// Capitaliing the first letter of the function name

// 2. What will the code below output? Why?

function Lizard() {
  this.scamper = function() {
    console.log("I'm scampering!");
  };
}

var lizzy = Lizard();
lizzy.scamper(); // ?

// TypeError: Cannot read property 'scamper' of undefined

// Since Lizard is invoked without `new`, scamper() is added to the global object. The Lizard() return value is undefined which is assigned to lizzy.

// 3. Alter the code in problem 2 so that it produces the desired output.

function Lizard() {
  this.scamper = function() {
    console.log("I'm scampering!");
  };
}

var lizzy = new Lizard(); // <========
lizzy.scamper(); // I'm scampering!
