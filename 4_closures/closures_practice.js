// Practice Problems: Closures

// 1. Write a function named makeMultipleLister that, when invoked and passed a number, returns a function that logs every positive integer multiple of that number less than 100. Usage looks like this:

function makeMultipleLister(num) {
  return function () {
    for (let i = num; i < 100; i += num) { console.log(i); }
  };
}

var lister = makeMultipleLister(13);
lister();
// 13
// 26
// 39
// 52
// 65
// 78
// 91


// 2. Write a program that uses two functions, add and subtract, to manipulate a running total value. When you invoke either function with a number, it should add or subtract that number from the running total and log the new total to the console. Usage looks like this:

var total = 0;

function add(amount) {
  total += amount;
  console.log(total);
}

function subtract(amount) {
  total -= amount;
  console.log(total);
}

add(1); // 1
add(42); // 43
subtract(39); // 4
add(6); // 10


// 3. Write a function named later that takes two arguments: a function and an argument for that function. The return value should be a new function that calls the input function with the provided argument, like this:

function later(func, arg) {
  return function () {
    func(arg);
  };
}

var logWarning = later(console.log, 'The system is shutting down!');
logWarning();
// The system is shutting down!


// 4. Given the following code:

function startup() {
  var status = 'ready';
  return function() {
    console.log('The system is ready.');
  };
}

var ready = startup();
// var systemStatus = // ?

// How can you set the value of systemStatus to the value of the inner variable status without changing startup in any way?

// We can't, as the local variable `status` is not accessible from outside startup.
