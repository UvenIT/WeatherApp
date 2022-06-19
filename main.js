

var cityname = document.querySelector('.weatherbox-nav--city');
var temp = document.querySelector('.weatherbox-temperature--degree');
var desc = document.querySelector('.weatherbox-description');
var wind = document.querySelector('.weatherbox-footer--windspeed');
var pres = document.querySelector('.weatherbox-footer--pressure');
var humid = document.querySelector('.weatherbox-footer--humidity');

var boxwind = document.querySelector('.weatherboxes-box--windspeed');
var boxfeels = document.querySelector('.weatherboxes-box--feels');
var boxsunrise = document.querySelector('.weatherboxes-box-sunrise');
var boxsunset = document.querySelector('.weatherboxes-box-sunset');

var dateupdate = document.querySelector('.weatherbox-nav--date');
var body = document.querySelector(".body");

window.onload = function () {

    var cities = ['Los%20angeles', 'London', 'Tokio', 'Sydney'];
    var i = 0;
    for (var city of cities) {
        fetch('https://api.openweathermap.org/data/2.5/weather?q=' + city + '&appid=')
            .then(response => response.json())
            .then(data => {
                var tempValues = data['main']['temp'];
                var cityname = data['name'];
                var icon = data['weather'][0]['icon'];

                var citiesnames = document.querySelectorAll('.leftcolumn-box--name')[i];
                citiesnames.innerHTML = cityname;

                var citiestemps = document.querySelectorAll('.leftcolumn-box--temp')[i];
                citiestemps.innerHTML = Math.floor(tempValues) + '°';

                var srclink = '/Icons2/' + icon + '.svg';
                var leftcolumnimg = document.querySelectorAll('.leftcolumn-box--img');
                leftcolumnimg[i].src = srclink;
                background = document.querySelectorAll('.leftcolumn-box');

                switch (icon) {
                    case '01d':
                    case '02d':
                    case '03d':
                    case '04d':
                    case '09d':
                    case '10d':
                    case '11d':
                    case '13d':
                    case '50d':
                        background[i].style.background = "linear-gradient(315deg, #0beef9 0%, #48a9fe 74%)";
                        break;
                    case '01n':
                    case '02n':
                    case '03n':
                    case '04n':
                    case '09n':
                    case '10n':
                    case '11n':
                    case '13n':
                    case '50n':
                        background[i].style.background = "linear-gradient(147deg, #000000 0%, #04619f 74%)";
                        break;
                }
                i++;
            });
    }
}

var firstinput = document.querySelector('.firstinput');
firstinput.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        newDiv = document.createElement('div');
        newDiv.classList.add('position-absolute', 'w-100', 'h-100', 'bg-white', 'd-flex', 'justify-content-center', 'align-items-center', 'loader');
        newDiv.innerHTML = "<h1>Loading...</h1>";
        document.body.insertBefore(newDiv, leftcolumn);

        function loader() {
            newDiv.classList.add('d-none');
            newDiv.classList.remove('d-flex');
        }
        setTimeout(loader, 800);

        var leftcolumn = document.querySelector('.leftcolumn');
        var maincolumn = document.querySelector('.maincolumn');
        var rightcolumn = document.querySelector('.rightcolumn');
        var footer = document.querySelector('footer');
        var szukaj = document.querySelector('.szukaj');
        var nav = document.querySelector('nav');
        szukaj.classList.add('d-none');

        if(window.innerWidth > 1500){
            leftcolumn.classList.remove('d-none');
        }
        maincolumn.classList.remove('d-none');
        rightcolumn.classList.remove('d-none');
        nav.classList.remove('d-none');
        footer.classList.add('d-xl-flex');
    }
})

var input = document.querySelectorAll('.city');
document.querySelectorAll('.city').forEach(item => {
    item.addEventListener("keypress", function (event) {
        if (event.key === "Enter") {
            itemvalue = item;
            fetch('https://api.openweathermap.org/data/2.5/weather?q=' + item.value + '&appid=')
                .then(response => response.json())
                .then(data => {
                    var tempValue = data['main']['temp'];
                    var nameValue = data['name'];
                    var descValue = data['weather'][0]['description'];
                    var windSpeed = data['wind']['speed'];
                    var pressure = data['main']['pressure'];
                    var humidity = data['main']['humidity'];
                    var icon = data['weather'][0]['icon'];
                    var feelslike = data['main']['feels_like'];
                    var sunriseunix = data['sys']['sunrise'];
                    var sunsetunix = data['sys']['sunset'];
                    timezone = data['timezone'];
                    var lastupdateunix = data['dt'];

                    cityname.innerHTML = nameValue;
                    temp.innerHTML = Math.floor(tempValue) + '°';
                    desc.innerHTML = descValue;
                    wind.innerHTML = "<i class='fa-solid fa-wind'></i> " + Math.round(windSpeed * 3.6) + 'km/h';
                    pres.innerHTML = "<i class='fa-solid fa-gauge-high'></i> " + pressure + 'hPa';
                    humid.innerHTML = "<i class='fa-solid fa-droplet'></i> " + humidity + '%';
                    input.value = "";

                    boxwind.innerHTML = Math.round(windSpeed * 3.6) + 'km/h';
                    boxfeels.innerHTML = Math.round(feelslike) + '°';

                    var unix = [sunriseunix, sunsetunix];
                    for (var unixtime of unix) {
                        var date = new Date((unixtime + timezone - 7200) * 1000);
                        var hours = date.getHours();
                        var minutes = date.getMinutes();
                        if (minutes < 10) {
                            minutes = "0" + date.getMinutes();
                        }
                        var timehm = hours + ':' + minutes;

                        if (hours < 12) {
                            boxsunrise.innerHTML = timehm;
                        } else {
                            boxsunset.innerHTML = timehm;
                        }
                    }

                    let unix_timestamp_lastupdate = lastupdateunix;
                    var date_lastupdate = new Date((unix_timestamp_lastupdate) * 1000);
                    var hours_lastupdate = date_lastupdate.getHours();
                    var minutes_lastupdate = "0" + date_lastupdate.getMinutes();
                    var lastupdate = hours_lastupdate + ":" + minutes_lastupdate.substr(-2);
                    dateupdate.innerHTML = "Last update: " + lastupdate + " (UTC)";

                    var srclink = '/Icons2/' + icon + '.svg';
                    var mainimg = document.querySelector('.weatherbox-icon--img');
                    mainimg.src = srclink;

                    var background = document.querySelector('.weatherbox');
                    switch (icon) {
                        case '01d':
                        case '02d':
                        case '03d':
                        case '04d':
                        case '09d':
                        case '10d':
                        case '11d':
                        case '13d':
                        case '50d':
                            background.style.background = "linear-gradient(360deg, #0beef9 0%, #48a9fe 74%)";
                            break;
                        case '01n':
                        case '02n':
                        case '03n':
                        case '04n':
                        case '09n':
                        case '10n':
                        case '11n':
                        case '13n':
                        case '50n':
                            background.style.background = "linear-gradient(180deg, #000000 0%, #04619f 74%)";
                            break;
                    };
                })
                .catch(err => window.location.reload(true));
            fetch('https://api.openweathermap.org/data/2.5/forecast?q=' + item.value + '&appid=')
                .then(response => response.json())
                .then(data => {
                    var timezone = data['city']['timezone'];
                    var navs = document.querySelectorAll('.rightcolumn-nav-navtxt');
                    var tempboxs = document.querySelectorAll('.rightcolumn-nav--temp');
                    var iconboxs = document.querySelectorAll('.rightcolumn-nav--img');
                    for (var i = 1; i < 5; i++) {
                        var time = data['list'][i]['dt'];
                        var date = new Date((time + timezone - 7200) * 1000);
                        var next = date.getHours();

                        if (next === 0) {
                            var next = '00';
                        }
                        navs[i - 1].innerHTML = next + ':' + '00';

                        var temp = data['list'][i]['main']['temp'];

                        tempboxs[i - 1].innerHTML = Math.round(temp) + '°';

                        var icon = data['list'][i]['weather'][0]['icon'];
                        var srclink = '/Icons2/' + icon + '.svg';
                        iconboxs[i - 1].src = srclink;
                    }
                });
            var right7daytemp = document.querySelectorAll('.rightcolumn-7day--temp');
            var right7daydate = document.querySelectorAll('.rightcolumn-7day--date');
            var right7dayname = document.querySelectorAll('.rightcolumn-7day--day');
            var right7dayicon = document.querySelectorAll('.rightcolumn-7day--icon');
            
            fetch('https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/'+ item.value+'?unitGroup=metric&key=&contentType=json')
                .then(response => response.json())
                .then(data => {
                    console.log(data)
                    for (i = 0; i < 6; i++) {
                        var temp = data['days'][i]['tempmax'];
                        var date = data['days'][i]['datetimeEpoch'];
                        var icon = data['days'][i]['icon'];
                        var newdate = new Date((date + timezone - 7200) * 1000);
                        var day = newdate.getDate();
                        const daynames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
                        var dayname = daynames[newdate.getDay()];
                        right7dayname[i].innerHTML = dayname;

                        const monthname = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
                        var month = monthname[newdate.getMonth()];
                        var timehm = day + ' ' + month;
                        right7daytemp[i].innerHTML = Math.round(temp) + '°';
                        right7daydate[i].innerHTML = timehm;

                        switch (icon) {
                            case 'rain':
                            case 'showers-day':
                            case 'showers-night':
                                icon = '09d';
                                break;
                            case 'snow':
                            case 'snow-showers-day':
                            case 'snow-showers-night':
                                icon = '13d';
                                break;
                            case 'thunder-rain':
                            case 'thunder-showers-day':
                            case 'thunder-showers-night':
                                icon = '11d';
                                break;
                            case 'fog':
                                icon = '50d';
                                break;
                            case 'wind':
                                icon = '51d';
                                break;
                            case 'cloudy':
                                icon = '03d';
                                break;
                            case 'partly-cloudy-day':
                                icon = '02d';
                                break;
                            case 'partly-cloudy-night':
                                icon = '02n';
                                break;
                            case 'clear-day':
                                icon = '01d';
                                break;
                            case 'clear-night':
                                icon = '01n';
                                break;
                        }
                        var srclink = '/Icons2/' + icon + '.svg';
                        right7dayicon[i].src = srclink;
                    }
                })
                .catch(err => {
                    console.error(err);
                });
        }
    })
});

function days() {
    var daybox7 = document.querySelectorAll('.rightcolumn-7day-box');
    var boxmore = document.querySelector('.rightcolumn-7day--focusedbox')
    for (const box of daybox7) {
        box.addEventListener('click', () => {
            for (i = 0; i < 6; i++) {
                daybox7[i].classList.toggle('d-none');
            }
            box.classList.toggle('d-none');
            var listparent = document.querySelector('.rightcolumn-7day');
            boxmore.classList.toggle('d-none');
            listparent.classList.toggle('rightcolumn-7day--active');
        });
    }
    Array.prototype.forEach.call(daybox7, function (daybox7, index) {
        daybox7.addEventListener('click', function () {
            fetch('https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/'+ itemvalue.value+'?unitGroup=metric&key=&contentType=json')
                .then(response => response.json())
                .then(data => {
                    var pressure = Math.round(data['days'][index]['pressure']) + 'hPa';
                    var uv = data['days'][index]['uvindex'];
                    var feelslike = Math.round(data['days'][index]['feelslike']) + '°';
                    var wind = Math.round(data['days'][index]['windspeed']) + 'km/h';
                    var humidity = Math.round(data['days'][index]['humidity']) + '%';
                    var precip = Math.round(data['days'][index]['precipprob']) + '%';

                    var pressurebox = document.querySelector('.rightcolumn-7day--focusedbox-pressure');
                    var uvbox = document.querySelector('.rightcolumn-7day--focusedbox-uv');
                    var feelsbox = document.querySelector('.rightcolumn-7day--focusedbox-feels');
                    var windbox = document.querySelector('.rightcolumn-7day--focusedbox-wind');
                    var humiditybox = document.querySelector('.rightcolumn-7day--focusedbox-humidity');
                    var propbox = document.querySelector('.rightcolumn-7day--focusedbox-prop'); 

                    pressurebox.innerHTML = "<h5>" + pressure + "</h5>" + "<img src='Icons2/barometer.svg'>";
                    uvbox.innerHTML = "<h5>" + uv + "</h5>" + "<img src='Icons2/uv-index.svg'>";
                    feelsbox.innerHTML = "<h5>" + feelslike + "</h5>" + "<img src='Icons2/thermometer-celsius.svg'>";
                    windbox.innerHTML = "<h5>" + wind + "</h5>" + "<img src='Icons2/windsock.svg'>";
                    if (Math.round(data['days'][index]['windspeed']) < 10) {
                        windbox.innerHTML = "<h5>" + wind + "</h5>" + "<img src='Icons2/windsock-weak.svg'>";
                    }
                    humiditybox.innerHTML = "<h5>" + humidity + "</h5>" + "<img src='Icons2/humidity.svg'>";
                    propbox.innerHTML = "<h5>" + precip + "</h5>" + "<img src='Icons2/raindrops.svg'>"; 
                })
        })
    });
}
    var leftcolumn = document.querySelector('.leftcolumn');
    var i = 0;
    document.querySelectorAll('.menu').forEach(item => {
        item.addEventListener('click', () => {
            leftcolumn.classList.remove('d-none');
            i++;
            if (i % 2 == 0) {
                leftcolumn.classList.add('leftcolumn--close');
                leftcolumn.classList.remove('leftcolumn--active');
                setTimeout(function () {
                    body.classList.remove('body-ov--hidden');
                }, 500);
            } else {
                leftcolumn.classList.add('leftcolumn--active');
                leftcolumn.classList.remove('leftcolumn--close');
                body.classList.add('body-ov--hidden');
            }
        })
    });


