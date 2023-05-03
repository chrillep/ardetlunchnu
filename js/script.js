navigator.serviceWorker.register("generate-sw.js");
const defaultPageTitle = "Är det lunch?";

const urlParam = (name) => {
  const queryString = window.location.search;
  return new URLSearchParams(queryString).get(name);
};

const getHoursAndMinutesFromString = (lunchTime) => {
  const decodedLunchTime = decodeURIComponent(lunchTime);
  const lunchTimeSplit = decodedLunchTime.split(":");
  const hours = parseInt(lunchTimeSplit[0]);
  const minutes = parseInt(lunchTimeSplit[1]);
  return { hours, minutes };
};

const getLunchTime = () => {
  const today = new Date();
  let lunchTime = "12:00";
  if (urlParam("tid") !== null) {
    lunchTime = urlParam("tid");
  }
  document.title = defaultPageTitle + " Lunchtid " + lunchTime;
  const { hours, minutes } = getHoursAndMinutesFromString(lunchTime);
  today.setHours(hours, minutes, 0, 0);
  return today.getTime();
};

const renderTimeLeft = (timeLeft, hours, minutes, seconds) => {
  if (timeLeft > 0) {
    document.getElementById("lunchtid").innerHTML =
      "Om <br/> " + hours + "h " + minutes + "m " + seconds + "s ";
    document.title =
      defaultPageTitle +
      " Lunch Om " +
      hours +
      "h " +
      minutes +
      "m " +
      seconds +
      "s ";
  }

  if (timeLeft < 0) {
    clearInterval(arDetLunch);
    document.getElementById("lunchtid").textContent = "Ja! Det är lunch!";
    document.title = defaultPageTitle + " Ja! Det är lunch!";
  }
};

const getTimeLeft = () => {
  const now = new Date().getTime();
  const lunchTime = getLunchTime();
  const timeLeft = lunchTime - now;
  const hours = Math.floor(
    (timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  );

  const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);
  return { timeLeft, hours, minutes, seconds };
};

const arDetLunch = setInterval(() => {
  const { timeLeft, hours, minutes, seconds } = getTimeLeft();
  renderTimeLeft(timeLeft, hours, minutes, seconds);
}, 1000);
