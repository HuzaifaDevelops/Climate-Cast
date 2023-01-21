display("London");

let search = document.getElementById('search');
let searchBtn = document.getElementById('searchBtn');
let cloud_pct = document.getElementById('cloud_pct');
let humidity = document.getElementById('humidity');
let wind = document.getElementById('wind');
let temp = document.getElementById('degree');
let weather_type = document.getElementById('type');
let cityName = document.getElementById('cityName');
let birmingham = document.getElementById('Birmingham');
let manchester = document.getElementById('Manchester');
let newYork = document.getElementById('New-York');
let california = document.getElementById('California');

searchBtn.addEventListener('click', (e) => {
    let searchVal = search.value;
    let newstr = searchVal.charAt(0).toUpperCase() + searchVal.slice(1);
    if (searchVal == "") {
        e.preventDefault();
    } else {
        display(newstr)
        search.value = "";
    }
})
birmingham.addEventListener('click', () => {
    display("Birmingham");
})
manchester.addEventListener('click', () => {
    display("Manchester");
})
newYork.addEventListener('click', () => {
    display("New York");
})
california.addEventListener('click', () => {
    display("California");
})
function display(city) {
    var load = document.getElementById('load');
    load.style.display = "grid";
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': 'c42bd16b3cmsh30dcb16d056fb4fp1eb86ajsn1bf545a568cb',
            'X-RapidAPI-Host': 'weather-by-api-ninjas.p.rapidapi.com'
        }
    };

    let api = fetch(`https://weather-by-api-ninjas.p.rapidapi.com/v1/weather?city=${city}`, options)
    api.then((response) => {
        return response.json();
    }).then((data) => {
        load.style.display = "none";
        if(data.temp == undefined){
            temp.innerHTML = "Invalid";
            temp.style.color = "red";
            cityName.innerHTML = "";
            cloud_pct.innerHTML = "?";
            humidity.innerHTML = "?";
            wind.innerHTML = "?";
        } else{
            cloud_pct.innerHTML = data.cloud_pct + '%';
            humidity.innerHTML = data.humidity + '%';
            wind.innerHTML = data.wind_speed + 'Km/h';
        temp.innerHTML = data.temp + '°';
        cityName.innerHTML = city;
        }
        if (data.temp < 0) {
            document.body.style.backgroundImage = "url('/Resources/snow.jpg')";
        }
        else if(data.temp < 5){
            document.body.style.backgroundImage = "url('/Resources/cloudy.jpg')";
        }
        else if(data.temp <= 10){
            document.body.style.backgroundImage = "url('/Resources/nature.jpg')";
        }
        else if(data.temp > 10 && data.temp < 17){
            document.body.style.backgroundImage = "url('/Resources/night.jpg')";
        }
        else if(data.temp < 25){
            document.body.style.backgroundImage = "url('/Resources/sunny.jpg')";
        }
        else{
            document.body.style.backgroundImage = "url('/Resources/default.jpg')";
        }
    })
}
