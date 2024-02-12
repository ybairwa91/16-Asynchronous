//lets create array of two elements
//both elements are basically objects
/*
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
*/
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
findUser('john', console.log);
