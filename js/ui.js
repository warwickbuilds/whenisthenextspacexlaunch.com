class UI {
  paintNextLaunchDetails(item) {
    const stats = document.querySelector('.launch-stats');
    const details = document.querySelector('.launch-details');
    const imageDiv = document.querySelector('.launch-image');

    // set launch image
    imageDiv.innerHTML = item.links.patch.small ? `<img src="${item.links.patch.small}">` : '<div class="launch-nopatch"><img src="img/spacex-vector-logo.svg"></div>';

    const div = document.createElement('div');
    div.innerHTML = `
            <table>
            <tr><td><span class="details-title">Your Launch Time</span></td><td>${moment(item.date_local).format('ddd Do MMM, h:mm a')}</td></tr>
            <tr><td><span class="details-title">Site Launch Time</span></td><td>${moment.parseZone(item.date_local).format('ddd Do MMM, h:mm a')}</td></tr>
            </table>
            <table>
            <tr><td><span class="details-title">Mission Name</span></td><td>${item.name}</td></tr>
            <tr><td><span class="details-title">Launch Site</span></td><td>${item.launchpad.name} (${item.launchpad.region})</td></tr>
            </table>
            <table>
            <tr><td><span class="details-title">Rocket</span></td><td>${item.rocket.name}</td></tr>
            <tr><td><span class="details-title">Payload</span></td><td>${item.payloads[0].name} ${item.payloads[1] ? ' / ' + item.payloads[1].name : ''}</td></tr>
            <tr><td><span class="details-title">Target Orbit</span></td><td>${item.payloads[0].orbit} ${item.payloads[1] ? ' / ' + item.payloads[1].orbit : ''}</td></tr>
            <tr><td><span class="details-title">Customer</span></td><td>${item.payloads[0].customers[0]} ${item.payloads[1] ? ' / ' + item.payloads[1].customers[0] : ''}</td></tr>
            </table>
        `;
    // build details html

    //container.insertBefore(div, countdownDiv);

    stats.appendChild(div);

    let detailsHtml = '';

    // check for detail available
    detailsHtml += item.details === null ? '' : item.details;

    detailsHtml += `<p>`;
    // insert video link if available
    if (item.links.webcast) {
      detailsHtml += `<a href="${item.links.webcast}" target="_blank"><i class="fab fa-youtube red"></i></a>`;
    }

    // insert wikipedia link if available
    if (item.links.wikipedia) {
      detailsHtml += `<a href="${item.links.wikipedia}" target="_blank"><i class="fab fa-wikipedia-w white"></i></a>`;
    }
    // insert reddit link if available
    if (item.links.reddit.launch) {
      detailsHtml += `<a href="${item.links.reddit.launch}" target="_blank"><i class="fab fa-reddit orange"></i></a>`;
    }

    // insert nasa link if available
    if (item.links.presskit) {
      detailsHtml += `<a href="${item.links.presskit}" target="_blank"><img class="nasa"src="img/nasa-logo-trans.png"></a>`;
    }

    // insert spacex link
    detailsHtml += `<a href="https://www.spacex.com/" target="_blank"><img class="spacex" src="img/spacex-logo-trans.png"></a>`;

    detailsHtml += `</p>`;

    details.innerHTML = detailsHtml;
  }

  updateLaunchCountdown(date_precision, endDate) {
    const launch = new Date(endDate);
    const daysSpan = document.querySelector('.countdown-days');
    const hoursSpan = document.querySelector('.countdown-hours');
    const minsSpan = document.querySelector('.countdown-minutes');
    const secsSpan = document.querySelector('.countdown-seconds');

    function getTimeRemaining(launch) {
      let t = Date.parse(launch) - Date.parse(new Date());
      let seconds = Math.floor((t / 1000) % 60);
      let minutes = Math.floor((t / 1000 / 60) % 60);
      let hours = Math.floor((t / (1000 * 60 * 60)) % 24);
      let days = Math.floor(t / (1000 * 60 * 60 * 24));
      return {
        total: t,
        days: days,
        hours: hours,
        minutes: minutes,
        seconds: seconds,
      };
    }

    function updateClock() {
      let t = getTimeRemaining(launch);
      daysSpan.innerHTML = `${t.days}`;
      hoursSpan.innerHTML = `${t.hours}`;
      minsSpan.innerHTML = `${t.minutes}`;
      secsSpan.innerHTML = `${t.seconds}`;
      if (t.total <= 0) {
        clearInterval(timeinterval);
      }
    }

    if (date_precision !== 'hour') {
      // if launch is hour precision only
      daysSpan.innerHTML = ``;
      hoursSpan.innerHTML = `Launch`;
      minsSpan.innerHTML = `Not`;
      secsSpan.innerHTML = `Set`;
    } else {
      updateClock(); // run function once at first to avoid delay
      var timeinterval = setInterval(updateClock, 1000);
    }
  }

  addUpcomingLaunchToList(launch) {
    const list = document.getElementById('launch-list');
    // create tr element
    const row = document.createElement('tr');
    // inset cols

    // check to patch
    const patchLink = launch.links.patch.small ? `<img src="${launch.links.patch.small}">` : `<img src="img/nopatch-60x60.png">`;

    row.innerHTML = `
            <td id="patchtd">${patchLink}</td>
            <td>
                ${launch.name}
                <p class=mobile-show><small>
                ${launch.rocket.name} | ${launch.payloads[0].name} ${launch.payloads[1] ? ' / ' + launch.payloads[1].name : ''}<br>
                ${moment(launch.date_local).format('MMM YYYY')} | ${launch.launchpad.name} (${launch.launchpad.region})<br></small>
                </p>
            </td>
            <td class="mobile-hide">${launch.rocket.name}</td>
            <td class="mobile-hide">${launch.payloads[0].name} ${launch.payloads[1] ? '<br/>' + launch.payloads[1].name : ''}</td>
            <td class="mobile-hide">${launch.payloads[0].orbit} ${launch.payloads[1] ? '<br/>' + launch.payloads[1].orbit : ''}</td>
            <td class="mobile-hide">${launch.payloads[0].customers[0]} ${launch.payloads[1] ? '<br/>' + launch.payloads[1].customers[0] : ''}</td>
            <td class="mobile-hide">${launch.launchpad.name} (${launch.launchpad.region})</td>
            <td class="mobile-hide">${launch.date_precision === 'month' || launch.date_precision === 'quarter' ? moment(launch.date_local).format('MMM YYYY') : moment(launch.date_local).format('MMM YYYY')}</td>
        `;
    list.append(row);
  }

  smoothScroll(target, duration) {
    console.log(target, duration);
    target = document.querySelector(target);
    let targetPosition = target.getBoundingClientRect().top;
    let startPosition = window.pageYOffset;
    let distance = targetPosition - startPosition;
    let startTime = null;

    function animation(currentTime) {
      if (startTime === null) startTime = currentTime;
      let timeElapsed = currentTime - startTime;
      let run = ease(timeElapsed, startPosition, distance, duration);
      window.scrollTo(0, run);
      if (timeElapsed < duration) requestAnimationFrame(animation);
    }

    function ease(t, b, c, d) {
      t /= d / 2;
      if (t < 1) return (c / 2) * t * t + b;
      t--;
      return (-c / 2) * (t * (t - 2) - 1) + b;
    }

    requestAnimationFrame(animation);
  }
}
