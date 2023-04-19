import { expect } from 'chai';
import UserInfo from "../src/userInfoAPI"

describe('userData', () => {
let userData, userStats
 
beforeEach(() => {
    userStats = [{
        "id": 1,
        "name": "Ham Leadbeater",
        "travelerType": "relaxer",
      }, {
        "id": 2,
        "name": "Rachael Vaughten",
        "travelerType": "thrill-seeker",
      }, {
        "id": 3,
        "name": "Sibby Dawidowitsch",
        "travelerType": "shopper",
      }, {
        "id": 4,
        "name": "Leila Thebeaud",
        "travelerType": "photographer",
      }, {
        "id": 5,
        "name": "Tiffy Grout",
        "travelerType": "thrill-seeker",
      }, {
        "id": 6,
        "name": "Laverna Flawith",
        "travelerType": "shopper",
      }, {
        "id": 7,
        "name": "Emmet Sandham",
        "travelerType": "relaxer",
      }, {
        "id": 8,
        "name": "Carlin O'Reilly",
        "travelerType": "history buff",
      }, {
        "id": 9,
        "name": "Natalee Deegin",
        "travelerType": "relaxer",
      }, {
        "id": 10,
        "name": "Rickie Jodlowski",
        "travelerType": "relaxer",
      }];

      userData = new UserInfo(userStats)
})
  it('should be a function', () => {
    expect(UserInfo).to.be.a('function');
  });

  it('Should be an instance of UserData', () => {
    expect(userData).to.be.an.instanceOf(UserInfo)
  })
  it('Should be able to target a singular user by id', () => {
    expect(userData.getUserById(10)).to.deep.equal({
        "id": 10,
        "name": "Rickie Jodlowski",
        "travelerType": "relaxer",
    })
  })
  it('Should return undefined if the user does not exist', () => {
    expect(userData.getUserById(12)).to.be.undefined
  })
  it('Should be able to target a singular users name given an id', () => {
    expect(userData.getUserFirstName(10)).to.equal("Rickie")
  })
  it('Should be return undefined given a wrong id', () => {
    expect(userData.getUserFirstName(12)).to.be.undefined
  })
});