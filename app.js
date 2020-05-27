// inits classes
const storage = new Storage();
const ui = new UI();
const http = new HTTP();

// //Init Weather using Storage Locations if avialable
// const weatherLocation = storage.getLocationData();
// const weather = new Weather(weatherLocation.city, weatherLocation.state);
// //Get sored location data


// Get Weather on DOM Loan
document.addEventListener('DOMContentLoaded', () => {
    getNextLaunch();
    getUpcomingLaunches();
});

// Chevron click smoothscroll
document.querySelector('.fa-chevron-down').addEventListener('click', () => {
    ui.smoothScroll('.upcoming', 1000);
});


// Get next launch details
function getNextLaunch() {
    //call http api
    http.get('https://api.spacexdata.com/v3/launches/next')
        .then(response => {
            //log response 
            console.log(response);

            // Add launch details to UI
            ui.paintNextLaunchDetails(response);

            // Update Launch Countdown
            ui.updateLaunchCountdown(response.launch_date_local);
        })
        .catch(err => console.error(err));
}

// Get upcoming launches
function getUpcomingLaunches() {
    // call http apo
    http.get('https://api.spacexdata.com/v3/launches/upcoming')
        .then(response => {
            //log response
            //console.log(response);
            response.forEach(element => {
                console.log(element);

                // Add launch to list
                ui.addUpcomingLaunchToList(element);
            });

        })
        .catch(err => console.log(err));
}

// // Change Location event
// document.getElementById('w-change-btn').addEventListener('click', (e) => {
//     const city = document.getElementById('city').value;
//     const state = document.getElementById('state').value;

//     //change location
//     weather.changeLocation(city, state);

//     // set location in local storage
//     storage.setLocationData(city, state);

//     getWeather();

//     $('#locModal').modal('hide');
// })

// //weather.changeLocation('Miami', 'FL');

// function getWeather() {
//     weather.getWeather()
//         .then(data => {
//             console.log(data)
//             ui.paint(data);
//         })
//         .catch(err => console.log(err))
// }