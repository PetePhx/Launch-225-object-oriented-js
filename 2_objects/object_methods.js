var me = {
  firstName: 'Jane',
  lastName: 'Doe',
};

// console.log(me);

var me = {};
me.firstName = 'Jane';
me.lastName = 'Doe';

// console.log(me);

function fullName(person) {
  console.log(person.firstName + ' ' + person.lastName);
}

// fullName(me);

var friend = {
  firstName: 'John',
  lastName: 'Smith',
}

// fullName(friend);

var mother = {
  firstName: 'Amber',
  lastName: 'Doe',
};

var father = {
  firstName: 'Shane',
  lastName: 'Doe',
};

var people = [];

people.push(me);
people.push(friend);
people.push(mother);
people.push(father);

function rollCall(collection) {
  var i;
  var len = collection.length;

  for (i = 0; i < len; i += 1) {
    fullName(collection[i]);
  }
}

function rollCall(collection) {
  collection.forEach(function (item) {
    fullName(item);
  });
}

function rollCall(collection) {
  collection.forEach(fullName);
}

// rollCall(people);

var people = {
  collection: [me, friend, mother, father],
  fullName: function(person) {
    console.log(person.firstName + ' ' + person.lastName);
  },

  rollCall: function () {
    this.collection.forEach(this.fullName);
  },

  add: function (person) {
    if (this.isInvalidPerson) return;
    this.collection.push(person);
  },

  get: function (person) {
    if (this.isInvalidPerson(person)) return;

    return this.collection[this.getIndex(person)];
  },

  getIndex: function (person) {
    var index = -1;
    this.collection.forEach(function(comparator, i) {
      if (comparator.firstName === person.firstName &&
          comparator.lastName === person.lastName) {
        index = i;
      }
    });

    return index;
  },

  remove: function (person) {
    var index = this.getIndex(person);
    if (this.isInvalidPerson(person)) return;

    if (index === -1) return;

    this.collection.splice(index, 1);
  },

  update: function (person) {
    if (this.isInvalidPerson(person)) return;
    var existingPersonId = this.getIndex(person);

    if (existingPersonId === -1) {
      this.add(person);
    } else {
      this.collection[existingPersonId] = person;
    }
  },

  isInvalidPerson: functino (person) {
    return typeof(person.firstName) !== 'string' || typeof(person.lastName) !== 'string';
  },
}

people.rollCall();

console.log(people.getIndex(friend)); // 1
people.remove(friend);
console.log(people.getIndex(friend)); // -1
