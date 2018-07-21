// Practice Problems: Mutating Objects

// 1. What will the code below output to the console?

var message = 'Hello from the global scope!';

function func(message) {
  message = 'Hello from the function scope!';
  console.log(message);
}

func(message);
console.log(message);

// This will log first the `message` in the local scope, since `message` argument is reassigned within `func`, and then logs the `message` in the global scope.

// Hello from the function scope!
// Hello from the global scope!


// 2. What will the code below log to the console? What does this output demonstrate in relation to the output of problem one?

var myObj = { message: 'Greetings from the global scope!' };

function func(obj) {
  obj.message = 'Greetings from the function scope!';
  console.log(obj.message);
}

func(myObj);

console.log(myObj.message);

// Here `func` invocation changes the value referenced by myObj.message. We expect the new string value set in the function to be logged twice.

// Greetings from the function scope!
// Greetings from the function scope!


// 3. What will the code below log to the console?

var message = 'Hello from the global scope!';

function func() {
  message = 'Hello from the function scope!';
  console.log(message);
}

func();
console.log(message);

// since the reassignment within `func` directly accessess and affects the global variable, here we will have the new `message` value logged twice:

// Hello from the function scope!
// Hello from the function scope!


// 4. What will the code below log to the console?

var a = 10;
var obj = {
  a: a,
}

var newObj = obj;
newObj.a += 10;

console.log(obj.a === a); // false: since the value of obj.a is now 20
console.log(newObj === obj); // true: obj and newObj point/reference to the same object


// 5. Consider the code below:

var animal = {
  name: 'Pumbaa',
  species: 'Phacochoerus africanus',
};

var menagerie = {
  warthog: animal,
};

animal = {
  name: 'Timom',
  species: 'Suricata suricatta',
};

menagerie.meerkat = animal;

menagerie.warthog === animal; // false
menagerie.meerkat === animal; // true

// If objects are mutable, why does the second to last line return false?

// In lines 80-83 `animal` is reassigned, not mutated. menagerie.warthog is still pointing to the old object { name: 'Pumbaa', ... } but `animal` is now referencing a new object { name: 'Timom' ...}. Since these are two distinct objects, menagerie.warthog !== animal.
