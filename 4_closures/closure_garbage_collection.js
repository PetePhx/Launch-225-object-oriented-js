// Problems

// 1. In the following code, when can JavaScript garbage collect the values represented by the variables a, b, and c?

var a = 34;

function add(b) {
  a += b;
}


function run() {
  var c = add(4); // value of `b`, i.e. number 4 can be GC'ed at the end of `add()` execution.
}

run();

// a and c can be garbage-collected here.


// 2. In the following code, when can JavaScript garbage collect the value "Steve"?

function makeHello(name) {
  return function() {
    console.log("Hello, " + name + "!");
  };
}

var helloSteve = makeHello("Steve");

// `helloSteve` has a reference to the new string "Hello, Steve!", and not any direct link to "Steve", so depending on the browser, "Steve" can be GC'ed at the end of makeHello("Steve") execution.
