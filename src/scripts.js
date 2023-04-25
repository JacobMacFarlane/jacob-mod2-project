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
var favTripList1 = document.getElementById('tripList1')
var favTripList2 = document.getElementById('tripList2')
var favTripList3 = document.getElementById('tripList3')
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
const loginModal = document.getElementById('loginModal')
let incrementer = 203
let allTrips, allTravelers, allDestinations, randomUserId, randomDestination1, randomDestination2, randomDestination3, chosenDestination, diffInDays, currentUserId









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

loginModal.addEventListener('submit', (e) => {
    e.preventDefault()
    const formInfo = new FormData(e.target);
    let username = formInfo.get('username')
    let password = formInfo.get('password')
    let userLogin = parseInt(username.replace('traveler', ""))
    if (password !== 'travel' || userLogin > 50 || userLogin < 0) {
        alert('Wrong username or password')
    } else {
        let splitPass = username.split('r')
        let userNum = splitPass[2]
        Promise.all([fetchData(`travelers/${userNum}`), fetchData('trips'), fetchData('destinations')])
        .then(data => {
                allTravelers = new UserInfo(data[0])
                allTrips = new TripInfo(data[1].trips, data[2].destinations)
                allDestinations = new DestinationInfo(data[2].destinations)
            })
            .then(() => {
                currentUserId = allTravelers.userInfo.id
                randomDestination1 = generateRandomDestination()
                randomDestination2 = generateRandomDestination()
                randomDestination3 = generateRandomDestination()
                renderCurrentFavTrips()
                renderCurrentPastTrips()
                displayPending()  
            })
        } 
    e.target.reset()
})
function renderCurrentFavTrips() {
    const currentUser = allTravelers.userInfo
    let randomThumbnail1 = allDestinations.getDestinationById(randomDestination1)
    let randomThumbnail2 = allDestinations.getDestinationById(randomDestination2)
    let randomThumbnail3 = allDestinations.getDestinationById(randomDestination3)
    let mainHeader = document.getElementById('mainHeader')
    
    mainHeader.innerText = `Hello ${currentUser.name}`

    favTripList1.innerHTML = `
    <a> <img src="${randomThumbnail1.image}" alt="${randomThumbnail1.alt}"class="thumbnail" id="favThumbnail1"></a>
          <div class="flexDiv">
            <div class="tripInfo" id="favTripInfo1">
            <a class="favLocation"> ${randomThumbnail1.destination}</a>
            <p class="pricePerNight"> Price Per Day:${randomThumbnail1.estimatedLodgingCostPerDay}$</p>
            <p class="roundTripPrice"> One Way Flight:${randomThumbnail1.estimatedFlightCostPerPerson}$</p>
            </div>
          </div>
    `
    favTripList2.innerHTML = `
    <a> <img src="${randomThumbnail2.image}" alt="${randomThumbnail2.alt}"class="thumbnail" id="favThumbnail1"></a>
          <div class="flexDiv">
            <div class="tripInfo" id="favTripInfo1">
            <a class="favLocation"> ${randomThumbnail2.destination}</a>
            <p class="pricePerNight"> Price Per Day:${randomThumbnail2.estimatedLodgingCostPerDay}$</p>
            <p class="roundTripPrice"> One Way Flight:${randomThumbnail2.estimatedFlightCostPerPerson}$</p>
            </div>
          </div>
    `
    favTripList3.innerHTML = `
    <a> <img src="${randomThumbnail3.image}" alt="${randomThumbnail3.alt}"class="thumbnail" id="favThumbnail1"></a>
          <div class="flexDiv">
            <div class="tripInfo" id="favTripInfo1">
            <a class="favLocation"> ${randomThumbnail3.destination}</a>
            <p class="pricePerNight"> Price Per Day:${randomThumbnail3.estimatedLodgingCostPerDay}$</p>
            <p class="roundTripPrice"> One Way Flight:${randomThumbnail3.estimatedFlightCostPerPerson}$</p>
            </div>
          </div>
    `
}
function displayPending() {
    const currentUser = allTravelers.userInfo
    let currentUserPast = allTrips.findUserTrips(currentUser.id)
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
   pendingGrid.innerHTML= ''
    uniqueTrips.forEach((trip) => {
        let basePrice = allDestinations.getBaseTotal((trip.destination.estimatedLodgingCostPerDay * trip.duration),(trip.destination.estimatedFlightCostPerPerson * trip.travelers))
        let sellerFee = allDestinations.getSellerFee((trip.destination.estimatedLodgingCostPerDay * trip.duration),(trip.destination.estimatedFlightCostPerPerson * trip.travelers))       
        if (!trip.id && !pendingGrid.innerHTML.includes(trip.destination.destination)) {
            pendingGrid.innerHTML += `
            <div class="tripCont pending">
                <div class="tripList">
                    <a> <img src="${trip.destination.image}" alt="${trip.destination.alt}"class="thumbnail"></a>
                    <div class="flexDiv">
                        <div class="tripInfo">
                            <a class="favLocation">${trip.destination.destination}</a>
                            <p class="pricePerNight totalPricePerNight"> Total Lodging Cost: ${allDestinations.getTotalLodgingDuration(trip.placeId, trip.duration)}$</p>
                            <p class="roundTripPrice">Total Flight Cost: ${allDestinations.getTotalFlightCost(trip.placeId, trip.travelers)}$</p>
                        </div>
                        <div class="tripPrice">
                            <p class="baseTotal"> Base Price: ${basePrice}$</p>
                            <p class="sellerFee"> 10% Seller Fee: ${sellerFee}$</p>
                            <p class="fullTotal"> Estimated Total: ${allDestinations.getEstimatedTotal(basePrice, sellerFee)}$</p>
                        </div>
                    </div>
                </div>
            </div>` 
        }
        })    
}

function renderCurrentPastTrips() {
    let currentUserPast = allTrips.findUserTrips(currentUserId)
    let approved = currentUserPast.filter((trip) => trip.status === 'approved')
    let trips = approved.map(trip => {
      return  {
        ['destination']: allDestinations.getDestinationById(trip.destinationID),
        ['placeId']: trip.destinationID,
        ['travelers']: trip.travelers,
        ['duration']: trip.duration
        }
    })
    
    tripGrid.innerHTML = ''
    trips.forEach((trip) => {
        let basePrice = allDestinations.getBaseTotal((trip.destination.estimatedLodgingCostPerDay * trip.duration),(trip.destination.estimatedFlightCostPerPerson * trip.travelers))
        let sellerFee = allDestinations.getSellerFee((trip.destination.estimatedLodgingCostPerDay * trip.duration),(trip.destination.estimatedFlightCostPerPerson * trip.travelers))
        if (!trip.id && !tripGrid.innerHTML.includes(trip.destination.destination)) {
        tripGrid.innerHTML += `
        <div class="tripCont pending">
            <div class="tripList">
                <a> <img src="${trip.destination.image}" alt="${trip.destination.alt}"class="thumbnail"></a>
                <div class="flexDiv">
                    <div class="tripInfo">
                        <a class="favLocation">${trip.destination.destination}</a>
                        <p class="pricePerNight totalPricePerNight"> Total Lodging Cost: ${allDestinations.getTotalLodgingDuration(trip.placeId, trip.duration)}$</p>
                        <p class="roundTripPrice">Total Flight Cost: ${allDestinations.getTotalFlightCost(trip.placeId, trip.travelers)}$</p>
                    </div>
                <div class="tripPrice">
                    <p class="baseTotal"> Base Price: ${basePrice}$</p>
                    <p class="sellerFee"> 10% Seller Fee: ${sellerFee}$</p>
                    <p class="fullTotal"> Estimated Total: ${allDestinations.getEstimatedTotal(basePrice, sellerFee)}$</p>
                </div>
            </div>
        </div>
        `
        allTimeMoney.innerText = `${allTrips.allTimeSpending(currentUserId)} Dollars`
        allTimeLodging.innerText = `${allTrips.getAllTimePerNight(currentUserId)} Dollars`
        allTimeFlight.innerText = `${allTrips.getAllTimeFlight(currentUserId)} Dollars`
        allTimeSeller.innerText = `${allTrips.allTimeSellerFee(currentUserId)} Dollars`
        }
    })
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
        userID: currentUserId,
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
            displayPending()
        })
    })
    e.target.reset()
})

function generateRandomDestination() {
    return Math.floor(Math.random() * allDestinations.destinationData.length)
}


console.log('This is the JavaScript entry file - your code begins here.');
