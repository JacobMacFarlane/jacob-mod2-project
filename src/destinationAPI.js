class DestinationInfo {
    constructor(destinationData) {
        this.destinationData = destinationData
    }
    getDestinationById = (id) => {
        
        return this.destinationData.find(destination => destination.id === id)
    }
    getDestinationName = (id) => {
        let thePlace = this.getDestinationById(id)
        if (!thePlace) {
            return undefined
        } else {
            return thePlace.destination
        }
    }
    getPricePerDay = (id) => {
        let thePlace = this.getDestinationById(id)
        if (!thePlace) {
            return undefined
        } else {
            return thePlace.estimatedLodgingCostPerDay
        }
    }
    getFlightCostPerPerson = (id) => {
        let thePlace = this.getDestinationById(id)
        if (!thePlace) {
            return undefined
        } else {
            return thePlace.estimatedFlightCostPerPerson
        }
    }
    getTotalLodgingDuration = (id, date) => {
        let thePlace = this.getDestinationById(id)
        if (!thePlace) {
            return undefined
        } else {
        return thePlace.estimatedLodgingCostPerDay * date
        }
    }
    getTotalFlightCost = (id, amountOfPeople) => {
        let thePlace = this.getDestinationById(id)
        if (!thePlace) {
            return undefined
        } else {
            return this.getFlightCostPerPerson(id) * amountOfPeople
        }
    }
    getBaseTotal = (lodgeCost, flightCost) => {
        return lodgeCost + flightCost
    }
    getSellerFee =  (lodgeCost, flightCost) => {
        let baseTotal = lodgeCost + flightCost
        return baseTotal * .1
    }
    getEstimatedTotal = (baseTotal, sellerFee) => {
        return baseTotal + sellerFee
    }
}

module.exports = DestinationInfo;