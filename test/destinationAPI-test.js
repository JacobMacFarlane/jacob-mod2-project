import { expect } from 'chai';
import DestinationInfo from "../src/destinationAPI"

describe('destinationData', () => {
let destinationData, destinationStats
 
beforeEach(() => {
    destinationStats = [{
        "id": 1,
        "destination": "Lima, Peru",
        "estimatedLodgingCostPerDay": 70,
        "estimatedFlightCostPerPerson": 400,
        "image": "https://images.unsplash.com/photo-1489171084589-9b5031ebcf9b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2089&q=80",
        "alt": "overview of city buildings with a clear sky"
      }, {
        "id": 2,
        "destination": "Stockholm, Sweden",
        "estimatedLodgingCostPerDay": 100,
        "estimatedFlightCostPerPerson": 780,
        "image": "https://images.unsplash.com/photo-1560089168-6516081f5bf1?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80",
        "alt": "city with boats on the water during the day time"
      },
      {
        "id": 3,
        "destination": "Sydney, Austrailia",
        "estimatedLodgingCostPerDay": 130,
        "estimatedFlightCostPerPerson": 950,
        "image": "https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80",
        "alt": "opera house and city buildings on the water with boats"
      },
      {
        "id": 4,
        "destination": "Cartagena, Colombia",
        "estimatedLodgingCostPerDay": 65,
        "estimatedFlightCostPerPerson": 350,
        "image": "https://images.unsplash.com/photo-1558029697-a7ed1a4b94c0?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1650&q=80",
        "alt": "boats at a dock during the day time"
      },
      {
        "id": 5,
        "destination": "Madrid, Spain",
        "estimatedLodgingCostPerDay": 150,
        "estimatedFlightCostPerPerson": 650,
        "image": "https://images.unsplash.com/photo-1543785734-4b6e564642f8?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80",
        "alt": "city with clear skys and a road in the day time"
      }];

      destinationData = new DestinationInfo(destinationStats)
})

    it('should be a function', () => {
    expect(DestinationInfo).to.be.a('function');
  });

  it('Should be an instance of UserData', () => {
    expect(destinationData).to.be.an.instanceOf(DestinationInfo)
  })
  it('Should be able to target a destination by id', () => {
    expect(destinationData.getDestinationById(5)).to.deep.equal({
        "id": 5,
        "destination": "Madrid, Spain",
        "estimatedLodgingCostPerDay": 150,
        "estimatedFlightCostPerPerson": 650,
        "image": "https://images.unsplash.com/photo-1543785734-4b6e564642f8?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80",
        "alt": "city with clear skys and a road in the day time"
      })
  })
  it('Should be able to return the destination name', () => {
    expect(destinationData.getDestinationName(5)).to.equal("Madrid, Spain")
  })
  it('Should return undefined given wrong id', () => {
    expect(destinationData.getDestinationName(6)).to.equal(undefined)
  })
  it('Should be able to return the destinations lodging cost per day', () => {
    expect(destinationData.getPricePerDay(5)).to.equal(150)
  })
  it('Should return undefined given wrong id', () => {
    expect(destinationData.getPricePerDay(6)).to.equal(undefined)
  })
  it('Should be able to return the flight cost per person', () => {
    expect(destinationData.getFlightCostPerPerson(5)).to.equal(650)
  })
  it('Should return undefined given wrong id', () => {
    expect(destinationData.getFlightCostPerPerson(6)).to.equal(undefined)
  })
  it('Should be able to calculate how much lodging would be over a given time', () => {
    let duration = ['2023/07/07', '2023/07/06', '2023/07/05', '2023/07/04', '2023/07/03', '2023/07/02',]
    expect(destinationData.getTotalLodgingDuration(2, duration.length)).to.equal(600)
  })
  it("Should be able to detemine how much a flight would be for each person", () => {
    let amountOfPeople = 2;
    expect(destinationData.getTotalFlightCost(4, amountOfPeople)).to.equal(700)
  })
  it("should be able to get the estimated Total before seller tax", () => {
    let duration = ['2023/07/07', '2023/07/06', '2023/07/05', '2023/07/04', '2023/07/03', '2023/07/02',]
    let amountOfPeople = 2;
    let estimateLodgingCost = destinationData.getTotalLodgingDuration(2, duration.length)
    let estimateFlightCost= destinationData.getTotalFlightCost(4, amountOfPeople)
    expect(destinationData.getBaseTotal(estimateLodgingCost, estimateFlightCost)).to.equal(1300)
  })
  it("should include a sellers fee", () => {
    let duration = ['2023/07/07', '2023/07/06', '2023/07/05', '2023/07/04', '2023/07/03', '2023/07/02',]
    let amountOfPeople = 2;
    let estimateLodgingCost = destinationData.getTotalLodgingDuration(2, duration.length)
    let estimateFlightCost= destinationData.getTotalFlightCost(4, amountOfPeople)
    expect(destinationData.getSellerFee(estimateLodgingCost, estimateFlightCost)).to.equal(130)
  })
  it("Should get the final cost", () => {
    let baseTotal = destinationData.getBaseTotal(600, 700)
    let sellerFee = destinationData.getSellerFee(600, 700)
    expect(destinationData.getEstimatedTotal(baseTotal, sellerFee)).to.equal(1430)
  })
})