class TripInfo {
    constructor(tripData, destinationData) {
        this.tripData = tripData
        this.destinationData = destinationData
    }
    
    findUserTrips = (userId) => {
        return this.tripData.filter((trip) => trip.userID === userId)
    }
    getAllTimePerNight = (userId) => {
        let userTrips =this.findUserTrips(userId)
        let perNightTotal = 0
        let userTripInfos = userTrips.map((trip) => {
            return {
            'userId': trip.userID,
               'destinationId': trip.destinationID,
               'travlerCount': trip.travelers,
               'duration': trip.duration
            }
        })
        this.destinationData.forEach((destination) => {
            userTripInfos.forEach((trip) => {
                if (trip.destinationId === destination.id) { 
                 perNightTotal += trip.duration * destination.estimatedLodgingCostPerDay
                }    
            })
        })
       return perNightTotal
    }
    getAllTimeFlight = (userId) => {
        let userTrips =this.findUserTrips(userId)
        let flightTotal = 0
        let userTripInfos = userTrips.map((trip) => {
            return {
               'userId': trip.userID,
               'destinationId': trip.destinationID,
               'travlerCount': trip.travelers,
               'duration': trip.duration
            }
        })
        this.destinationData.forEach((destination) => {
            userTripInfos.forEach((trip) => {
                if (trip.destinationId === destination.id) { 
                 flightTotal += (trip.travlerCount * destination.estimatedFlightCostPerPerson) * 2
                }    
            })
        })
       return flightTotal
    }
    allTimeSellerFee = (userID) => {
       let allTimePerNight = this.getAllTimePerNight(userID)
       let allTimeFlight = this.getAllTimeFlight(userID)
        return (allTimeFlight + allTimePerNight) * .10
    }
    allTimeSpending = (userId) => {
        let allTimePerNight = this.getAllTimePerNight(userId)
       let allTimeFlight = this.getAllTimeFlight(userId)
       let allTimeSeller = this.allTimeSellerFee(userId)
       return allTimeFlight + allTimePerNight + allTimeSeller
    }
   
}
module.exports = TripInfo