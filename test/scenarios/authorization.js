var register = require("../api/support/register.js");
var auth = require("../api/support/auth.js");
var users = require("../api/support/users.js");

var chai = require("chai");
chai.should();
chai.use(require('chai-things'));

describe("Authorization workflow", function(){
  it("should allow a user to register, login and get list of all the polls",itShouldAllowToRegisterLoginAndGetTheListOfAllThePolls);
  it("should not allow a user that is not authenticated to get the list of all polls",itShouldNotAllowAUuserThatIsNotAuthenticatedToGetTheListOfPolls);
  it("should not allow a user with a fake JSON Web Token to get the list of all polls",itShouldNotAllowAUserWithFakeJSONWebTokenToGetTheListOfAllPolls);
})
function itShouldAllowToRegisterLoginAndGetTheListOfAllThePolls(){
  var user = register.generateUser();
  var credentials = {
    username: user.username,
    password: user.password
  }
  return register.register(user)
      .then(function(response){
        return auth.auth(credentials);
      })
      .then(function(response){
        var jsonWebToken = response.body;
        return users.getPolls(jsonWebToken);
      })
      .then(function(response){
        response.status.should.equal(200);
        response.body.should.be.an("array");
      })
}

function itShouldNotAllowAUuserThatIsNotAuthenticatedToGetTheListOfPolls(){
  return users.getPolls()
      .then(function(response){
        response.status.should.equal(401);
      });
}

function itShouldNotAllowAUserWithFakeJSONWebTokenToGetTheListOfAllPolls)(){
  return users.getPolls("thisisafakejsonwebtoken")
      .then(function(response){
        response.status.should.equal(401);
      });
}
