const dateInfo = document.querySelector('.date p');

function dateGenerate(){
    const d= new Date();
    dateInfo.innerHTML = String(d).slice(4,15);
}

const randomCities = ['Kathmandu', 'Pokhara', 'London', 'Paris', 'New York', 'New Delhi', 'Mumbai', 'Madrid', 'Barcelona', 'Los Angeles', 'Manchester',
'San Francisco', 'Biratnagar', 'Shanghai', 'Moscow', 'Toronto', 'Tokyo', 'Osaka', 'Kyoto', 'Seoul', 'Lisbon'];

const search = document.querySelector('.search-form');
const inputCity = document.querySelector('#city-name');

const cityName = document.querySelector('.cityName');
const temperature = document.querySelector('.temp');
const desc = document.querySelector('.desc');
const maxTemp = document.querySelector('.max-temp span');
const minTemp = document.querySelector('.min-temp span');
const feelTemp = document.querySelector('.feel-temp span');
const sunrise = document.querySelector('.sunrise span');
const sunset = document.querySelector('.sunset span');
const humidity = document.querySelector('.humidity span');
const pressure = document.querySelector('.pressure span');
const windSpeed = document.querySelector('.wind-speed span');
const windDegree = document.querySelector('.wind-deg span');
const visibility= document.querySelector('.visibility span');

const otherCities = document.querySelectorAll('.other-city');
dateGenerate();

search.addEventListener('submit',(e)=>{
    e.preventDefault();
    const city = inputCity.value;

    if(city == ""){
        alert('Please enter city name');
    }
    else{
        generateData(city);
    }
})

function generateData(city){
    const api = `https://api.openweathermap.org/data/2.5/weather?q=` + city + `&appid=17c857e49921b81cb379e545970b4792`
    fetch(api).then((response)=>{
       return response.json();
    }).then((data)=>{
        otherCitiesWeather();
        cityName.textContent = data.name;
        temperature.textContent = Math.floor(Number(data.main.temp) - 273)+'°C';
        description = data.weather[0].description;
        desc.textContent = description.charAt(0).toUpperCase() + description.slice(1);
        maxTemp.textContent = Math.floor(Number(data.main.temp_max) - 273)+'°C'
        minTemp.textContent = Math.floor(Number(data.main.temp_min) - 273)+'°C'
        feelTemp.textContent  = Math.floor(Number(data.main.feels_like) - 273)+'°C'
        sunrise.textContent = data.sys.sunrise;
        sunset.textContent = data.sys.sunset;
        humidity.textContent = data.main.humidity+'%';
        pressure.textContent = Math.floor(Number(data.main.pressure)*0.75006) + ' mm of Hg';
        windSpeed.textContent = data.wind.speed+' m/s';
        windDegree.textContent = data.wind.deg+'°'
        visibility.textContent = Number(data.visibility)/1000+'m';
        lastCity = data.name;
    })
    .catch((error)=>{
        console.log(error);
        generateData(lastCity);
        alert('Some error occured while fetching data\nPlease enter appropriate city name or try again later');
    })
}
 
generateData('Kathmandu');

function otherCitiesWeather()
{
    otherCities.forEach((element)=>{
        const x = Math.floor(Math.random() * 21);
        const city = randomCities[x];
        const api = `https://api.openweathermap.org/data/2.5/weather?q=` + city + `&appid=17c857e49921b81cb379e545970b4792`;
        fetch(api).then((response)=>{
            return response.json();
         }).then((data)=>{
            element.textContent = data.name;
            element.nextElementSibling.textContent = Math.floor(Number(data.main.temp) - 273)+'°C';
         })
    })
}



