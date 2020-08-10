// inits classes
const storage = new Storage();
const ui = new UI();
const http = new HTTP();

// init IndexedDB using dexie
let idb = storage.initStorage();

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
  // check indexeddb for data
  idb.launches.toArray().then((data) => {
    if (data[0]) {
      // Local Data found
      let response = data[0].data;

      // Add next launch details to UI
      ui.paintNextLaunchDetails(response[0]);

      // Update next Launch Countdown
      ui.updateLaunchCountdown(response[0].date_precision, response[0].date_local);

      // Add each upcoming launch to list
      document.getElementById('launch-list').innerHTML = '';
      response.forEach((element) => {
        // Add launch to list
        ui.addUpcomingLaunchToList(element);
      });

      //console.log(response);
      console.log('cache data used');

      // Only Get new Data if checked over 1 minute ago
      const lastAPIGet = new Date(localStorage.getItem('witnsl-lastapiget'));
      const dateComp = new Date(new Date().getTime() - 30 * 60000); // minus 30 minute
      if (lastAPIGet < dateComp) {
        getFreshData();
      }
    } else {
      // No Local Data
      getFreshData();
    }

    function getFreshData() {
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
          // Update IndexedDB
          idb.launches.put({ data: response.docs, _id: 'launches' });

          idb.launches.toArray().then((data) => {
            //console.log(data[0]);
            //data.forEach((launch) => console.log(launch));
          });

          // Console Log response
          //console.log(response.docs);

          // Add next launch details to UI
          ui.paintNextLaunchDetails(response.docs[0]);

          // Update next Launch Countdown
          ui.updateLaunchCountdown(response.docs[0].date_precision, response.docs[0].date_local);

          // Add each upcoming launch to list
          document.getElementById('launch-list').innerHTML = '';
          response.docs.forEach((element) => {
            // Add launch to list
            ui.addUpcomingLaunchToList(element);
          });

          console.log('cache updated');
        })
        .catch((err) => console.log(err));

      //Log time to local storage
      localStorage.setItem('witnsl-lastapiget', new Date());
    }
  });
}

// Apply theme change classes to body on change
function applyTheme(theme) {
  localStorage.setItem('witnsl-theme', theme);
  document.body.classList.remove('theme-light', 'theme-dark');
  document.body.classList.add(`theme-${theme}`);
}

// // Set this to true for production
// var doCache = true;

// // Name our cache
// var CACHE_NAME = 'whenisthenextspacexlaunch';

// // Delete old caches that are not our current one!
// self.addEventListener('activate', (event) => {
//   const cacheWhitelist = [CACHE_NAME];
//   event.waitUntil(
//     caches.keys().then((keyList) =>
//       Promise.all(
//         keyList.map((key) => {
//           if (!cacheWhitelist.includes(key)) {
//             console.log('Deleting cache: ' + key);
//             return caches.delete(key);
//           }
//         })
//       )
//     )
//   );
// });

// // The first time the user starts up the PWA, 'install' is triggered.
// self.addEventListener('install', function (event) {
//   console.log('install triggered');
//   if (doCache) {
//     event.waitUntil(
//       caches.open(CACHE_NAME).then(function (cache) {
//         // Get the assets manifest so we can see what our js file is named
//         // This is because webpack hashes it
//         fetch('manifest.json')
//           .then((response) => {
//             response.json();
//           })
//           .then((assets) => {
//             // Open a cache and cache our files
//             // We want to cache the page and the main.js generated by webpack
//             // We could also cache any static assets like CSS or images
//             const urlsToCache = [
//               '/index.html',
//               assets['/img/awarddigital-logo_black.png'],
//               assets['/img/day_dragon.jpg'],
//               assets['/img/nasa-logo-trans.png'],
//               assets['/img/nopatch-60x60.png'],
//               assets['/img/nopatch-120x120.png'],
//               assets['/img/spacex-logo-trans.png'],
//               assets['/img/spacex-vector-logo.svg'],
//               assets['/js/lib/indexeddb.shim.min.js'],
//               assets['/js/lib/dexie.min.js'],
//               assets['/js/app.js'],
//               assets['/js/ui.js'],
//               assets['/js/http.js'],
//               assets['/js/storage.js'],
//               assets['/css/style.css'],
//             ];
//             cache.addAll(urlsToCache);
//             console.log('cached');
//           });
//       })
//     );
//   }
// });

// // When the webpage goes to fetch files, we intercept that request and serve up the matching files
// // if we have them
// self.addEventListener('fetch', function (event) {
//   if (doCache) {
//     event.respondWith(
//       caches.match(event.request).then(function (response) {
//         console.log(event.request);
//         return response || fetch(event.request);
//       })
//     );
//   }
// });

self.addEventListener('fetch', (request) => {
  console.log('request', request);
  event.respondWith(
    caches.open('test').then((cache) => {
      return fetch(request).then((response) => {
        cache.put(request, response.clone());
        return response;
      });
    })
  );
});
