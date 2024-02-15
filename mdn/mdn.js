//asynchronus is a technique to potentially run long task and able to resposive
//some of the important functions are using fetch api(),getUserMedia()
//showOpenFilePicker()
/*
//lets understand sync properly
const name = "Miriam";
const greeting = `Hello,my name is ${name}`;
console.log(greeting);
//see its a line by line code
//another way to understand synch

function makeGreeting(name) {
  return `Hello,my name is ${name}`;
}
const name = "Miriam";
const greeting = makeGreeting(name);
console.log(greeting);

//here after greeting means caller has to wait for function to return and
//then execute later parts
*/

//now we have an issue,what if code is longer than expected
//lets take an example

const MAX_PRIME = 1000000;

function isPrime(n) {
  for (let i = 2; i <= Math.sqrt(n); i++) {
    if (n % i === 0) {
      return false;
    }
  }
  return n > 1;
}

const random = (max) => Math.floor(Math.random() * max);

function generatePrimes(quota) {
  const primes = [];
  while (primes.length < quota) {
    const candidate = random(MAX_PRIME);
    if (isPrime(candidate)) {
      primes.push(candidate);
    }
  }
  return primes;
}

// <label for="quota">Number of primes</label>
//     <input type="text" id="quota" name="quota" value="1000000" />

//     <button id="generate">generate primes</button>
//     <button id="reload">Reload</button>
const quota = document.querySelector("#quota");
const output = document.querySelector("#output");
const generate = document.querySelector("#generate");
console.log(generate);
const reload = document.querySelector("#reload");

generate.addEventListener("click", () => {
  const primes = generatePrimes(quota.value);
  console.log(primes);
});
