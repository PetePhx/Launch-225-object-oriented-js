function helloFactory() {
  return function () {
    console.log('Hello');
  };
}

helloFactory()(); // Hello

function timed(func) {
  return function () {
    var start = new Date();
    func();
    var stop = new Date();
    console.log((stop - start).toString() + ' ms has ellapsed.');
  };
}

timed(helloFactory())(); // 18 ms has ellapsed.

timed(function () { console.log('Hello'); })(); // 0 ms has ellapsed.

function loopy() {
  var sum = 0;
  var i;

  for (i = 1; i < 1000000000; i += 1) {
    sum += i;
  }

  console.log(sum);
}

// loopy();

timed(loopy)(); // 3081 ms has ellapsed.
