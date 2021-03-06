// Project: Banking with Objects and Closures

// In this assignment, we'll build a small banking application and look at how we can use closures to control access to the application's data. We'll proceed through this assignment using some example code and then you will write code that satisfies it.

// 1. Create an object named account that represents a bank account. It should contain a balance property that stores the account's current balance.

var account = {
  balance: 0,
};


// 2. Add a deposit method to the account object that takes a single argument, the value of the deposit. Add the value of the deposit to the account's balance, and then return it.

account.deposit = function (amount) {
  this.balance += amount;
  return amount;
};

console.log(account.balance);
// 0
console.log(account.deposit(42));
// 42
console.log(account.balance);
// 42


// 3. Add a withdraw method to the account object that takes a single argument, the amount to withdraw. It should subtract the amount from the account's balance and return the amount subtracted.

// If the account contains less than the withdrawal amount, the method should limit the withdrawal to the amount available, and return the actual amount withdrawn. This should leave the account with a balance of 0.

account.withdraw = function (amount) {
  if (amount > this.balance) {
    var bal = this.balance;
    this.balance = 0;
    return bal;
  }

  this.balance -= amount;
  return amount;
};

account.deposit(58);

console.log(account.balance);
// 100
console.log(account.withdraw(19));
// 19
console.log(account.balance);
// 81

console.log(account.balance);
// 81
console.log(account.withdraw(91));
// 81
console.log(account.balance);
// 0


// 4. Each account should have a record of every deposit and withdrawal applied to it. To do this, add a property named transactions to account that contains an array of transactions, each of which is an object with type and amount properties.

var account = {
  balance: 0,
  transactions: [],
  deposit: function (amount) {
    this.balance += amount;
    this.transactions.push({type: 'deposit', amount: amount});
    return amount;
  },
  withdraw: function (amount) {
    if (amount > this.balance) {
      var bal = this.balance;
      this.balance = 0;
      this.transactions.push({type: 'withdrawal', amount: bal});
      return bal;
    }

    this.balance -= amount;
    this.transactions.push({type: 'withdrawal', amount: amount});
    return amount;
  },
};

console.log(account.deposit(23));
// 23
console.log(account.transactions);
// [{...}]
console.log(account.transactions[0]);
// {type: "deposit", amount: 23}


// 5. We want to create more than one account. Move the account creation code to a function named makeAccount that returns a new account object.

function makeAccount() {
  return {
    balance: 0,
    transactions: [],
    deposit: function (amount) {
      this.balance += amount;
      this.transactions.push({type: 'deposit', amount: amount});
      return amount;
    },
    withdraw: function (amount) {
      if (amount > this.balance) {
        var bal = this.balance;
        this.balance = 0;
        this.transactions.push({type: 'withdrawal', amount: bal});
        return bal;
      }

      this.balance -= amount;
      this.transactions.push({type: 'withdrawal', amount: amount});
      return amount;
    },
  };
}

var account = makeAccount();
console.log(account.deposit(15));
// 15
console.log(account.balance);
// 15
var otherAccount = makeAccount();
console.log(otherAccount.balance);
// 0


// 6. We also need an object to manage accounts: a bank. Create a function that returns an object that represents a bank. The bank should have a property named accounts that represents a list of accounts.

function makeBank() {
  return {
    accounts: [],
  };
}

var bank = makeBank();
console.log(bank.accounts);
// []


// 7. Add a new method named openAccount to the object returned by makeBank. It should create a new account, add it to the bank's accounts collection, and return the new account. Each new account should have a unique account number, starting at 101; each account number should be one greater than the previous account created.

function makeAccount(accNum) {
  return {
    number: accNum,
    balance: 0,
    transactions: [],
    deposit: function (amount) {
      this.balance += amount;
      this.transactions.push({type: 'deposit', amount: amount});
      return amount;
    },
    withdraw: function (amount) {
      if (amount > this.balance) {
        var bal = this.balance;
        this.balance = 0;
        this.transactions.push({type: 'withdrawal', amount: bal});
        return bal;
      }

      this.balance -= amount;
      this.transactions.push({type: 'withdrawal', amount: amount});
      return amount;
    },
  };
}

function makeBank() {
  return {
    accounts: [],
    nextAccNum: 101,
    openAccount: function () {
      var accNum = this.nextAccNum;
      this.nextAccNum += 1;
      var newAcc = makeAccount(accNum);
      this.accounts.push(newAcc);
      return newAcc;
    },
  };
}

var bank = makeBank();
var account = bank.openAccount();
console.log(account.number);
// 101
console.log(bank.accounts);
// [{...}]
// console.log(bank.accounts[0]);
// {number: 101, balance: 0, transactions: Array[0]}
var secondAccount = bank.openAccount();
console.log(secondAccount.number);
// 102


// 8. Add a new method to the bank object that transfers money from one account to another.

function makeBank() {
  return {
    accounts: [],
    nextAccNum: 101,
    transfer: function (source, dest, amount) {
      return dest.deposit(source.withdraw(amount));
    },
    openAccount: function () {
      var accNum = this.nextAccNum;
      this.nextAccNum += 1;
      var newAcc = makeAccount(accNum);
      this.accounts.push(newAcc);
      return newAcc;
    },
  };
}

var bank = makeBank();
var source = bank.openAccount();
console.log(source.deposit(10));
// = 10
var destination = bank.openAccount();
console.log(bank.transfer(source, destination, 7));
// = 7
console.log(source.balance);
// = 3
console.log(destination.balance);
// = 7


// 9. Change the code so that users can access the account balance, account number, and transactions list by calling methods, but not by directly accessing those properties.

function makeAccount(accNum) {
  var number = accNum; // <========
  var balance = 0; // <========
  var transactions = []; // <========
  return {
    number: function () { return number; }, // <========
    balance: function () { return balance; }, // <========
    transactions: function () { return transactions; }, // <========
    deposit: function (amount) {
      balance += amount;
      transactions.push({type: 'deposit', amount: amount});
      return amount;
    },
    withdraw: function (amount) {
      if (amount > balance) {
        var bal = balance;
        balance = 0;
        transactions.push({type: 'withdrawal', amount: bal});
        return bal;
      }

      balance -= amount;
      transactions.push({type: 'withdrawal', amount: amount});
      return amount;
    },
  };
}

var bank = makeBank();
var account = bank.openAccount();
console.log(account.balance());
// = 0
console.log(account.deposit(17));
// = 17
var secondAccount = bank.openAccount();
console.log(secondAccount.number());
// = 102
console.log(account.transactions());
// > [Object]


// 10. Change the code so that users can no longer access the list of accounts.

function makeBank() {
  var accounts = [];
  var nextAccNum = 101;
  return {
    transfer: function (source, dest, amount) {
      return dest.deposit(source.withdraw(amount));
    },
    openAccount: function () {
      var newAcc = makeAccount(nextAccNum);
      nextAccNum += 1;
      accounts.push(newAcc);
      return newAcc;
    },
  };
}

var bank = makeBank();
console.log(bank.accounts);
// undefined
