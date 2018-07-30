// Assignment: Object Constructor Inheritance


// In this assignment, we will use object prototypes to create a number of custom object constructors. We will use each method of creating object prototypes to create constructors for different types of vehicles. Each constructor will ultimately inherit from the parent vehicle prototype, being child prototypes.

// Start by creating a function named Vehicle that will be used to create new vehicle objects. Define the Vehicle prototype to include properties for doors and wheels, both set to 4.

function Vehicle() {};

Vehicle.prototype.doors = 4;
Vehicle.prototype.wheels = 4;


// Create a new instance of the Vehicle object and assign it to a variable named sedan. Create a separate instance in a variable named coupe. Change the doors property on the coupe object to 2. Log the value of sedan.hasOwnProperty("doors") and coupe.hasOwnProperty("doors"). Note that once you change the object's property, it is no longer the property that came from the constructor. This can be useful for checking whether or not the state of an object has changed since created.

var sedan = new Vehicle();
var coupe = new Vehicle();

coupe.doors = 2;

console.log(sedan.hasOwnProperty('doors')); // false
console.log(coupe.hasOwnProperty('doors')); // true


// Create two new constructors for Coupe and Motorcycle. Have both inherit from the Vehicle prototype by setting the prototype of each to a new instance of Vehicle. Set their constructor properties back to their own named functions, which will allow instances of each constructor to display that it is a type of Coupe or Motorcycle rather than Vehicle. Create an instance of coupe and motorcycle and log both to verify they are different object types. Check the coupe's instanceof (coupe instanceof Coupe) against the Coupe, Vehicle, and Motorcycle constructors to see how the prototypes are inherited.

function Coupe() {};
function Motorcycle() {};

Coupe.prototype = new Vehicle();
Coupe.prototype.doors = 2;

Motorcycle.prototype = new Vehicle();
Motorcycle.prototype.doors = 0;
Motorcycle.prototype.wheels = 2;

Coupe.prototype.constructor = Coupe;
Motorcycle.prototype.constructor = Motorcycle;


myCoupe = new Coupe();
myBike = new Motorcycle();

console.log(myCoupe); // Coupe {}
console.log(myBike);  // Motorcycle {}

console.log(myCoupe instanceof Coupe); // true
console.log(myCoupe instanceof Vehicle); // true
console.log(myCoupe instanceof Motorcycle); // false


// Create a new constructor for Sedan. Set the constructor's prototype to be the return value of a call to Object.create, passing in the Vehicle prototype as the new object's prototype. Note that this works the same way as the previous method of creating classes that extend other classes. Checking the sedan's instanceof against both Sedan and Vehicle will return true.

function Sedan() {};

Sedan.prototype = Object.create(Vehicle.prototype);

myCar = new Sedan();

console.log(myCar instanceof Sedan); // true
console.log(myCar instanceof Vehicle); // true
