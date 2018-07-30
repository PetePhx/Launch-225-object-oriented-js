// Object.defineProperties

var obj = {
  name: 'Obj',
};

Object.defineProperties(obj, {
  age: {
    value: 30,
    writable: false,
  },
});

console.log(obj.age); // 30
obj.age = 32;
console.log(obj.age); // 30


// Using this method, create a function that constructs a new object with a log method that is read-only. The log method will use console.log to output the name property on itself.


function newPerson(name) {
  if (!(this instanceof newPerson)) return new newPerson(name);
  this.name = name;
}

Object.defineProperties(newPerson.prototype, {
    log: {
      value: function () { console.log(this.name); },
      writable: false,
    },
  },
);

// alternatively:

function newPerson(name) {
  return Object.defineProperties({ name: name }, {
    log: {
      value: function() {
        console.log(this.name);
      },
      writable: false
    },
  });
}

var me = newPerson('Shane Riley');
me.log();     // Shane Riley
me.log = function() { console.log('Amanda Rose'); };
me.log();     // Shane Riley


// Object.freeze

var frozen = {
  integer: 4,
  string: 'String',
  array: [1, 2, 3],
  object: {
    foo: 'bar'
  },
  func: function() {
    console.log('I\'m frozen');
  },
};

Object.freeze(frozen);
frozen.integer = 8;
frozen.string = 'Number';
frozen.array.pop();
frozen.object.foo = 'baz';
frozen.func = function() {
  console.log('I\'m not really frozen');
};

console.log(frozen.integer);      // 4
console.log(frozen.string);       // String
console.log(frozen.array);        // [1, 2]
console.log(frozen.object.foo);   // baz
frozen.func();                    // I'm frozen

// Can you explain why the array and object properties are changed, but the method is not?

// Object.freeze(obj) prevents from reassigning of object properties. Howver, the property values themselves are that are mutable can be changes while poiting to the same objects. (objects, including arrays, are mutable).
