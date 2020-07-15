class UI {
  paintNextLaunchDetails(item) {
    const stats = document.querySelector('.launch-stats');
    const details = document.querySelector('.launch-details');
    const imageDiv = document.querySelector('.launch-image');

    // set launch image
    imageDiv.innerHTML = item.links.mission_patch_small
      ? `<img src="${item.links.mission_patch_small}">`
      : '<div class="launch-nopatch"><img src="img/spacex-vector-logo.svg"></div>';

    const div = document.createElement('div');
    div.innerHTML = `
            <p>
            <span class="details-title">Your Local Launch Time :</span>&nbsp;&nbsp;${moment(
              item.launch_date_local
            ).format('llll')} <br/>
            <span class="details-title">Site Launch Time : </span>&nbsp;&nbsp;  ${moment
              .parseZone(item.launch_date_local)
              .format('llll')}
            </p>
            <p>
            <span class="details-title">Mission Name : </span>&nbsp; ${
              item.mission_name
            } <br/ >
            <span class="details-title">Launch Site : </span>&nbsp; ${
              item.launch_site.site_name
            }
            </p>
            <p>
            <span class="details-title">Rocket Type : </span>&nbsp; ${
              item.rocket.rocket_name
            } <br/ >
            <span class="details-title">Rocket Payload : </span>&nbsp; ${
              item.rocket.second_stage.payloads[0].payload_type
            } <br/ >
            <span class="details-title">Target Orbit : </span>&nbsp; ${
              item.rocket.second_stage.payloads[0].orbit
            } <br/ >
            <span class="details-title">Customer : </span>&nbsp; ${
              item.rocket.second_stage.payloads[0].customers[0]
            }
            </p>
        `;
    // build details html

    //container.insertBefore(div, countdownDiv);

    stats.appendChild(div);

    let detailsHtml = '';

    // check for detail available
    detailsHtml += item.details === null ? '' : item.details;

    detailsHtml += `<p>`;
    // insert video link if available
    if (item.links.video_link) {
      detailsHtml += `<a href="${item.links.video_link}" target="_blank"><i class="fab fa-youtube red"></i></a>`;
    }

    // insert wikipedia link if available
    if (item.links.wikipedia) {
      detailsHtml += `<a href="${item.links.wikipedia}" target="_blank"><i class="fab fa-wikipedia-w white"></i></a>`;
    }
    // insert reddit link if available
    if (item.links.reddit_launch) {
      detailsHtml += `<a href="${item.links.reddit_launch}" target="_blank"><i class="fab fa-reddit orange"></i></a>`;
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

  updateLaunchCountdown(endDate) {
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

    updateClock(); // run function once at first to avoid delay
    var timeinterval = setInterval(updateClock, 1000);
  }

  addUpcomingLaunchToList(launch) {
    const list = document.getElementById('launch-list');
    // create tr element
    const row = document.createElement('tr');
    // inset cols

    // check to patch
    const patchLink = launch.links.mission_patch_small
      ? `<img src="${launch.links.mission_patch_small}">`
      : `<img src="img/nopatch-60x60.png">`;

    row.innerHTML = `
            <td id="patchtd">${patchLink}</td>
            <td>
                ${launch.mission_name}
                <p class=mobile-show>
                ${launch.rocket.rocket_name} | ${
      launch.rocket.second_stage.payloads[0].payload_type
    }<br>
                ${moment(launch.launch_date_local).format('llll')}<br>
                </p>
            </td>
            <td class="mobile-hide">${launch.launch_site.site_name}</td>
            <td class="mobile-hide">${launch.rocket.rocket_name}</td>
            <td class="mobile-hide">${
              launch.rocket.second_stage.payloads[0].payload_type
            }</td>
            <td class="mobile-hide">${
              launch.rocket.second_stage.payloads[0].orbit
            }</td>
            <td class="mobile-hide">${
              launch.rocket.second_stage.payloads[0].customers[0]
            }</td>
            <td class="mobile-hide">${moment(launch.launch_date_local).format(
              'llll'
            )}</td>
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
