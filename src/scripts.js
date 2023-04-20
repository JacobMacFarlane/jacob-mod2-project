import { fetchData } from './apiCalls'
import TripInfo from './userTripsAPI';
import UserInfo from './userInfoAPI';
import DestinationInfo from './destinationAPI';
import './css/styles.css';
import './images/turing-logo.png'



window.addEventListener('load', () => {
    createStartPage();
})


let allTrips, allTravelers, allDestinations, randomUserId
function createStartPage() {
    Promise.all([fetchData('travelers'), fetchData('trips'), fetchData('destinations')])
    .then(data => {
        allTravelers = new UserInfo(data[0].travelers)
        allTrips = new TripInfo(data[1].trips, data[2].destinations)
        allDestinations = new DestinationInfo(data[2].destinations)
    })
    .then(() => {
        randomUserId = generateRandomId() 
        console.log(randomUserId, 'id')
        renderUserInfo()
        renderPastTrips()
        // renderPendingTrips()
        // renderFavoriteTrips()
    })
}

function generateRandomId() {
    return Math.floor(Math.random() * allTravelers.userInfo.length)
}

function renderUserInfo() {
    const currentUser = allTravelers.getUserById(randomUserId)
    //will do innerHTML upon Fan Favorite trips to make it say
    //hello[userName] we think you might like these 3 trips
    //interpolate upon the three boxes to show 3 destinations they have not been
    console.log(currentUser, 'current User')
}
function renderPastTrips() {
    const currentUser = allTravelers.getUserById(randomUserId)
    //in here upon clicking the Previous trips button
    //all of the previous trips will be added into the display
    //clicking upcoming or pending should hide them
}
console.log('This is the JavaScript entry file - your code begins here.');
