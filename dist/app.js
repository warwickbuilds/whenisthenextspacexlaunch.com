// inits classes
const storage = new Storage();
const ui = new UI();
const http = new HTTP();

// DOM Load Event
document.addEventListener('DOMContentLoaded', () => {
  // getNextLaunch();
  getUpcomingLaunches();

  // Get Saved theme from LocalStorage and apply
  const savedTheme = localStorage.getItem('witnsl-theme') || 'auto';
  applyTheme(savedTheme);
  // set selection to saved option
  for (const optionElement of document.querySelectorAll('#theme option')) {
    optionElement.selected = savedTheme === optionElement.value;
  }

  document.querySelector('#theme').addEventListener('change', function () {
    localStorage.setItem('witnsl-theme', this.value);
    applyTheme(this.value);
  });
});

// Chevron click smoothscroll
document.querySelector('.down-arrow').addEventListener('click', () => {
  ui.smoothScroll('.upcoming', 1000);
});

// Get upcoming launches
function getUpcomingLaunches() {
  // call http api
  http
    .get('https://api.spacexdata.com/v3/launches/upcoming')
    .then((response) => {
      // Console Log response
      console.log(response);

      // Add next launch details to UI
      ui.paintNextLaunchDetails(response[0]);

      // Update next Launch Countdown
      ui.updateLaunchCountdown(response[0].launch_date_local);

      // Add each upcoming launch to list
      response.forEach((element) => {
        // Add launch to list
        ui.addUpcomingLaunchToList(element);
      });
    })
    .catch((err) => console.log(err));
}

function applyTheme(theme) {
  document.body.classList.remove('theme-auto', 'theme-light', 'theme-dark');
  document.body.classList.add(`theme-${theme}`);
}
