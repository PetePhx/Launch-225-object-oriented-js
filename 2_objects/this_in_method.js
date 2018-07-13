var counter = {
  count: 0,
  advance: function () {
    this.count += 1;
  },
};

console.log(counter);
// { count: 0, advance: [Function: advance] }

counter.advance();

console.log(counter);
// { count: 1, advance: [Function: advance] }

counter.advance();
counter.advance();

console.log(counter);
// { count: 3, advance: [Function: advance] }
