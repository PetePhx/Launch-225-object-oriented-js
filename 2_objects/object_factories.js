// Problems

var sedan = {
  speed: 0,
  rate: 8,
  accelerate: function () {
    this.speed += this.rate;
  },
};

// 1. Write a makeCar function that works as shown above.

function makeCar(rate) {
  return {
    speed: 0,
    rate: rate,
    accelerate: function () {
      this.speed += this.rate;
    },
  };
}

// 2. Use your new definition of makeCar to create a hatchback car whose rate of acceleration is 9 mph/s.

var newCar = makeCar(9);

// console.log(newCar);

// { speed: 0, rate: 9, accelerate: [Function: accelerate] }


// 3. Our application now needs to handle braking to slow down. Extend the code from problem 1 to handle specifying a braking rate for each car. Also, add a method that tells the car to apply the brakes for one second. It should work like this:

function makeCar(rate, brakeRate) {
  return {
    speed: 0,
    rate: rate,
    brakeRate: brakeRate,
    accelerate: function () {
      this.speed += this.rate;
    },
    brake: function () {
      this.speed -= this.brakeRate;
      if (this.speed < 0) this.speed = 0;
    },
  };
}

var sedan = makeCar(8, 6);
sedan.accelerate();
console.log(sedan.speed); // 8
sedan.brake();
console.log(sedan.speed); // 2
sedan.brake();
console.log(sedan.speed); // 0

// Notice how the car's speed doesn't go lower than 0.
