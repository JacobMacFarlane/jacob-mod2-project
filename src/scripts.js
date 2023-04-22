import { fetchData, newTrip } from './apiCalls'
import TripInfo from './userTripsAPI';
import UserInfo from './userInfoAPI';
import DestinationInfo from './destinationAPI';
import dayjs from 'dayjs';

import './css/styles.css';
import './images/turing-logo.png'



var favTripInfo1 = document.getElementById('favTripInfo1')
var favThumbnail1 = document.getElementById('favThumbnail1')
var favTripInfo2 = document.getElementById('favTripInfo2')
var favThumbnail2 = document.getElementById('favThumbnail2')
var favTripInfo3 = document.getElementById('favTripInfo3')
var favThumbnail3 = document.getElementById('favThumbnail3')
var tripGrid = document.getElementById('pastTrips')
var pendingGrid = document.getElementById('pendingTrips')
var allTimeMoney = document.getElementById('allTimeMoney')
var allTimeLodging = document.getElementById('allTimeMoneyOnLodging')
var allTimeFlight = document.getElementById('allTimeMoneyOnFlights')
var allTimeSeller = document.getElementById('allTimeMoneyOnSeller')
var pendingButton = document.getElementById('pendingButton')
var previousButton = document.getElementById('previousButton')
var modalForm = document.getElementById('modalSubmit')
var modalClose = document.getElementById('close-button')
const openModalButtons = document.querySelectorAll('[data-modal-target]')
const closeModalButtons = document.querySelectorAll('[data-close-button]')
const overlay = document.getElementById('overlay')
let incrementer = 203





window.addEventListener('load', () => {
    createStartPage()
})



openModalButtons.forEach(button => {
  button.addEventListener('click', () => {
    const modal = document.querySelector(button.dataset.modalTarget)
    openModal(modal)
  })
})

overlay.addEventListener('click', () => {
  const modals = document.querySelectorAll('.modal.active')
  modals.forEach(modal => {
    closeModal(modal)
  })
})

closeModalButtons.forEach(button => {
  button.addEventListener('click', () => {
    const modal = button.closest('.modal')
    closeModal(modal)
  })
})

function openModal(modal) {
  if (modal == null) return
  modal.classList.add('active')
  overlay.classList.add('active')
}

function closeModal(modal) {
  if (modal == null) return
  modal.classList.remove('active')
  overlay.classList.remove('active')
}

previousButton.addEventListener('click', () => {
    hideGrid('previous')
})
pendingButton.addEventListener('click', () => {
    hideGrid('pending')
})

function hideGrid(grid) {
    if (grid === 'pending') {
        tripGrid.classList.add('hidden')
        pendingGrid.classList.remove('hidden')
    } else if (grid === 'previous') {
        tripGrid.classList.remove('hidden')
        pendingGrid.classList.add('hidden')
    }
}
function increment(item) {
    item++
    return item
}
modalForm.addEventListener('submit', (e) => {
    e.preventDefault();
    let startID = allTrips.tripData.sort((a, b) => b.id - a.id)
    let incrementThis = startID[0].id
    incrementThis++
    const formInfo = new FormData(e.target);
    let selectElement = document.getElementById("destinations");
    let selectedOption = selectElement.options[selectElement.selectedIndex];
    let selectedValue = selectedOption.value;
    chosenDestination = allDestinations.destinationData.find(destination => destination.destination === selectedValue)
    let str = formInfo.get('trip-start')
    let correctFormat = str.replace(/-/g, '/')
    let date1Str = formInfo.get('trip-start')
    let date2Str = formInfo.get('trip-end')
    let date1 = new Date(date1Str)
    let date2 = new Date(date2Str)
    let day1 = dayjs(date1)
    let day2 =dayjs(date2)
    diffInDays = day2.diff(day1, 'day')
    let correctTrav = parseInt(formInfo.get('amountPeople'))
    const newTripObj = {
        id: incrementThis,
        userID: randomUserId,
        destinationID: chosenDestination.id,
        travelers: correctTrav,
        date: correctFormat,
        duration: diffInDays,
        status: 'pending',
        suggestedActivities: []
    }
    Promise.all([newTrip(newTripObj)])
    .then(() => {
        fetchData('trips')
        .then(updatedTrip => {
            allTrips = new TripInfo(updatedTrip.trips)
        })
        .then(() => {
            closeModal(modalClose)
            hideGrid('pending')
            // closePendingTrips()
            displayPending()
            renderPastTrips()
        })
    })
    e.target.reset()
 
})

  
let allTrips, allTravelers, allDestinations, randomUserId, randomDestination1, randomDestination2, randomDestination3, chosenDestination, diffInDays
function createStartPage() {
    Promise.all([fetchData('travelers'), fetchData('trips'), fetchData('destinations')])
    .then(data => {
        allTravelers = new UserInfo(data[0].travelers)
        allTrips = new TripInfo(data[1].trips, data[2].destinations)
        allDestinations = new DestinationInfo(data[2].destinations)
    })
    .then(() => {
        randomUserId = generateRandomId() 
        randomDestination1 = generateRandomDestination()
        randomDestination2 = generateRandomDestination()
        randomDestination3 = generateRandomDestination()
        renderFavTrips()
        renderPastTrips()
        renderAllTime()
        // renderPendingTrips()
        // renderFavoriteTrips()
    })
}

function generateRandomId() {
    return Math.floor(Math.random() * allTravelers.userInfo.length)
}
function generateRandomDestination() {
    return Math.floor(Math.random() * allDestinations.destinationData.length)
}
function tripIncrementer() {
    return incrementer++
}
function renderFavTrips() {
    const currentUser = allTravelers.getUserById(randomUserId)
    let randomThumbnail1 = allDestinations.getDestinationById(randomDestination1)
    let randomThumbnail2 = allDestinations.getDestinationById(randomDestination2)
    let randomThumbnail3 = allDestinations.getDestinationById(randomDestination3)
    //will do innerHTML upon Fan Favorite trips to make it say
    //hello[userName] we think you might like these 3 trips
    //interpolate upon the three boxes to show 3 destinations they have not been
    favThumbnail1.src = randomThumbnail1.image
    favTripInfo1.innerHTML = `
    <a href="" class="favLocation">${randomThumbnail1.destination}</a>
    <p class="pricePerNight"> Price Per Day:${randomThumbnail1.estimatedLodgingCostPerDay}$</p>
    <p class="roundTripPrice"> One Way Flight:${randomThumbnail1.estimatedFlightCostPerPerson}$</p>`
    favThumbnail2.src = randomThumbnail2.image
    favTripInfo2.innerHTML = `
    <a href="" class="favLocation">${randomThumbnail2.destination}</a>
    <p class="pricePerNight"> Price Per Day:${randomThumbnail2.estimatedLodgingCostPerDay}$</p>
    <p class="roundTripPrice"> One Way Flight${randomThumbnail2.estimatedFlightCostPerPerson}$</p>`
    favThumbnail3.src = randomThumbnail3.image
    favTripInfo3.innerHTML = `
    <a href="" class="favLocation">${randomThumbnail3.destination}</a>
    <p class="pricePerNight"> Price Per Day: ${randomThumbnail3.estimatedLodgingCostPerDay}$</p>
    <p class="roundTripPrice"> One Way Flight: ${randomThumbnail3.estimatedFlightCostPerPerson}$</p>`

}
// function closePendingTrips() {
//     while (tripGrid.firstChild) {
//         tripGrid.removeChild(tripGrid.firstChild)
//     }
// }
function renderPastTrips() {
    const currentUser = allTravelers.getUserById(randomUserId)
    let currentUserPast = allTrips.findUserTrips(randomUserId)
    let approved = currentUserPast.filter((trip) => trip.status === 'approved')
    let trips = approved.map(trip => {
      return  {
        ['destination']: allDestinations.getDestinationById(trip.destinationID),
        ['placeId']: trip.destinationID,
        ['travelers']: trip.travelers,
        ['duration']: trip.duration
        }
    })
    // closePendingTrips()
    trips.forEach((trip) => {
        if (!trip.id && !tripGrid.innerHTML.includes(trip.destination.destination)) {
        tripGrid.innerHTML += `
        <div class="tripCont pending">
        <div class="tripList">
          <a href=""> <img src="${trip.destination.image}" class="thumbnail"></a>
          <div class="flexDiv">
            <div class="tripInfo">
              <a href="">${trip.destination.destination}</a>
              <p class="pricePerNight totalPricePerNight"> Total Lodging Cost: ${allDestinations.getTotalLodgingDuration(trip.placeId, trip.duration)}$</p>
              <p class="roundTripPrice">Total Flight Cost: ${allDestinations.getTotalFlightCost(trip.placeId, trip.travelers)}$</p>
            </div>
          </div>
        </div>
      </div>
        `
        allTimeMoney.innerText = `${allTrips.allTimeSpending(randomUserId)} Dollars`
        allTimeLodging.innerText = `${allTrips.getAllTimePerNight(randomUserId)} Dollars`
        allTimeFlight.innerText = `${allTrips.getAllTimeFlight(randomUserId)} Dollars`
        allTimeSeller.innerText = `${allTrips.allTimeSellerFee(randomUserId)} Dollars`
        }
    })
    //in here upon clicking the Previous trips button
    //all of the previous trips will be added into the display
    //clicking upcoming or pending should hide them
}

function renderAllTime() {
    const currentUser = allTravelers.getUserById(randomUserId)
}



function displayPending() {
    const currentUser = allTravelers.getUserById(randomUserId)
    let currentUserPast = allTrips.findUserTrips(randomUserId)
    let pending = currentUserPast.filter((trip) => trip.status === 'pending')
    let trips = pending.map(trip => {
      return  {
        ['destination']: allDestinations.getDestinationById(trip.destinationID),
        ['placeId']: trip.destinationID,
        ['travelers']: trip.travelers,
        ['duration']: trip.duration
        }
    })
   let uniqueTrips = []
   trips.forEach((trip) => {
    if (!uniqueTrips.some((t) => t.placeId === trip.placeId)) {
        uniqueTrips.push(trip)
    }
   })
   console.log(uniqueTrips, 'unique')
    uniqueTrips.forEach((trip) => {
        const existingTrip = document.querySelector(`.tripCont.pending[data-place-id="${trip.placeId}"]`);
       console.log(existingTrip, 'exist')
       console.log(trip, 'trip-ski')
       if (!trip.id && !pendingGrid.innerHTML.includes(trip.destination.destination)) {
            pendingGrid.innerHTML += `
            <div class="tripCont pending">
            <div class="tripList">
              <a href=""> <img src="${trip.destination.image}" class="thumbnail"></a>
              <div class="flexDiv">
                <div class="tripInfo">
                  <a href="">${trip.destination.destination}</a>
                  <p class="pricePerNight totalPricePerNight"> Total Lodging Cost: ${allDestinations.getTotalLodgingDuration(trip.placeId, trip.duration)}$</p>
                  <p class="roundTripPrice">Total Flight Cost: ${allDestinations.getTotalFlightCost(trip.placeId, trip.travelers)}$</p>
                </div>
              </div>
            </div>
          </div>` 
        }

        }) 
    //     pendingGrid.innerHTML += `
    //     <div class="tripCont pending">
    //     <div class="tripList">
    //       <a href=""> <img src="${trip.destination.image}" class="thumbnail"></a>
    //       <div class="flexDiv">
    //         <div class="tripInfo">
    //           <a href="">${trip.destination.destination}</a>
    //           <p class="pricePerNight totalPricePerNight"> Total Lodging Cost: ${allDestinations.getTotalLodgingDuration(trip.placeId, trip.duration)}$</p>
    //           <p class="roundTripPrice">Total Flight Cost: ${allDestinations.getTotalFlightCost(trip.placeId, trip.travelers)}$</p>
    //         </div>
    //       </div>
    //     </div>
    //   </div>`
    
}
console.log('This is the JavaScript entry file - your code begins here.');
