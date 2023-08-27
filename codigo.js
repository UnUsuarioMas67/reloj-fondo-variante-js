var doubleDigit = (x) => (x < 10 ? "0" + x : x);
var currentTime = new Date();

var showClock = () => {
	var clock = document.getElementById("clock");

	var hours = currentTime.getHours();
	var minutes = currentTime.getMinutes();
	var seconds = currentTime.getSeconds();

	// set hour and meridian
	var hh, meridian;
	if (hours < 12) {
		hh = doubleDigit(hours);
		meridian = "AM";
	} else {
		hh = doubleDigit(hours - 12);
		meridian = "PM";
	}

	var mm = doubleDigit(minutes); // minutes
	var ss = doubleDigit(seconds); // seconds

	// show text in html
	var timeText = `${hh}:${mm}<span class="seconds">${ss}</span> ${meridian}`;
	clock.innerHTML = timeText;
};

var showDate = function () {
	var date = document.getElementById("date");

	var dayList = ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"];
	var monthList = [
		"Enero",
		"Febrero",
		"Marzo",
		"Abril",
		"Mayo",
		"Junio",
		"Julio",
		"Agosto",
		"Septiembre",
		"Octubre",
		"Noviembre",
		"Diciembre",
	];

	var day = dayList[currentTime.getDay()];
	var month = monthList[currentTime.getMonth()];
	var mDay = doubleDigit(currentTime.getDate());

	var dateText = `${day}, ${mDay} de ${month}`;
	date.innerText = dateText;
};

var updateTime = function () {
	currentTime = new Date();
	showClock();
	showDate();
};

const images = ["images/background1.jpg", "images/background2.jpg", "images/background3.jpg"];
var currIndex = 0;
var nextIndex = 1;

// sets the images
var currBg = document.getElementById("bg-current");
currBg.style.backgroundImage = `url("${images[currIndex]}")`;
var nextBg = document.getElementById("bg-next");
nextBg.style.backgroundImage = `url("${images[nextIndex]}")`;

var alpha = 1;
var fadeOutTimer;
var switchImageTimer;

var fadeOutImage = function () {
	// decreases background opacity every 1/100 seconds
	fadeOutTimer = setInterval(() => {
		alpha -= 0.02;
		currBg.style.opacity = alpha;
	}, 10);

	// checks if background opacity is at 0 every 1/10 seconds
	switchImageTimer = setInterval(() => {
		if (alpha <= 0) {
			alpha = 1;
			currBg.style.opacity = alpha;
			switchImage();
		}
	}, 100);
};

var switchImage = function () {
	// stop the timers
	clearInterval(fadeOutTimer);
	clearInterval(switchImageTimer);

	// changes the image

	currIndex = nextIndex;
	nextIndex = nextIndex < images.length - 1 ? ++nextIndex : (nextIndex = 0);

	currBg.style.backgroundImage = `url("${images[currIndex]}")`;

	nextBg.style.backgroundImage = `url("${images[nextIndex]}")`;
};

var fadeInImage = () => {
	// increases background opacity every 1/100 seconds
	currBg.style.opacity = 0;

	var fadeInTimer = setInterval(() => {
		alpha += 0.02;
		currBg.style.opacity = alpha;
	}, 10);

	// checks if background opacity is at 1 every 1/10 seconds
	var endFadingTimer = setInterval(() => {
		if (alpha >= 1) {
			clearInterval(fadeInTimer);
			clearInterval(endFadingTimer);
		}
	}, 100);
};

updateTime();

// update time every second
setInterval(updateTime, 1000);

// update image every 10 seconds
setInterval(fadeOutImage, 10000);
