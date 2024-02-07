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

*/

//////////////////
//callback hell
//sequence of ajax call or to say how to make which call is load first and which one is later
//or in laymen language i want to load pakistan snip after india one is loaded,lets see how it works
const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

const getCountryData = function (country) {
  const request = new XMLHttpRequest();
  request.open('GET', `https://restcountries.com/v2/name/${country}`);
  request.send();

  request.addEventListener('load', function () {
    const [data] = JSON.parse(this.responseText);
    console.log(data);
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
// getCountryData('United States of America');
// getCountryData('Pakistan');
// getCountryData('Italy');
