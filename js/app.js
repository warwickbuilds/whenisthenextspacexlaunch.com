// inits classes
const storage = new Storage();
const ui = new UI();
const http = new HTTP();

// DOM Load Event
document.addEventListener('DOMContentLoaded', () => {
  // getNextLaunch();
  getUpcomingLaunches();

  // Get Saved theme from LocalStorage and apply
  const savedTheme = localStorage.getItem('witnsl-theme');
  if (savedTheme === null) {
    if (
      window.matchMedia &&
      window.matchMedia('(prefers-color-scheme: dark)').matches
    ) {
      // dark system mode
      savedTheme = 'dark';
    } else {
      // light system mode
      savedTheme = 'light';
    }
  }
  // apply saved mode, or system mode
  applyTheme(savedTheme);
  // set mode selector to current value
  if (savedTheme === 'light') {
    document.querySelector('.theme-checkbox').checked = true;
  }
});

// Chevron click smoothscroll
document.querySelector('.down-arrow').addEventListener('click', () => {
  ui.smoothScroll('.upcoming', 1000);
});

// Dark Mode selector
document.querySelector('.theme-checkbox').addEventListener('change', (e) => {
  if (e.srcElement.checked === true) {
    localStorage.setItem('witnsl-theme', 'light');
    applyTheme('light');
  } else {
    localStorage.setItem('witnsl-theme', 'dark');
    applyTheme('dark');
  }
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

// Apply theme change classes to body on change
function applyTheme(theme) {
  document.body.classList.remove('theme-light', 'theme-dark');
  document.body.classList.add(`theme-${theme}`);
}
