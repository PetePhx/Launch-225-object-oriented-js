// Pseudo-Classical Pattern for Object Creation

var Point = function(x, y) {  // constructor for setting states
  this.x = x || 0;
  this.y = y || 0;
};

Point.prototype.onXAxis = function() {  // shared behaviors in constructor's .prototype
  return this.y === 0;
};

Point.prototype.onYAxis = function() {
  return this.x === 0;
};

Point.prototype.distanceToOrigin = function() {
  return Math.sqrt((this.x * this.x) + (this.y * this.y));
};

var pointA = new Point(30, 40);         // use new to create objects
var pointB = new Point(20);

pointA instanceof Point;                // use instanceof to check type
pointB instanceof Point;

pointA.distanceToOrigin();              // 50
pointB.onXAxis();                       // true


// OBJECTS LINKING OTHER OBJECTS -- OLOO

var Point = {                       // capitalized name for the prototype as a convention
  x: 0,                             // default value defined on the prototype
  y: 0,

  onXAxis: function() {             // shared methods defined on the prototype
    return this.y === 0;
  },

  onYAxis: function() {
    return this.x === 0;
  },

  distanceToOrigin: function() {
    return Math.sqrt((this.x * this.x) + (this.y * this.y));
  },

  init: function(x, y) {            // optional init method to set states
    this.x = x;
    this.y = y;
    return this;
  },
};

var pointA = Object.create(Point).init(30, 40);
var pointB = Object.create(Point);

Point.isPrototypeOf(pointA);        // use isPrototypeOf to check type
Point.isPrototypeOf(pointB);

pointA.distanceToOrigin();          // 50
pointB.onXAxis();                   // true
