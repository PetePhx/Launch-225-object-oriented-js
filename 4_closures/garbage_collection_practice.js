// Practice Problems: Garbage Collection

// 1. Is JavaScript a garbage-collected language, and if so, what does this entail?

// Yes, this means the programmer does not have to worry about deallocating memory when a variable is not needed anymore.


// 2. Consider the code below:

var myNum = 1;

function foo() {
  var myStr = 'A string';
  // what is eligible for GC here? (line 5)
}

foo();

// what is eligible for GC here? (line 10)

// more code

// Are either of the values 1 or "A string" eligible for garbage collection on line 5? What about on line 10?

// 'A String' can be GC'ed on line 19 (10), as it is only local to foo() scope. If foo() is invoked later in the program, the string literal is created and then GC'ed at the end of foo() execution again.

// `1` is not GC'ed in line 19 (10) as it may be still referenced later in the program.


// 3. In the code below, is the value referenced by outerFoo eligible for garbage collection on line 10?

var outerFoo;

function bar() {
  var innerFoo = 0;
  outerFoo = innerFoo;
}

bar();

// can outerFoo's 0 be garbage collected here? (10)

// more code

// No, since outerFoo is defined in the outer scope and could be referenced later.


// 4. Consider the code below:

function makeEvenCounter() {
  var index = 0;
  return function() {
    return index += 2;
  };
}

var evenCounter = makeEvenCounter();

// is 0 eligible for GC here? (10)

// more code

// Is 0 eligible for garbage collection on line 10?

// No, since it is referenced from the closure created.


// 5. Consider the script below:

var bash = "Some val";

// Will the value "Some val" ever be eligible for garbage collection?

// "Some val" will be GC'ed either when `bash` is reassigned or otherwise at the end of the program.
