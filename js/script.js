let tid = document.getElementById("tid");

tid.addEventListener("input", () => {
        const queryString = window.location.search;
        let params = new URLSearchParams(queryString);
        params.set('tid', tid.value);
        window.location.search = params.toString();
    }, false
);

const urlParam = name => {
    const queryString = window.location.search;
    return new URLSearchParams(queryString).get(name);
};

const getHoursAndMinutesFromString = lunchTime => {
    let decodedLunchTime = decodeURIComponent(lunchTime);
    let lunchTimeSplit = decodedLunchTime.split(':');
    let hours = parseInt(lunchTimeSplit[0]);
    let minutes = parseInt(lunchTimeSplit[1]);
    return {hours, minutes};
};

const getLunchTime = () => {
    let today = new Date();
    let lunchTime = '12:00';
    if (urlParam('tid') !== null) {
        lunchTime = urlParam('tid');
    }
    tid.value = lunchTime;
    let {hours, minutes} = getHoursAndMinutesFromString(lunchTime);
    today.setHours(hours, minutes, 0, 0);
    return today.getTime();
};

const renderTimeLeft = (timeLeft, hours, minutes, seconds) => {
    if (timeLeft > 0) {
        document.getElementById("lunchtid").innerHTML = 'Om <br/> ' + hours + "h " + minutes + "m " + seconds + "s ";
    }

    if (timeLeft < 0) {
        clearInterval(arDetLunch);
        document.getElementById("lunchtid").textContent = "Ja! Det är lunch!";
    }
};

const getTimeLeft = () => {
    let now = new Date().getTime();
    let lunchTime = getLunchTime();
    let timeLeft = lunchTime - now;
    let hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    let minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
    let seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);
    return {timeLeft, hours, minutes, seconds};
};

const arDetLunch = setInterval(() => {
    let {timeLeft, hours, minutes, seconds} = getTimeLeft();
    renderTimeLeft(timeLeft, hours, minutes, seconds);
}, 1000);
