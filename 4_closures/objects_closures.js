// Problems

// 1. Reimplement makeList, so that it returns an Object that provides the interface shown above, including add, list, and remove methods.

function makeList() {
  var items = [];
  return {
    list: function () {
      items.forEach(x => console.log(x));
    },
    add: function (thing) {
      items.push(thing);
      console.log(thing + ' added!');
    },
    remove: function (thing) {
      var idx = items.indexOf(thing);
      if (idx > -1) {
        items.splice(idx, 1);
        console.log(thing + ' removed!');
      } else {
        console.log(thing + ' not in the list!');
      }
    },
    clear: function () {
      items = [];
    },
  };
}

var list = makeList();
list.add('peas');
// peas added!
list.list();
// peas
list.add('corn');
// corn added!
list.list();
// peas
// corn
list.remove('peas');
// peas removed!
list.list();
// corn


// 2. Notice that the solution lets us access the array of items through the items property:

// list.items;            // items accessible from outside object
// ['corn']               // since it is an object property

// This was not the case in the single-function implementation:

// list.items;            // items not accessible from outside function
// undefined              // since it is within a closure

// Update the implementation from problem 1 so that it retains the use of an object with methods but prevents outside access to the items the object stores internally.

console.log(list.items); // undefined

// The solution above does not access items directly as we have the variable items defined outside the object.
