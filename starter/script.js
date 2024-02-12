'use strict';
/*
///////////////////////////////////////
////SYNCHRONOUS CODE
//when a code is synchronous it will execute line by line and each line waits for
//previous line to finish,
//issue here is that long running operations block code execution

///ASYNCHRNOUS CODE
//it executed after a task that runs in the "background" finishes.
//asynchronous code is ##non blocking##.
//execution doesnot wait for an asynchronous task to finish its work.
//this is coordination behavior of a program over a period of time
//callback function alone donot make code asynchronous!
//eventListener events alone doesnot make code asynchronous
//example being==>Geolocation Api or AJAX calls

///AJAX
//asynchronous javascript and xml==allow us to communicate with remote web servers
//in an asynchronous way.with AJAX calls,we can request data from web servers dynamically

//API
//Application programming interface:piece of software that can be used by another
//piece of software in order to allow application to talk to each other
//countless types of api available in programming
//1.DOM API
//2.Geolocation API
//3.Own class API
//4."Online" API [using AJAX][just simply API][WEB API]--application running on a server.
//that receives requests for data,and sends back as response
//5.we can build our own web APIs(require back end development,eg with nodejs)
// or use 3rd party API
//API data format--xml(widely used in back days) and JSON used now a days
const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

const getCountryData = function (country) {
  const request = new XMLHttpRequest();
  request.open('GET', `https://restcountries.com/v2/name/${country}`);
  request.send();

  request.addEventListener('load', function () {
    const [data] = JSON.parse(this.responseText);
    const html = `<article class="country">
  <img class="country__img" src="${data.flag}" />
  <div class="country__data">
    <h3 class="country__name">${data.name}</h3>
    <h4 class="country__region">${data.region}</h4>
    <p class="country__row"><span>👫</span>${(
      +data.population / 1000000
    ).toFixed(1)}M people</p>
    <p class="country__row"><span>🗣️</span>${data.languages[0].name}</p>
    <p class="country__row"><span>💰</span>${data.currencies[0].name}</p>
  </div>
                </article>`;
    countriesContainer.insertAdjacentHTML('beforeend', html);
    countriesContainer.style.opacity = 1;
  });
};
getCountryData('Republic of India');
getCountryData('United States of America');
getCountryData('Pakistan');
getCountryData('Italy');

/*
///////////////////////
const getCountryData = function (country) {
  const request = new XMLHttpRequest();
  request.open('GET', `https://restcountries.com/v3.1/name/${country}`);
  request.send();
  // console.log(request.responseText);
  request.addEventListener('load', function () {
    //   console.log(this.responseText);
    const [dataTwo] = JSON.parse(this.responseText);
    console.log(dataTwo);

    const html = ` <article class="country">
    <img class="country__img" src="${dataTwo.flags.png}" />
    <div class="country__data">
      <h3 class="country__name">${dataTwo.name.official}</h3>
      <h4 class="country__region">${dataTwo.region}</h4>
      <p class="country__row"><span>👫</span>${(
        +dataTwo.population / 1000000
      ).toFixed(1)} People</p>
      <p class="country__row"><span>🗣️</span>${dataTwo.languages}</p>
      <p class="country__row"><span>💰</span>${dataTwo.currencies.name}</p>
    </div>
  </article>`;
    countriesContainer.insertAdjacentHTML('beforeend', html);
    countriesContainer.style.opacity = 1;
  });
};
getCountryData('india');
// getCountryData('portugal');
*/
//////////////////////////

///////////////////////////
/*
1.Interaction between client(browser) and web server==>when we try to access a web server
the browser which is our client sends a requests to the server and then server will then send back a 
response.That response contains the data or the web page that we requested.
this whole process known as request-response model or client-server architecture

...more deeper
1)https://restcountries.com/v2/name/.....
->this is the URL we access in the last video using XMLHttpRequest method
->here https which is meant to be  the protocol which is used to build connections
->then we have domain name which is restcountries.com here in this case
->/v2/ is the resource we accessing
here domain name is not the real address,its here just for the  simplicity
to access real name we need to use DNS which is Domain name server
the first step is browser makes a DNS request and then this (DNS-a special server) will then
simply match the web address of the URL to the server's real IP address[it all happens through your
internet server provider]
so one thing is here to understand is domain name is not the real address but DNS lookup the real 
IP address and then furthur step produces
now real IP address send back to the client(web browser) now finally we call it
https://104.27.142.8989:443
here middle one is IP adress
443 is basically the port number[can say sub address]
first step is wrap up
2)TCP/IP Connection==>once we have real IP address a TCP/IP connection is established btw the
browser and server and they are finally connected and it will connected for entire time that it takes 
to transfer all files of the website or all the data
TCP==>Transmission control protocol and IP=internet protocol
they are communication protocol tells exactly how data travels accross the web
they decide how exactly data transfer across the web
they decide how data move on the internet

//now we make a https request[hyper text transfer protocol]
after TCP/IP HTTP is another communication protocol 
communication protocol--a system of rules that allows two or more parties to communicate ,
here in the case of HTTP it allows client and web server  to communicate
and it works by sending requests and response messages from client to server and back


//////////////////
//callback hell
//sequence of ajax call or to say how to make which call is load first and which one is later
//or in laymen language i want to load pakistan snip after india one is loaded,lets see how it works
const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');
//
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

//////////i want  to call neighbour of frrst country called
const getCountryAndNeighbour = function (country) {
  //Ajax call:country 1
  const request = new XMLHttpRequest();
  request.open('GET', `https://restcountries.com/v2/name/${country}`);
  request.send();
  request.addEventListener('load', function () {
    const [data] = JSON.parse(this.responseText);
    renderCountry(data);

    /// Get neighbour country:country 2
    const neighbour = data.borders?.[0];
    if (!neighbour) return;

    //Ajax  call 2
    const request2 = new XMLHttpRequest();
    request2.open('GET', `https://restcountries.com/v2/alpha/${neighbour}`);
    request2.send();
    request2.addEventListener('load', function () {
      const data2 = JSON.parse(this.responseText);
      renderCountry(data2, 'neighbour');
    });
  });
};
// getCountryAndNeighbour('Republic of India');
getCountryAndNeighbour('russia');

//callback hell
setTimeout(() => {
  console.log('1 Second Passed');
  setTimeout(() => {
    console.log('2 Second Passed');
    setTimeout(() => {
      console.log('3 Second Passed');
      setTimeout(() => {
        console.log('4 Second Passed');
        setTimeout(() => {
          console.log('5 Second Passed');
        }, 1000);
      }, 1000);
    }, 1000);
  }, 1000);
}, 1000);

//const request=new XMLHttpRequest():
//request.open("GET","https://restcountries.com/v2/name/${country}");

//request.send()
/////
*/
/*
const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

//insertAdjacement
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
*/
////Consuming promises

// const getCountryData = function (country) {
//   fetch(`https://restcountries.com/v2/name/${country}`)
//     .then(function (response) {
//       console.log(response);
//       return response.json();
//     })
//     .then(function (data) {
//       console.log(data);
//       renderCountry(data[0]);
//     });
// };

// getCountryData('usa');

//callback helll is one thing we can escape using the promises
// const getCountryData = function (country) {
//   fetch(`https://restcountries.com/v2/name/${country}`)
//     .then(response => response.json())
//     .then(data => renderCountry(data[0]));
// };

// getCountryData('usa');
// getCountryData('Republic of india');
// getCountryData('Republic of india');

///////////////
//Topic--We learnt about what is synchronus and asynschronus programminh,method like eventlistener or say callback function to achieve async while
//furthur developement is AJAX ,here is another laymen term is API which we understood very well
//lets achieve AJAX
/*
const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

function renderItem(data, neighbour) {
  const html = `<article class="country ${neighbour ? 'neighbour' : ''}">
  <img class="country__img" src="${data.flag}" />
  <div class="country__data">
    <h3 class="country__name">${data.name}</h3>
    <h4 class="country__region">${data.region}</h4>
    <p class="country__row"><span>👫</span>${(
      data.population / 10000000
    ).toFixed(1)}M people</p>
    <p class="country__row"><span>🗣️</span>${data.languages[0].name}</p>
    <p class="country__row"><span>💰</span>${data.currencies[0].name}</p>
    </div>
    </article>`;
  countriesContainer.style.opacity = 1;
  countriesContainer.insertAdjacentHTML('beforeend', html);
}
*/
/*
 */
/*
const getCountryData = function (country) {
  const request = new XMLHttpRequest();
  request.open('GET', `https://restcountries.com/v2/name/${country}`);
  request.send();
  request.addEventListener('load', function () {
    const [data] = JSON.parse(request.responseText);
    renderItem(data);
  });
};
//now let us suppose we want to add two stacks now what to do
getCountryData('Republic of India');
getCountryData('usa');
//now we use something call callback hell to save ourself from issue of which one to load first or
//which one to load later,now let us do that easily
//let us do callbackhell

function getCountryAndNeighbour(country) {
  const request = new XMLHttpRequest();
  request.open('GET', `https://restcountries.com/v2/name/${country}`);
  request.send();
  //first country
  request.addEventListener('load', function () {
    const [data] = JSON.parse(this.responseText);
    renderItem(data);
    // console.log(this.responseText);
    //inside of first callback
    //another callback
    const neighbour = data.borders[0];
    console.log(neighbour);
    const request2 = new XMLHttpRequest();
    request2.open('GET', `https://restcountries.com/v2/alpha/${neighbour}`);
    request2.send();
    
    request2.addEventListener('load', function () {
      const neighbourIs = JSON.parse(this.responseText);
      renderItem(neighbourIs);
    });
  });
}

getCountryAndNeighbour('argentina');

*/
// function renderItem(data) {
//   const html = `<article class="country">
//   <img class="country__img" src="${data.flag}" />
//   <div class="country__data">
//     <h3 class="country__name">${data.name}</h3>
//     <h4 class="country__region">${data.region}</h4>
//     <p class="country__row"><span>👫</span>${(
//       data.population / 10000000
//     ).toFixed(1)}M people</p>
//     <p class="country__row"><span>🗣️</span>${data.languages[0].name}</p>
//     <p class="country__row"><span>💰</span>${data.currencies[0].name}</p>
//   </div>
// </article>`;
//   countriesContainer.style.opacity = 1;
//   countriesContainer.insertAdjacentHTML('beforeend', html);
// }

// this is all about ajax and its uses in asynchronus programming now
//lets come to promises which is furthur development in js introduced in ES6
/*
const request = fetch('https://restcountries.com/v2/name/Republic of India');
console.log(request);
*/

//promise is like the container(object in js) for thefuture value we getting by the asynchronus
//programming
//now understand a topic called the promise lifecycle
//since promise delivers the asynchronus result its value differ stage by stage and
//and its time sensitive
//pending stage denotes the promise before the future value is available
//while settles stage denotes when promise delivered its promise
///now understand two things here is that settled stage have two options either its fulfilled or rejected
//now if its rejected(maybe cause an error of anytime) and ifs its fulfilled (due to successfully code execution)
//these are different stage of promises and the this denote as The promise lifecycle
//we can handle these different stage of promises.
//promise settled only once so either its fulfilled or either its rejected

//here is another term to learn which is conusme promise means u have promise as a return value
//from the fetch function we saw above

//so its right to saying that first u build a promise using fetch api which returns promise and then u
//perfome some actions which we call consume promise

//let consume promises as we seen what it is theoritically
//here fetch is a function that returns promise
//promise have a then method to handlle settled promises[here in this promise we have response from api]
//now json method is the one who read the data came with the response when we call using promises
//now here is one thing to understand is that json itself return an asynchronus programme.means it
//also returns a promise as well[here is this promise we have data came with the response]
/*
const getCountryData = function (country) {
  fetch(`https://restcountries.com/v2/name/${country}`)
    .then(response => response.json())
    .then(data => {
      renderItem(data[0]);

      //lets check for neigbhours as well
      const neighbour = data[0].borders[0];
      if (!neighbour) return;
      //dont do this,this is callback hell again just return a promise in one promise and then consume it
      //in next iteration
      // return fetch(`https://restcountries.com/v2/name/${neighbour}`).
      //then(response => response.json()).then(neighbData => renderItem(neighbData[0]));
      return fetch(`https://restcountries.com/v2/name/${neighbour}`);
    })
    .then(response => response.json())
    .then(neighbData => renderItem(neighbData[0], 'neighbour'));
};
// getCountryData('usa');
*/
///big improvement here if i compare with ajax call,more readable
//see the replacement of callback hell its simply using optional chaining to make our task easier

////////////////////////////////
////////////////////////
//Handle rejected promises
///now we have two methods to handle rejected promise
//one is to pass second callback function in then method
//in then first callback function run when promise is fulfilled recall geolocation API
//it also has same functionality
//then works for both settled{first callback} and rejected(second callback)
//catch only for failed(rejected)
//finally always render whether its settled or failed
//fetch promise only reject when there is no internet connection but 404 error is
//any error cause promise to reject.
/*
const renderError = function (msg) {
  countriesContainer.insertAdjacentText('beforeend', msg);
  // countriesContainer.style.opacity = 1;
};

const getJSON = function (url, errorMsg = 'Something went wrong') {
  return fetch(url).then(response => {
    if (!response.ok) throw new Error(`${errorMsg} (${response.status})`);
    return response.json();
  });
};
*/
/*
const getCountryData = function (country) {
  fetch(`https://restcountries.com/v2/name/${country}`)
    .then(response => {
      console.log(response);
      if (!response.ok)
        throw new Error(`Country not found (${response.status})`);
      return response.json();
    })
    .then(data => {
      renderItem(data[0]);
      // const neighbour = data[0].borders[0];
      const neighbour = 'sdoifisd';
      if (!neighbour) return;
      return fetch(`https://restcountries.com/v2/name/${neighbour}`);
    })
    .then(response => {
      if (!response.ok)
      throw new Error(`Country not found (${response.status})`);
    return response.json();
  })
  .then(neighbData => renderItem(neighbData[0], 'neighbour'))
    .catch(err => {
      console.error(`${err}⚙⚙⚙⚙`);
      renderError(`Something went Wrong  ⚙⚙⚙⚙ ${err.message}.Try again!`);
    })
    .finally(() => {
      console.log('Evrytime you call it ,it will render');
      countriesContainer.style.opacity = 1;
    });
  };
  
  */
/*
const getCountryData = function (country) {
  //country 1
  getJSON(`https://restcountries.com/v2/name/${country}`, 'Country Not found')
    .then(data => {
      renderItem(data[0]);
      const neighbour = data[0].borders[0];
      console.log(neighbour);

      console.log(neighbour);
      if (!neighbour) throw new Error('No  Neighbour found!');

      //Country 2
      return getJSON(
        `  https://restcountries.com/v2/name/${neighbour}`,
        'Country Not Found'
      );
    })
    .then(data => renderItem(data))
    .catch(err => {
      console.error(`${err}`);
      renderError(`Something went wrong ${err.message} Try again`);
    })
    .finally(() => {
      countriesContainer.style.opacity = 1;
      console.log('finally method');
    });
};

*/
/* 
btn.addEventListener('click', function () {
  getCountryData('australia');
});

In this challenge you will build a function 
'whereAmI' which renders a country ONLY based on GPS coordinates. 
For that, you will use a second API to geocode coordinates.

Here are your tasks:

PART 1
1. Create a function 'whereAmI' which takes as inputs a latitude value (lat) and a longitude value (lng) (these are GPS coordinates, examples are below).
2. Do 'reverse geocoding' of the provided coordinates. Reverse geocoding means to convert 
coordinates to a meaningful location, like a city and country name. Use this API to do 
reverse geocoding: https://geocode.xyz/api.
The AJAX call will be done to a URL with this format: https://geocode.xyz/52.508,13.381?geoit=json. 
Use the fetch API and promises to get the data. Do NOT use the getJSON function we created, 
that is cheating 😉
3. Once you have the data, take a look at it in the console to see all the attributes that you 
recieved about the provided location. 
Then, using this data, log a messsage like this to the console: 'You are in Berlin, Germany'
4. Chain a .catch method to the end of the promise chain and log errors to the console
5. This API allows you to make only 3 requests per second. If you reload fast, you will get this error
 with code 403. 
This is an error with the request. Remember, fetch() does NOT reject the promise in this case.
 So create an error to reject the promise yourself, with a meaningful error message.

PART 2
6. Now it's time to use the received data to render a country. 
So take the relevant attribute from the geocoding API result, 
and plug it into the countries API that we have been using.
7. Render the country and catch any errors, 
just like we have done in the last lecture (you can even copy this code, no need to type the same code)

TEST COORDINATES 1: 52.508, 13.381 (Latitude, Longitude)
TEST COORDINATES 2: 19.037, 72.873
TEST COORDINATES 2: -33.933, 18.474

GOOD LUCK 😀
// 254100483103853273880x68242

function whereAmi(lat, lng) {
  fetch(
    `https://geocode.maps.co/reverse?lat=${lat}&lon=${lng}&api_key=65c6046e1baee391324490natfff805`
  )
    .then(response => {
      if (!response.ok)
        throw new Error(`Too many request at the same time ${response.status}`);
      return response.json();
    })
    .then(data => {
      const city = data.address.city;
      const country = data.address.country;
      console.log(`You are in ${city} city in ${country}`);
      return fetch(`https://restcountries.com/v2/name/${country}`);
    })
    .then(res => res.json())
    .then(data => renderItem(data[0]))
    .catch(err => console.error(err.message));
}
whereAmi(52.508, 13.381);
// whereAmi(19.037, 72.873);
// whereAmi(-33.933, 18.474);



function getCountryData(country) {
  fetch(`https://restcountries.com/v2/name/${country}`)
    .then(a => {
      console.log(a);
      return a.json();
    })
    .then(data => {
      console.log(data);
      const neigbhour = data[0].borders[0];
      // console.log(neigbhours);
      return neigbhour;
    })
    .then(a => console.log(a))
    .catch(err => console.error(err.message));
}

getCountryData('australia');
*/
//lets see how async works behind the scene
//why event loop and web api change the game

//////
//its a game of web api,callback,and callback queue that make sense to us



