// Problems

// 1. Create a makeCounterLogger function that takes a number as an argument and returns a function. When we invoke the returned function with a second number, it should count up or down from the first number to the second number, logging each number to the console:

function makeCounterLogger(a) {
  return function (b) {
    if (b >= a) {
      for (let i = a; i <= b; i += 1) { console.log(i); }
    } else {
      for (let i = a; i >= b; i -= 1) { console.log(i); }
    }
  };
}

var countlog = makeCounterLogger(5);
countlog(8);
// 5
// 6
// 7
// 8
countlog(2);
// 5
// 4
// 3
// 2

// 2. We'll build a simple todo list program using the techniques we've seen in this assignment. Write a makeList function that returns a new function that implements a todo list. The returned function should have the following behavior:

  // When called with an argument that is not already on the list, it adds that argument to the list.

  // When called with an argument that is already on the list, it removes the element from the list.

  // When called without arguments, it logs all items on the list. If the list is empty, it logs an appropriate message.

function makeList() {
  var todo = [];

  return function (item) {
    if (arguments.length === 0) {
      if (todo.length > 0) {
        todo.forEach(elm => console.log(elm));
      } else {
        console.log('The list is empty.');
      }
      return;
    }
    var idx = todo.indexOf(item);

    if (idx !== -1) {
      todo.splice(idx, 1);
      console.log(item + ' removed!');
    } else {
      todo.push(item);
      console.log(item + ' added!');
    }
  };
}


var list = makeList();
list();
// The list is empty.
list('make breakfast');
// make breakfast added!
list('read book');
// read book added!
list();
// make breakfast
// read book
list('make breakfast');
// make breakfast removed!
list();
// read book
