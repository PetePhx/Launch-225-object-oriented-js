// Problems

// 1. What will the code below log to the console?

var foo = {};
var bar = Object.create(foo);

foo.a = 1;

console.log(bar.a); // 1

// Since property `a` is added to the prototype of bar, it will be accessed during the prototype chain lookup


// 2. What will the code below log to the console?

var foo = {};
var bar = Object.create(foo);

foo.a = 1;
bar.a = 2;
console.log(bar.a); // 2

// Since bar's property `a` overrides the value provided by the prototype


// 3. Given the code below, do we know for certain that on the last line we are ultimately referencing a property owned by boo? How can we test this?

var boo = {};
boo.myProp = 1;

var far = Object.create(boo);

// lots of code

far.myProp;       // 1

// We can test this by:

far.hasOwnProperty('myProp'); // false: far doesn't have its own personal 'myProp'
boo.hasOwnProperty('myProp'); // true: boo has its own 'myProp'
Object.getPrototypeOf(far) === boo; // true: boo is a prototype of far

// This approach however doesn't exclude the possibility of an intermediate object being in the prototype chain in between `far` and `boo`, from which `foo` inherits `myProp`.

// To test directly, we can temporarily change boo.myProp to a mutable/non-primitive value and test equality:

var temp = {icanhaz: "cheeseburger"};
boo.myProp = temp;
far.myProp === temp; // true <========
boo.myProp = 1;

// If we had an intermediate prototype the result would be different:

var boo = {};
boo.myProp = 1;

var poo = Object.create(boo);
poo.myProp = 1;

var far = Object.create(poo);
far.myProp; // 1

var temp = {icanhaz: "cheeseburger"};
boo.myProp = temp;
far.myProp === temp; // false <========
boo.myProp = 1;
