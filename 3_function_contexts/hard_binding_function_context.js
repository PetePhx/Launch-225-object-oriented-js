var a = 'goodbye';

var object = {
  a: 'hello',
  b: 'world',
  foo: function() {
    return this.a + ' ' + this.b;
  },
};

var bar = object.foo;
bar();                                // "goodbye undefined"

var baz = object.foo.bind(object);
baz();                                // "hello world"

var object2 = {
  a: 'hi',
  b: 'there',
};

baz.call(object2);  // "hello world" - `this` is still `object`


var greetings = {
  morning: 'Good morning, ',
  afternoon: 'Good afternoon, ',
  evening: 'Good evening, ',

  greeting: function(name) {
    var currentHour = (new Date()).getHours();

    if (currentHour < 12) {
      console.log(this.morning + name);
    } else if (currentHour < 18) {
      console.log(this.afternoon + name);
    } else {
      console.log(this.evening + name);
    }
  },
};

var spanishWords = {
  morning: 'Buenos dias, ',
  afternoon: 'Buenas tardes, ',
  evening: 'Buena noches, ',
};

var spanishGreeter = greetings.greeting.bind(spanishWords);

spanishGreeter('Jose');
// Buenos dias, Jose
spanishGreeter('Juan');
// Buenos dias, Juan
