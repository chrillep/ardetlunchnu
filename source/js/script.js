var urlParam = function(name) {
    var results = new RegExp('[?&]' + name + '=([^&#]*)').exec(window.location.href);
    if (results === null) {
        return null;
    } else {
        return results[1] || 0;
    }
};

var today = new Date();
var dd = today.getDate();
var mm = today.getMonth()+1;
var yyyy = today.getFullYear();

if (dd < 10) {
    dd = '0'+dd;
} 

if (mm < 10) {
    mm = '0'+mm;
}

if (null !== urlParam('tid')) {
    var timeofday = urlParam('tid');
}
else {
    var timeofday = '12:00:00';
}
today = mm+'/'+dd+'/'+yyyy+'/'+timeofday;

var countDownDate = new Date(today).getTime();

var x = setInterval(function() {

    var now = new Date().getTime();
    var distance = countDownDate - now;
    var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((distance % (1000 * 60)) / 1000);
    
    document.getElementById("tid").innerHTML = 'Om <br/>' + hours + "h " + minutes + "m " + seconds + "s ";
    
    if (distance < 0) {
        clearInterval(x);
        document.getElementById("tid").innerHTML = "Ja! Det är lunch!";
    }
}, 1000);