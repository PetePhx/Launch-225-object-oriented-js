// Practice Problems: What is this? (2)

// While working through these practice problems, assume that the code runs within a web page.

// 1. What does `this` point to in the code below, and what does the method return?

var myObject = {
  count: 1,
  myChildObject: {
    myMethod: function() {
      return this.count;
    },
  },
};

myObject.myChildObject.myMethod(); // undefined

// Since myMethod is invoked and executed on myChildObject, `this` references `myChildObject` and the code returns undefined.


// 2. In the previous problem, how would you change the context, or the value of this, to be the parent myObject?

// accessing myObject directly:

var myObject = {
  count: 1,
  myChildObject: {
    myMethod: function() {
      return myObject.count; // <========
    },
  },
};

myObject.myChildObject.myMethod(); // 1

// or using bind:

var myObject = {
  count: 1,
  myChildObject: {
    myMethod: function () {
      return this.count;
    }.bind(myObject), // <========
  },
};

myObject.myChildObject.myMethod(); // 1

// or explicitly supplying context:

var myObject = {
  count: 1,
  myChildObject: {
    myMethod: function() {
      return this.count;
    },
  },
};

myObject.myChildObject.myMethod.call(myObject); // <======== 1


// 3. What does the following code log to the console?

var person = {
  firstName: 'Peter',
  lastName: 'Parker',
  fullName: function() {
    console.log(this.firstName + ' ' + this.lastName +
                ' is the Amazing Spiderman!');
  },
};

var whoIsSpiderman = person.fullName.bind(person);
whoIsSpiderman();

// Peter Parker is the Amazing Spiderman!

// This is because of the hard binding of whoIsSpiderman to person.


// 4. What does the following code log to the console?

var a = 1;
var obj = {
  a: 2,
  func: function() {
    console.log(this.a);
  },
};

obj.func(); // 2, since this references context obj implicitly.
obj.func.call(); // 1, since by default global context is provided miplicitly for `call`
obj.func.call(this); //1, since `this` in the global scope references global context
obj.func(obj); // 2, since obj is expicilty set as the execution context

var obj2 = { a: 3 };
obj.func.call(obj2); // 3, since obj2 is set as the context


// 5. What does the following code log to the console?

var computer = {
  price: 30000,
  shipping: 2000,
  total: function() {
    var tax = 3000;
    function specialDiscount() {
      if (this.price > 20000) {
        return 1000;
      } else {
        return 0;
      }
    }

    return this.price + this.shipping + tax - specialDiscount();
  }
};

console.log(computer.total()); // 35000. Since specialDiscount aslways returns 0, as this.price is undefined in the inner function execution context.

// If you want this program to log 34000, how would you fix it?

// hard binding:

var computer = {
  price: 30000,
  shipping: 2000,
  total: function() {
    var tax = 3000;
    var specialDiscount = function () { // <========
      if (this.price > 20000) {
        return 1000;
      } else {
        return 0;
      }
    }.bind(this); // <========

    return this.price + this.shipping + tax - specialDiscount();
  }
};

console.log(computer.total()); // 34000

// that

var computer = {
  price: 30000,
  shipping: 2000,
  total: function() {
    var tax = 3000;
    var that = this; // <========
    function specialDiscount() {
      if (that.price > 20000) { // <========
        return 1000;
      } else {
        return 0;
      }
    }

    return this.price + this.shipping + tax - specialDiscount();
  }
};

console.log(computer.total()); // 34000

// call (or apply)

var computer = {
  price: 30000,
  shipping: 2000,
  total: function() {
    var tax = 3000;
    function specialDiscount() {
      if (this.price > 20000) {
        return 1000;
      } else {
        return 0;
      }
    }

    return this.price + this.shipping + tax - specialDiscount.call(this); // <========
  }
};

console.log(computer.total()); // 34000
