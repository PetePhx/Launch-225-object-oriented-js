// Practice Problems: Create Objects with Factory Functions

// 1. What are the two disadvantages of working with factory functions?

  // * Each object created by the factory function has a copy of the methods, which is wasteful in terms of space,

  // * After an object is created, there is no direct way of inspecting it to see where it is originated from.


// 2. Rewrite the code below to use object-literal syntax to generate the returned object:

function makeObj() {
  var obj = {};
  obj.propA = 10;
  obj.propB = 20;
  return obj;
}

function makeObj() {
  return {
    propA: 10,
    propB: 20,
  };
}


// 3. In the following problems, we'll be working through an invoice processing program. To get you started, we provide you with the following code that can process one invoice:

var invoice = {
  phone: 3000,
  internet: 6500,
};
var payment = {
  phone: 1300,
  internet: 5500,
};
var invoiceTotal = invoice.phone + invoice.internet;
var paymentTotal = payment.phone + payment.internet;
var remainingDue = invoiceTotal - paymentTotal;

console.log(paymentTotal);         // 6800
console.log(remainingDue);         // 2700

// To be able to process multiple invoices, we'll need to have a factory method that we can use to create invoices. The requirements for this factory function are the following:

  // 1. It returns an invoice object, with phone and internet properties, and a total method.

  // 2. The default value for the phone service is 3000, and the internet service is 5500 (in cents, of course!).

  // 3. The function takes an object argument with attributes to override the default values.

// Your implemented function should be able to work with the code below:

function createInvoice(services) {
  // implement the factory function here:
  if (!services) services = {};

  return {
    phone: services.phone || 3000,
    internet: services.internet || 5500,
    total: function () { return this.phone + this.internet; },
  };
}

function invoiceTotal(invoices) {
  var total = 0;
  var i;

  for (i = 0; i < invoices.length; i += 1) {
    total += invoices[i].total();
  }

  return total;
}

var invoices = [];
invoices.push(createInvoice());
invoices.push(createInvoice({
  internet: 6500,
}));

invoices.push(createInvoice({
  phone: 2000,
}));

invoices.push(createInvoice({
  phone: 1000,
  internet: 4500,
}));

console.log(invoiceTotal(invoices));             // 31000


// 4. Now let's build a factory function to create payments. The function can take an object argument in one of 3 forms:

  // * Payment for one service, such as: {internet: 1000} or {phone: 1000}

  // * Payment for both services, such as: {internet: 2000, phone: 1000}.

  // * Payment with just an amount property, such as: {amount: 2000}.

// and should return an object that has paid services, and a total method that returns the payment total. If the amount property is not present, this should return the sum of phone and internet services; if the amount property is present, just return the value of that property.

// Your code should work with the following:

function createPayment(services) {
  // implement the factory function here
  var obj = {...(services || {})};
  obj.total = function () {
    if (this.amount) return this.amount;
    return (this.phone || 0) + (this.internet || 0);
  };
  return obj;
}

function paymentTotal(payments) {
  var total = 0;
  var i;

  for (i = 0; i < payments.length; i += 1) {
    total += payments[i].total();
  }

  return total;
}

var payments = [];
payments.push(createPayment());
payments.push(createPayment({
  internet: 6500,
}));

payments.push(createPayment({
  phone: 2000,
}));

payments.push(createPayment({
  phone: 1000,
  internet: 4500,
}));

payments.push(createPayment({
  amount: 10000,
}));

console.log(paymentTotal(payments));      // 24000


// 5. Update your createInvoice function to make it possible to add payment(s) to invoices. Use the code below as a guideline:

function createInvoice(services) {
  // implement the factory function here:
  if (!services) services = {};
  var payments = [];

  return {
    phone: services.phone || 3000,
    internet: services.internet || 5500,
    total: function () { return this.phone + this.internet; },
    addPayment: function (num) { payments.push(num); },
    addPayments: function (arr) { payments.push(...arr); },
    amountDue: function () { return this.total() - paymentTotal(payments); },
  };
}

var invoice = createInvoice({
  phone: 1200,
  internet: 4000,
});

var payment1 = createPayment({
  amount: 2000
});

var payment2 = createPayment({
  phone: 1000,
  internet: 1200,
});

var payment3 = createPayment({
  phone: 1000,
});

invoice.addPayment(payment1);
invoice.addPayments([payment2, payment3]);
invoice.amountDue();       // this should return 0
