'use strict';

//////// BANKIST APP ///////////////////////////

// Data
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

const displayMovements = function (movements) {
  containerMovements.innerHTML = '';
  // .textContent = 0
  movements.forEach(function (mov, i) {
    const type = mov > 0 ? 'deposit' : 'withdrawal';

    const html = `
    <div class="movements__row">
      <div class="movements__type movements__type--${type}">${
      i + 1
    } ${type}</div>
      <div class="movements__value">${mov} €</div>
    </div>
    `;
    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};

const createUsernames = function (accs) {
  accs.forEach(function (acc) {
    acc.username = acc.owner
      .toLowerCase()
      .split(' ')
      .map(name => name[0])
      .join('');

    return acc.username;
  });
};
createUsernames(accounts);

//Event handler
let currentAccount; // out of func bcoz needed in other functions

btnLogin.addEventListener('click', function (e) {
  //Prevent form from submitting
  e.preventDefault();
  //find account and owner username should match the value entered
  currentAccount = accounts.find(
    acc => acc.username === inputLoginUsername.value
  );
  console.log(currentAccount);

  //? allows for pin to be read only if currentAccount exists. returns undefined
  if (currentAccount?.pin === Number(inputLoginPin.value)) {
    //input always string and needs to be turned to number
    
    //Display UI & Welcome message
    labelWelcome.textContent = `Welcome back, ${
      currentAccount.owner.split(' ')[0]
    }`;
    containerApp.style.opacity = 100;

    // Clear input fields
    inputLoginUsername.value = inputLoginPin.value = '';
    inputLoginPin.blur();
    //Display summary

    calcDisplaySummary(currentAccount);

    //Display movements
    displayMovements(currentAccount.movements);

    //Display balance
    calcDisplayBalance(currentAccount.movements);

    console.log('Loginpin');
  }
});

/////////////////////+LECTURES+////////////////////////////


const currencies = new Map([
  ['USD', 'United States dollar'],
  ['EUR', 'Euro'],
  ['GBP', 'Pound sterling'],
]);

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

/////////////////////////////////////////////////
const arr = ['a', 'b', 'c', 'd', 'e'];

movements.forEach(function (move, i) {
  if (move > 0) {
    //console.log(`you have made ${move} deposits`);
  } else {
    //console.log(`you have made  ${Math.abs(move)} Withdrawals`);
  }
});

//***********/ FILTER************************
const deposits = movements.filter(function (mov) {
  return mov > 0;
});

//Use for in filters
const depositFor = [];
  for (const mov of movements) if (mov > 0) depositFor.push(mov);
// console.log(depositFor);

const withdrawals = [];
  for (const mov of movements) if (mov < 0) withdrawals.push(mov);

// console.log(withdrawals);

//*************reduce* Adds array elements from accumilator initial***** */
// const balance = movements.reduce(function(acc, curr, i, arr){
//   console.log(`Interation ${i}:${curr}`)
//   return acc + curr;
// },0);
// console.log(balance)

//Simple arrow from above
const balance2 = movements.reduce((acc, curr) => acc + curr, 0);
// console.log(balance2);

// for loops in filter
let newReduce = 0;
  for (const mov of movements) newReduce += mov;

// console.log(newReduce);

//++++++Display balance on app+++++++++

const calcDisplayBalance = function (movements) {
  const balance = movements.reduce((acc, curr) => acc + curr, 0);
  labelBalance.textContent = `${balance}€`;
  labelBalance.textContent = `${balance}`;
};

// Max value with reduce
const max = movements.reduce((acc, mov) => {
  if (acc > mov) return acc;
  else return mov;
  }, movements[0]);
// console.log(max);

const calcDisplaySummary = function (acc) {
  const incomes = acc.movements
    .filter(mov => mov > 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumIn.textContent = `${incomes}€`;

  const out = acc.movements
    .filter(mov => mov < 0)
    .reduce((acc, curr) => acc + curr);
  labelSumOut.textContent = `${Math.abs(out)}€`;

  const interest = acc.movements
    .filter(mov => mov > 0)
    .map(deposit => (deposit * acc.interestRate) / 100)
    .filter(int => int >= 1) //includng only interests greater tha 1
    .reduce((acc, int) => acc + int, 0);
  labelSumInterest.textContent = `${interest}€`;
};


//Chaining....pipeline
const euroToUSD = 1.1;
const totalDepositsUSD = movements
  .filter(mov => mov > 0)
  .map(mov => mov * euroToUSD)
  .reduce((acc, mov) => acc + mov, 0);
console.log(totalDepositsUSD);
//labelSumIn.textContent = totalDepositsUSD.toFixed(2);
