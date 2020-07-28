// inits classes
const storage = new Storage();
const ui = new UI();
const http = new HTTP();

// DOM Load Event
document.addEventListener('DOMContentLoaded', () => {
  // Get Saved theme from LocalStorage and apply
  let savedTheme = localStorage.getItem('witnsl-theme');
  if (savedTheme === null) {
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
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

  // getNextLaunch();
  getUpcomingLaunches();
});

// Chevron click smoothscroll
document.querySelector('.down-arrow').addEventListener('click', () => {
  ui.smoothScroll('.upcoming', 1000);
});

// Dark Mode selector
document.querySelector('.theme-checkbox').addEventListener('change', (e) => {
  if (e.srcElement.checked === true) {
    applyTheme('light');
  } else {
    applyTheme('dark');
  }
});

// Get upcoming launches
function getUpcomingLaunches() {
  // API: POST https://api.spacexdata.com/v4/launches/query
  // DOCS: https://github.com/r-spacex/SpaceX-API/blob/master/docs/v4/launches/query.md
  http
    .post('https://api.spacexdata.com/v4/launches/query', {
      query: {
        success: null,
      },
      options: {
        sort: {
          flight_number: 'asc',
        },
        limit: 20,
        populate: [
          'cores.core',
          'cores.landpad',
          'ships',
          'crew',
          'capsules',
          'payloads',
          'launchpad',
          {
            path: 'rocket',
            select: {
              name: 1,
            },
          },
        ],
      },
    })
    .then((response) => {
      // Console Log response
      console.log(response.docs);

      // Add next launch details to UI
      ui.paintNextLaunchDetails(response.docs[0]);

      // Update next Launch Countdown
      ui.updateLaunchCountdown(response.docs[0].date_precision, response.docs[0].date_local);

      // Add each upcoming launch to list
      response.docs.forEach((element) => {
        // Add launch to list
        ui.addUpcomingLaunchToList(element);
      });
    })
    .catch((err) => console.log(err));
}

// Apply theme change classes to body on change
function applyTheme(theme) {
  localStorage.setItem('witnsl-theme', theme);
  document.body.classList.remove('theme-light', 'theme-dark');
  document.body.classList.add(`theme-${theme}`);
}
