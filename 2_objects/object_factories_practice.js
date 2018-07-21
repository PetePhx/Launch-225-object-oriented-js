// Practice Problems: Functions as Object Factories

// In these problems, we will be developing a factory function for objects representing countries.

// 1. Consider the code below:

var chile = {
  name: 'The Republic of Chile',
  continent: 'South America',
  getDescription: function() {
    return this.name + ' is located in ' + this.continent + '.';
  },
};

var canada = {
  name: 'Canada',
  continent: 'North America',
  getDescription: function() {
    return this.name + ' is located in ' + this.continent + '.';
  },
};

var southAfrica = {
  name: 'The Republic of South Africa',
  continent: 'Africa',
  getDescription: function() {
    return this.name + ' is located in ' + this.continent + '.';
  },
};

// Think about what is necessary and unnecessary in this code. Where is there duplication?

// the `getDescription()` method is duplicated in all objects.


// 2. Given our observations about the code above, implement a factory function for our country objects following the template laid out below:

function makeCountry(name, continent) {
  return {
    name: name,
    continent: continent,
    getDescription: function () {
      return this.name + ' is located in ' + this.continent + '.';
    },
  };
}

var chile = makeCountry('The Republic of Chile', 'South America');
var canada = makeCountry('Canada', 'North America');
var southAfrica = makeCountry('The Republic of South Africa', 'Africa');

console.log(chile.getDescription());       // "The Republic of Chile is located in South America."
console.log(canada.getDescription());      // "Canada is located in North America."
console.log(southAfrica.getDescription()); // "The Republic of South Africa is located in Africa."


// 3. We've decided that we want to track which countries we've visited, and which we haven't. Alter the factory function so that the object it returns includes a property visited with a value of false.

function makeCountry(name, continent) {
  return {
    name: name,
    continent: continent,
    getDescription: function () {
      return this.name + ' is located in ' + this.continent + '.';
    },
    visited: false,
  };
}


// 4. This situation seems a bit problematic, though. Suppose we want to add a country that we've already visited. Alter the factory function to use an optional visited parameter with a default value of false.

function makeCountry(name, continent, visited = false) {
  return {
    name: name,
    continent: continent,
    getDescription: function () {
      return this.name + ' is located in ' + this.continent + '.';
    },
    visited: visited,
  };
}


// 5. Let's add a method to our country objects that lets us visit them. Implement a method visitCountry that sets the visited property to true.

function makeCountry(name, continent, visited = false) {
  return {
    name: name,
    continent: continent,
    getDescription: function () {
      return this.name + ' is located in ' + this.continent + '.' +
        ' I ' + (this.visited ? 'have' : 'haven\'t' ) + ' visited ' + this.name + '.' ;
    },
    visited: visited,
    visitCountry: function () { this.visited = true; },
  };
}


// 6. Finally, let's update our getDescription function to reflect the visited data. Assuming that canada.visited is false, your code should look like this:

console.log(canada.getDescription()); // "Canada is located in North America. I haven't visited Canada."
canada.visitCountry();
console.log(canada.getDescription()); // "Canada is located in North America. I have visited Canada."
