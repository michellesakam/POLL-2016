var Chance  = require("chance");
var chance = new Chance();
var chai = require("chai");
chai.should();
chai.use(require('chai-things'));

describe("The /users endpoint", funtion(){
  it("should allow an authenticated user to get the list of all the polls");
  it("should refuse to return the list of polls to an not authenticated user");
});
