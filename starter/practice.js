const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

const renderCountry = function (data, className = '') {
  const html = `<article class="country  ${className}">
  <img class="country__img" src="${data.flag}" />
  <div class="country__data">
    <h3 class="country__name">${data.name}</h3>
    <h4 class="country__region">${data.region}</h4>
    <p class="country__row"><span>👫</span>${(
      +data.population / 1000000
    ).toFixed(1)}M people</p>
    <p class="country__row"><span>🗣️</span>${data.languages[0].name}</p>
    <p class="country__row"><span>💰</span>${data.currencies[0].name}</p>
  </div> </article>`;
  countriesContainer.insertAdjacentHTML('beforeend', html);
  countriesContainer.style.opacity = 1;
};
/*
//lets create array of two elements
//both elements are basically objects
function getUsers() {
  return [
    {
      username: 'john',
      email: 'john@test.com',
    },
    {
      username: 'jane',
      email: 'jane@test.com',
    },
  ];
}
function findUser(username) {
  const users = getUsers();
  const user = users.find(user => user.username == username);
  return user;
}
console.log(findUser('jane'));
//here we interacted with getUser data using findUser function
//here issue is that code in the findUser is synchronus and blocking
//here we trying to get data using findUser function and want to get data,which we now manually
//created  using getUser function

function getUsers() {
  let users = [];
  //
  setTimeout(() => {
    users = [
      {
        username: 'john',
        email: 'john@test.com',
      },
      {
        username: 'jane',
        email: 'jane@test.com',
      },
    ];
  }, 1000);
  return users;
}

function findUser(username) {
  const users = getUsers();
  const user = users.find(user => (user.username = username));
  return user;
}
console.log(findUser('john'));

//callback to deal with asynchronus
function getUsers(callback) {
  setTimeout(() => {
    callback([
      {
        username: 'john',
        email: 'john@test.com',
      },
      {
        username: 'jane',
        email: 'jane@test.com',
      },
    ]);
  }, 1000);
}
function findUser(username, callback) {
  getUsers(users => {
    const user = users.find(user => (user.username = username));
    callback(user);
  });
}
// console.log();


*/
/*
//AJAX==>allow us to communicate with remote web server in a async way
//with ajax calls,we can request data from web server dynamically
const request = new XMLHttpRequest();
// console.log(request);
request.open('GET', `https://restcountries.com/v2/name/Republic of India`);
request.send();
console.log('hello');

request.addEventListener('load', function () {
  //   console.log(request);
  //   this===request since in addeventlistener this points the variable on which we
  //added the event when we use anonymous function
  //   console.log(this);
  const [data] = JSON.parse(this.responseText);
  console.log(data);
  renderCountry(data);

  //second xml request
  const neighbour = data?.borders[0];
  const request2 = new XMLHttpRequest();
  request2.open('GET', `https://restcountries.com/v2/alpha/${neighbour}`);
  request2.send();
  request2.addEventListener('load', function () {
    // console.log(JSON.parse(request2.responseText));
    const data2 = JSON.parse(request2.responseText);
    console.log(data2);
    renderCountry(data2, 'neighbour');
  });
  // const [data2]=JSON.parde
});
*/

//lets learn about promise for asynchronus
//basically fetch is a function return a promise and helps to achieve
//then handles the promise and return a new promise as well
/*
fetch(`https://restcountries.com/v2/name/Republic of India`)
  .then(res => res.json())
  .then(data => {
    console.log(data);
    renderCountry(data[0])
  });

  
  //callback hell can be escape using fetch function
  
  fetch(`https://restcountries.com/v2/name/Republic of India`)
  .then(res => res.json())
  .then(data => {
    console.log(data);
    renderCountry(data[0]);
    const neighbour = data[0]?.borders[0];

    return fetch(`https://restcountries.com/v2/alpha/${neighbour}`);
  })
  .then(res => res.json())
  .then(data => {
    console.log(data);
    renderCountry(data, 'neighbour');
  });
  
  
  //lets handle if any promise failed

const renderError = function (msg) {
  countriesContainer.insertAdjacentText('beforeend', msg);
  countriesContainer.style.opacity = 1;
};

renderError('Error');

const getJSON = function (url, errorMsg = 'Something went wrong') {
  return fetch(url).then(response => {
    if (!response.ok) throw new Error(`${errorMsg}(${response.status})`);
    return response.json();
  });
};

const getCountryData = function (country) {
  fetch(`https://restcountries.com/v2/name/${country}`)
  .then(response => {
    console.log(response);
    if (!response.ok)
        throw new Error(`Country not found (${response.status})`);
      return response.json();
    })
    .then(data => {
      renderCountry(data[0]);
      const neigbhour = data[0].borders[0];
      if (!neigbhour) return;
      return fetch(`https://restcountries.com/v2/name/${country}`);
    })
    .then(res => res.json())
    .then(data => {
      console.log(data);
      renderCountry(data[0], 'neighbour');
    })
    .catch(err => {
      console.error(err);
      renderError(`Something went wrong ${err.message} Try again`);
    })
    .finally(() => {
      console.log(`har bhar aunga`);
    });
};

btn.addEventListener('click', function () {
  getCountryData('australia');
});


//error handling in fetch api

const getCountryData = function (country) {
  fetch(`https://restcountries.com/v2/name/${country}`)
  .then(response => {
      console.log(response);
      if (!response.ok) throw new Error(`Country not found ${response.status}`);
      return response.json();
    })
    .then(data => {
      console.log(data[0]);
      const neighbour = data[0].borders[0];
      if (!neighbour) throw new Error(`no border ,its alone wolf`);
      console.log(neighbour);
      return fetch(`https://restcountries.com/v2/alpha/${neighbour}`);
    })
    .then(res => res.json())
    .then(neigData => console.log(neigData))
    .catch(err => console.error(err))
    .finally(() => {
      console.log('har dum ayega');
    });
  };
  getCountryData('Republic of India');
  
  
  //lets learn event loop and much more
  console.log('Test starts');
  setTimeout(() => console.log('0 sec timer'), 0);
  Promise.resolve('Resolved promise 1 ').then(res => console.log(res));
  console.log('test end');
  
  //lets build promises
  //promise is the consructor function which prototype contains lot of build in methods
  //we creating a new object by using promise constructor functions
  //Promise constructor funciton has only one parameter[we call it executive function]
  
  //this is how we create a promise
  const lotteryPromise = new Promise(function (resolve, reject) {
  console.log('Lottery draw is happening');
  setTimeout(function () {
    if (Math.random() >= 0.5) {
      resolve('You won');
    } else {
      reject(new Error('You lose'));
    }
  }, 2000);
});
lotteryPromise.then(res => console.log(res)).catch(err => console.error(err));

//this is promisifying means converting callback based asyncronus to promise based behaviour

//promisifyig setTimeout

const wait = function (seconds) {
  return new Promise(function (resolve, reject) {
    setTimeout(resolve, seconds * 1000);
  });
};
wait(1)
  .then(() => {
    console.log(`1 second passed`);
    return wait(2);
  })
  .then(() => {
    console.log('2 second passed');
    return wait(3);
  })
  .then(() => {
    console.log('3 second passed');
    return wait(4);
  })
  .then(() => {
    console.log('4 second passed');
  });
  
  //callback hell and its soln
  setTimeout(() => {
    console.log('1 second passed');
    setTimeout(() => {
      console.log('2 second passed');
    });
  });
  
  
  
  
  //more shortcut to resolve and reject
Promise.resolve('abc').then(p => console.log(p));
Promise.reject(new Error('abc'))
  .then(p => console.log(p))
  .catch(err => console.error(err));

  */

//let promisifying geolocation api

// navigator.geolocation.getCurrentPosition(
//   // pos => console.log(pos),
//   err => console.error(err)
// );

//lets change into promise based

const getPosition = function () {
  return new Promise(function (resolve, reject) {
    navigator.geolocation.getCurrentPosition(
      // pos => resolve(pos)
      resolve,
      reject
      // err => reject(err)
    );
  });
};
//in more simple terms
getPosition().then(pos => console.log(pos));


///consuming promise