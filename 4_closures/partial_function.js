// 1. Write a function named greet that takes two arguments and logs a greeting:

function greet(str1, str2) {
  console.log(str1 + ', ' + str2 + '!');
}

greet('howdy', 'Joe');
// Howdy, Joe!
greet('good morning', 'Sue');
// Good morning, Sue!


// 2. Use the partial function shown above and your solution to problem 1 to create sayHello and sayHi functions that work like this:

function partial(func, x) {
  return function (y) {
    return func(x, y);
  };
}

var sayHello = partial(greet, 'Hello');
var sayHi = partial(greet, 'Hi');

sayHello('Brandon');
// Hello, Brandon!
sayHi('Sarah');
// Hi, Sarah!
