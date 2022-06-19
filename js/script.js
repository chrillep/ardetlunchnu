const urlParam = name => {
    let results = new RegExp('[?&]' + name + '=([^&#]*)').exec(window.location.href);
    if (results === null) {
        return null;
    } else {
        return results[1] || 0;
    }
};

const getLunchTime = () => {
    let today = new Date();
    let lunchTime = '12:00';
    if (urlParam('tid') !== null) {
        lunchTime = urlParam('tid');
    }
    today.setHours(...lunchTime.split(':'));
    return today.getTime();
};

const renderTimeLeft = (timeLeft, hours, minutes, seconds) => {
    if (timeLeft > 0) {
        document.getElementById("tid").innerHTML = 'Om <br/> ' + hours + "h " + minutes + "m " + seconds + "s ";
    }

    if (timeLeft < 0) {
        clearInterval(arDetLunch);
        document.getElementById("tid").textContent = "Ja! Det är lunch!";
    }
};

const getTimeLeft = () => {
    let now = new Date().getTime();
    let timeLeft = getLunchTime() - now;
    let hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    let minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
    let seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);
    return {timeLeft, hours, minutes, seconds};
};

const arDetLunch = setInterval(() => {
    let {timeLeft, hours, minutes, seconds} = getTimeLeft();
    renderTimeLeft(timeLeft, hours, minutes, seconds);
}, 1000);
