import { expect } from 'chai';
import TripInfo from '../src/userTripsAPI';

describe('tripData', () => {
  let tripData, tripStats, destinationData
  
      beforeEach(() => {
      destinationData = [{
        "id": 17,
        "destination": "Jaipur, India",
        "estimatedLodgingCostPerDay": 30,
        "estimatedFlightCostPerPerson": 1200,
        "image": "https://images.unsplash.com/photo-1534758607507-754e582adfa4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80",
        "alt": "a courtyard with trees and mountain in the distance"
      },
      {
        "id": 19,
        "destination": "Quito, Ecuador",
        "estimatedLodgingCostPerDay": 60,
        "estimatedFlightCostPerPerson": 500,
        "image": "https://images.unsplash.com/photo-1501684691657-cf3012635478?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2089&q=80",
        "alt": "a city at night with cloudy, snowy mountains in the distance"
      },
      {
        "id": 35,
        "destination": "Anchorage, Alaska",
        "estimatedLodgingCostPerDay": 200,
        "estimatedFlightCostPerPerson": 100,
        "image": "https://images.unsplash.com/photo-1539545547102-90ae2c140089?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80",
        "alt": "man riding on kayak surrounded by mountains"
      },
      {
        "id": 39,
        "destination": "Porto, Portugal",
        "estimatedLodgingCostPerDay": 995,
        "estimatedFlightCostPerPerson": 90,
        "image": "https://images.unsplash.com/photo-1564644929137-34b018daf461?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1778&q=80",
        "alt": "looking over the water on to a city on a hill"
      },
      {
        "id": 49,
        "destination": "Castries, St Lucia",
        "estimatedLodgingCostPerDay": 650,
        "estimatedFlightCostPerPerson": 90,
        "image": "https://images.unsplash.com/photo-1524478075552-c2763ea171b8?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1502&q=80",
        "alt": "aerial photography of rocky mountain under cloudy sky"
      },
      {
        "id": 50,
        "destination": "Hobart, Tasmania",
        "estimatedLodgingCostPerDay": 1400,
        "estimatedFlightCostPerPerson": 75,
        "image": "https://images.unsplash.com/photo-1506982724953-b1fbe939e1e3?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80",
        "alt": "person sitting on brown rock in front of small body of water"
      }]
      tripStats = [{
            "id": 1,
            "userID": 1,
            "destinationID": 49,
            "travelers": 1,
            "date": "2022/09/16",
            "duration": 8,
            "status": "approved",
            "suggestedActivities": []
          },
          {
            "id": 2,
            "userID": 35,
            "destinationID": 25,
            "travelers": 5,
            "date": "2022/10/04",
            "duration": 18,
            "status": "approved",
            "suggestedActivities": []
          }, {
            "id": 3,
            "userID": 3,
            "destinationID": 22,
            "travelers": 4,
            "date": "2022/05/22",
            "duration": 17,
            "status": "approved",
            "suggestedActivities": []
          }, {
            "id": 4,
            "userID": 43,
            "destinationID": 14,
            "travelers": 2,
            "date": "2022/02/25",
            "duration": 10,
            "status": "approved",
            "suggestedActivities": []
          }, {
            "id": 5,
            "userID": 42,
            "destinationID": 29,
            "travelers": 3,
            "date": "2022/04/30",
            "duration": 18,
            "status": "approved",
            "suggestedActivities": []
          }, {
            "id": 6,
            "userID": 1,
            "destinationID": 35,
            "travelers": 3,
            "date": "2022/06/29",
            "duration": 9,
            "status": "approved",
            "suggestedActivities": []
          }, {
            "id": 7,
            "userID": 1,
            "destinationID": 17,
            "travelers": 5,
            "date": "2022/5/28",
            "duration": 20,
            "status": "approved",
            "suggestedActivities": []
          }, {
            "id": 8,
            "userID": 1,
            "destinationID": 39,
            "travelers": 6,
            "date": "2022/02/07",
            "duration": 4,
            "status": "approved",
            "suggestedActivities": []
          }, {
            "id": 9,
            "userID": 1,
            "destinationID": 19,
            "travelers": 5,
            "date": "2022/12/19",
            "duration": 19,
            "status": "approved",
            "suggestedActivities": []
          }, {
            "id": 10,
            "userID": 9,
            "destinationID": 50,
            "travelers": 6,
            "date": "2022/07/23",
            "duration": 17,
            "status": "approved",
            "suggestedActivities": []
          }]
          tripData = new TripInfo(tripStats, destinationData)
      })
      it('should be a function', () => {
        expect(TripInfo).to.be.a('function');
      });
    
      it('Should be an instance of tripData', () => {
        expect(tripData).to.be.an.instanceOf(TripInfo)
      })
      it('Should be able to target by userID', () => {
        expect(tripData.findUserTrips(1)).to.deep.equal([{
          "id": 1,
          "userID": 1,
          "destinationID": 49,
          "travelers": 1,
          "date": "2022/09/16",
          "duration": 8,
          "status": "approved",
          "suggestedActivities": []
        },
        {
          "id": 6,
          "userID": 1,
          "destinationID": 35,
          "travelers": 3,
          "date": "2022/06/29",
          "duration": 9,
          "status": "approved",
          "suggestedActivities": []
        }, {
          "id": 7,
          "userID": 1,
          "destinationID": 17,
          "travelers": 5,
          "date": "2022/5/28",
          "duration": 20,
          "status": "approved",
          "suggestedActivities": []
        }, {
          "id": 8,
          "userID": 1,
          "destinationID": 39,
          "travelers": 6,
          "date": "2022/02/07",
          "duration": 4,
          "status": "approved",
          "suggestedActivities": []
        }, {
          "id": 9,
          "userID": 1,
          "destinationID": 19,
          "travelers": 5,
          "date": "2022/12/19",
          "duration": 19,
          "status": "approved",
          "suggestedActivities": []
        }])
      })
      it('Should eb able to find where the user went', () => {
        expect(tripData.getAllTimePerNight(1)).to.equal(12720)
      })
      it('Should eb able to find where the user went', () => {
        expect(tripData.getAllTimeFlight(1)).to.equal(18860)
      })
      it('Should eb able to find where the user went', () => {
      
        expect(tripData.allTimeSellerFee(1)).to.equal(3158)
      })
      it('Should be able to calculate a singular users total money spent', () => {
        expect(tripData.allTimeSpending(1)).to.equal(34738)
      })
  })
