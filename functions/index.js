const functions = require("firebase-functions");
const cors = require("cors")({ origin: true });
const admin = require("firebase-admin");
const XMLHttpRequest = require("xhr2");

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//

const helloWorldFn = (req, res) => {
  res.status(200).send("Hello, Functions\n");
};

exports.helloWorld = functions.https.onRequest((request, response) => {
  const corsFn = cors;

  corsFn(request, response, () => {
    helloWorldFn(request, response);
  });
});

const seekUserFn = (request, response, user) => {
  //pagination example https://api.github.com/users/${user}/events?page=3
  const url = `https://api.github.com/users/${user}/events?page=1`;
  response.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  const xhr = new XMLHttpRequest();
  xhr.open("GET", url, true);
  xhr.send();
  console.log(request);
  xhr.onload = () => {
    let contributions = JSON.parse(xhr.responseText);
    if (xhr.status === 200) {
      console.log(contributions);
      response.status(200).send(contributions);
      //return contributions;
    } else {
      console.error(xhr.status);
      return xhr.status;
    }
  };
  /*
  fetch(fetchReq)
    .then((res) => res.json())
    .then((json) => {
      return json;
    })
    .catch((error) => console.log(error));
    */
  console.log("Finished, no return");
};

exports.seekUser = functions.https.onRequest((request, response) => {
  const user = request.query.user;
  console.log(user);
  const corsFn = cors;
  return corsFn(request, response, () => {
    return seekUserFn(request, response, user);
  });
});
