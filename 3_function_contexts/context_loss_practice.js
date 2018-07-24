// Practice Problems: Dealing with Context Loss

// 1. Our desired output for the code below is: Christopher Turk is a Surgeon. What will the code output, and what explains the difference, if any, between the actual and desired outputs?

var turk = {
  firstName: 'Christopher',
  lastName: 'Turk',
  occupation: 'Surgeon',
  getDescription: function() {
    return this.firstName + ' ' + this.lastName + ' is a ' + this.occupation + '.';
  }
};

function logReturnVal(func) {
  var returnVal = func();
  console.log(returnVal);
}

logReturnVal(turk.getDescription); // undefined undefined is a undefined.

// Since getDescription() is executed inside logReturnVal(), it loses access to its original context, with the binding to the global scope at the time of execution, resulting in `undefined` values printed for this.firstName, etc.


// 2. Alter logReturnVal such that it takes an additional context argument, and use one of the methods we've learned in this lesson to invoke func inside of logReturnVal with context as its function execution context. Alter the invocation of logReturnVal and supply turk as the context argument.

function logReturnVal(func, context) {
  var returnVal = func.call(context);
  console.log(returnVal);
}

logReturnVal(turk.getDescription, turk); // Christopher Turk is a Surgeon.


// 3. Suppose that we want to extract getDescription from turk, but always have it execute with turk as context. Use one of the methods we've learned in the last lesson to assign such a permanently bound function to a new variable, getTurkDescription.

var getTurkDescription = turk.getDescription.bind(turk);

console.log(getTurkDescription()); // Christopher Turk is a Surgeon.


// 4. Consider the code below, and our desired output:

var TESgames = {
  titles: ['Arena', 'Daggerfall', 'Morrowind', 'Oblivion', 'Skyrim'],
  seriesTitle: 'The Elder Scrolls',
  listGames: function() {
    this.titles.forEach(function(title) {
      console.log(this.seriesTitle + ' ' + title);
    });
  }
};

TESgames.listGames();

// Desired output:
//
// The Elder Scrolls Arena
// The Elder Scrolls Daggerfall
// The Elder Scrolls Morrowind
// The Elder Scrolls Oblivion
// The Elder Scrolls Skyrim
//
// Will this code log our desired output? Why or why not?

// Actual output:
//
// undefined Arena
// undefined Daggerfall
// undefined Morrowind
// undefined Oblivion
// undefined Skyrim

// The actual output is different since the anonymous function within `forEach` does not have access to the object context, instead binding to the global context where `this.seriesTitle` is `undefined`.


// 5. Use the var self = this fix to alter TESgames.listGames such that it logs our desired output to the console.

var TESgames = {
  titles: ['Arena', 'Daggerfall', 'Morrowind', 'Oblivion', 'Skyrim'],
  seriesTitle: 'The Elder Scrolls',
  listGames: function() {
    var self = this;
    this.titles.forEach(function(title) {
      console.log(self.seriesTitle + ' ' + title);
    });
  }
};

TESgames.listGames();
// The Elder Scrolls Arena
// The Elder Scrolls Daggerfall
// The Elder Scrolls Morrowind
// The Elder Scrolls Oblivion
// The Elder Scrolls Skyrim


// 6. If we don't want to rely on var self = this, forEach provides us with an alternative means of supplying execution context to the inner function. Use this means to achieve our desired output.

var TESgames = {
  titles: ['Arena', 'Daggerfall', 'Morrowind', 'Oblivion', 'Skyrim'],
  seriesTitle: 'The Elder Scrolls',
  listGames: function() {
    this.titles.forEach(function(title) {
      console.log(this.seriesTitle + ' ' + title);
    }, this); // <=======
  }
};

TESgames.listGames();


// 7. Consider the code below:

var foo = {
  a: 0,
  incrementA: function() {
    function increment() {
      this.a += 1;
    }

    increment();
  }
};

foo.incrementA();
foo.incrementA();
foo.incrementA();

// What will the value of foo.a be after this code has executed?

console.log(foo.a); // 0
// The inner function increment() within incrementA() method does not have access to the object context.


// 8. Use one of the methods we learned in this lesson to invoke increment with explicit context such that foo.a is incremented with each invocation of incrementA.

var foo = {
  a: 0,
  incrementA: function() {
    function increment() {
      this.a += 1;
    }

    increment.call(this); // <===========
  }
};

console.log(foo.a); // 0
foo.incrementA();
console.log(foo.a); // 1

var foo = {
  a: 0,
  incrementA: function() {
    var increment = function () { // <========
      this.a += 1;
    }.bind(this); // <=========

    increment();
  }
};

console.log(foo.a); // 0
foo.incrementA();
console.log(foo.a); // 1

var foo = {
  a: 0,
  incrementA: function() {
    var that = this;
    function increment() {
      that.a += 1;
    }

    increment(); // <===========
  }
};

console.log(foo.a); // 0
foo.incrementA();
console.log(foo.a); // 1


// 9. We decide that we want each invocation of foo.incrementA to increment foo.a by 3, rather than 1, and alter our code accordingly:

var foo = {
  a: 0,
  incrementA: function() {
    function increment() {
      this.a += 1;
    }

    increment.apply(this);
    increment.apply(this);
    increment.apply(this);
  }
};

// Calling apply three times seems repetitive, though. Use bind to permanently set foo as increment's execution context.

var foo = {
  a: 0,
  incrementA: function() {
    var increment = function () {
      this.a += 1;
    }.bind(this); // <========

    increment(); // <========
    increment();
    increment();
  }
};

console.log(foo.a); // 0
foo.incrementA();
console.log(foo.a); // 3
