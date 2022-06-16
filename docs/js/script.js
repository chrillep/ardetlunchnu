const urlParam = function (name) {
    "use strict";
    let results = new RegExp('[?&]' + name + '=([^&#]*)').exec(window.location.href);
    if (results === null) {
        return null;
    } else {
        return results[1] || 0;
    }
};

let today = new Date();
let dd = today.getDate();
let mm = today.getMonth() + 1;
let yyyy = today.getFullYear();

if (dd < 10) {
    dd = '0' + dd;
}

if (mm < 10) {
    mm = '0' + mm;
}

let timeofday = '12:00:00';

if (urlParam('tid') !== null) {
    timeofday = urlParam('tid');
}

let arr = timeofday.split(':');
arr[0] -= 2;
timeofday = arr[0] + ':' + arr[1] + ':' + arr[2];

today = yyyy + '-' + mm + '-' + dd + 'T' + timeofday;

let countDownDate = new Date(today).getTime();

const x = setInterval(function () {
    "use strict";
    let now = new Date().getTime();
    let distance = countDownDate - now;
    let hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    let seconds = Math.floor((distance % (1000 * 60)) / 1000);

    document.getElementById("tid").textContent = 'Om <br/>' + hours + "h " + minutes + "m " + seconds + "s ";

    if (distance < 0) {
        clearInterval(x);
        document.getElementById("tid").textContent = "Ja! Det är lunch!";
    }
}, 1000);
