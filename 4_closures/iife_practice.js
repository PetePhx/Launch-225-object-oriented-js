// Practice Problems: IIFEs

// 1. Will the code below execute?

function() {
  console.log("Sometimes, syntax isn't intuitive!")
}();

// SyntaxError: Unexpected token (

// We can't immediately execute a function definition unless it is an expression.


// 2. Edit the code from problem one so it executes without error.

(function () {
  console.log("Sometimes, syntax isn't intuitive!")
})();

// Sometimes, syntax isn't intuitive!


// 3. The code below throws an error:

var sum = 0;
var numbers;

sum += 10;
sum += 31;

numbers = [1, 7, -3, 3];

function sum(arr) {
  return arr.reduce(function(sum, number) {
    sum += number;
    return sum;
  }, 0);
}

sum += sum(numbers);  // Uncaught TypeError: sum is not a function

// What kind of problem does this error highlight? Use an IIFE to address it, so that code runs without error.

// Since the viariable `sum` is assigned an integer, it overwrites the variable `sum` referencing the function with the same name, raising error in line 40 when trying to invoke sum.

// IIFE Solution:

var sum = 0;
var numbers;

sum += 10;
sum += 31;

numbers = [1, 7, -3, 3];

sum += (function (arr) {
  return arr.reduce(function(sum, number) {
    sum += number;
    return sum;
  }, 0);
})(numbers); // 49


// 4. Consider the output below:

// Implement a function countdown that uses an IIFE to generate the desired output.

function countdown(num) {
  (function (n) {
    for (let i = n; i >= 0; i -= 1) { console.log(i); }
    console.log('Done!');
  })(num);
}

countdown(7);
// 7
// 6
// 5
// 4
// 3
// 2
// 1
// 0
// Done!


// 5. is the named function inside in this IIFE accessible in the global scope?

(function foo() {
  console.log('Bar');
})();

foo(); // Uncaught ReferenceError: foo is not defined

// `foo` being the name of the function expression is only accessible within the iife inner scope.


// 6. For an extra challenge, refactor the solution to problem 4 using recursion, bearing in mind that a named function created in an IIFE can be referenced inside of the IIFE.

function countdown(num) {
  (function recCount(n) {
    if (n < 0) return console.log('Done!');
    console.log(n);
    recCount(n - 1);
  })(num);
}

countdown(7);
