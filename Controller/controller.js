var model = require('./../Models/model.js')
const fs = require('fs');


var methods = {}

methods.login = function (email, password) {
  return model.fun.login(email).then(function (result) {
    if (password === result.password) {
      return Promise.resolve({
        "username": result.name, "message": "loggedin"
      });
    } else {
      return Promise.reject({
        "username": result.name, "message": "Password incorrect"
      });
    }
  })
    .catch(error => {
      return Promise.reject({
        "message": "Verify email/password"
      });
    })

}

methods.signup = function (name, email, password, mobile) {

  return model.fun.signup(name, email, password, mobile).then(result => {
    return Promise.resolve({
      "message": "signedup"
    });
  })
    .catch(error => {
      console.log(error);
      return Promise.reject({
        "message": "Already signed up"
      });
    })
}

exports.cont = methods;
