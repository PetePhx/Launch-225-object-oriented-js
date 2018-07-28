// Practice Problems: Prototypes and Prototypal Inheritance

// 1. Write a function that returns the object on a given object's prototype chain where a property is defined. See the example code below:

function getDefiningObject(obj, propKey) {
  while (obj && !obj.hasOwnProperty(propKey)) {
    obj = Object.getPrototypeOf(obj);
  }

  return obj;
}


var foo = {
  a: 1,
  b: 2,
};

var bar = Object.create(foo);
var baz = Object.create(bar);
var qux = Object.create(baz);

bar.c = 3;

console.log(getDefiningObject(qux, 'c') === bar);     // true
console.log(getDefiningObject(qux, 'e'));             // null


// 2. Write a function to provide a shallow copy of an object. The object that you copy should share the same prototype chain as the original object, and it should have the same own properties that return the same values or objects when accessed. Use the code below to verify your implementation:

function shallowCopy(obj) {
  var objCopy = Object.create(Object.getPrototypeOf(obj));
  var ownProps = Object.getOwnPropertyNames(obj);

  for (let i = 0; i < ownProps.length; i += 1) { objCopy[ownProps[i]] = obj[ownProps[i]]; }
  return objCopy;
}

var foo = {
  a: 1,
  b: 2,
};

var bar = Object.create(foo);
bar.c = 3;
bar.say = function() {
  console.log('c is ' + this.c);
};

var baz = shallowCopy(bar);
console.log(baz.a);       // 1
baz.say();                // "c is 3"
baz.hasOwnProperty('a');  //false
baz.hasOwnProperty('b');  //false


// 3. Write a function that extends an object (destination object) with contents from multiple objects (source objects).

function extend(dest, ...args) {
  args.forEach(function (source) {
      for (let prop in source) {
        if (source.hasOwnProperty(prop)) dest[prop] = source[prop];
      }
    }
  );

  return dest;
}

var foo = {
  a: 0,
  b: {
    x: 1,
    y: 2,
  },
};

var joe = {
  name: 'Joe'
};

var funcs = {
  sayHello: function() {
    console.log('Hello, ' + this.name);
  },

  sayGoodBye: function() {
    console.log('Goodbye, ' + this.name);
  },
};

var object = extend({}, foo, joe, funcs);

console.log(object.b.x);          // 1
object.sayHello();                // "Hello, Joe"
