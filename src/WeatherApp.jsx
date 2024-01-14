import React ,{ useEffect, useState }from 'react';
import './index.css'

import searchIcon from './assets/search.png';
import clearIcon from './assets/clear.png';
import cloudIcon from './assets/cloud.png';
import drizzleIcon from './assets/drizzle.png';
import humidityIcon from './assets/humidity.png';
import rainIcon from './assets/rain.png';
import snowIcon from './assets/snow.png';
import windIcon from './assets/wind.png';


function WeatherApp() {
    // You can put your api key here in replace of "process.env.REACT_APP_API_KEY"
    let apiKey = process.env.REACT_APP_API_KEY;

    const [weatherIcon, setWeatherIcon] = useState(clearIcon);
    const [Humidity, setHumidity] = useState('');
    const [Wind, setWind] = useState('');
    const [Temperature, setTemperature] = useState('');
    const [Location, setLocation] = useState('');
    
    async function findTumkurWeather() {
      let TumkurWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=tumkur&units=Metric&appid=${apiKey}`;

      try {
          let TumkurWeatherResponse = await fetch(TumkurWeatherUrl);
          let tumkurWeatherdata = await TumkurWeatherResponse.json();

          const Tumkurtemperature = Math.floor(tumkurWeatherdata.main.temp) + "° C";
          const TumkurWind = Math.floor(tumkurWeatherdata.wind.speed) + " km/h ";
          const TumkurHumidity = tumkurWeatherdata.main.humidity + " % ";
          const TumkurLocation = tumkurWeatherdata.name;
          let TumkurWeatherIcon;

          if (tumkurWeatherdata.weather[0].icon === "01d" || tumkurWeatherdata.weather[0].icon === "01n") {
              TumkurWeatherIcon = clearIcon;
          } else if (tumkurWeatherdata.weather[0].icon === "02d" || tumkurWeatherdata.weather[0].icon === "02n") {
              TumkurWeatherIcon = cloudIcon;
          } else if (tumkurWeatherdata.weather[0].icon === "03d" || tumkurWeatherdata.weather[0].icon === "03n") {
              TumkurWeatherIcon = drizzleIcon;
          } else if (tumkurWeatherdata.weather[0].icon === "04d" || tumkurWeatherdata.weather[0].icon === "04n") {
              TumkurWeatherIcon = drizzleIcon;
          } else if (tumkurWeatherdata.weather[0].icon === "09d" || tumkurWeatherdata.weather[0].icon === "09n") {
              TumkurWeatherIcon = rainIcon;
          } else if (tumkurWeatherdata.weather[0].icon === "10d" || tumkurWeatherdata.weather[0].icon === "10n") {
              TumkurWeatherIcon = rainIcon;
          } else if (tumkurWeatherdata.weather[0].icon === "13d" || tumkurWeatherdata.weather[0].icon === "13n") {
              TumkurWeatherIcon = snowIcon;
          } else {
              TumkurWeatherIcon = clearIcon;
          }

          setTemperature(Tumkurtemperature);
          setWind(TumkurWind);
          setHumidity(TumkurHumidity);
          setLocation(TumkurLocation);
          setWeatherIcon(TumkurWeatherIcon);
      } catch (error) {
          console.error('Error fetching Tumkur weather:', error);
      }
  }
  
  useEffect(() => {
    findTumkurWeather();
  },[]);

  const search = async () => {
    const element = document.getElementsByClassName("cityInput");
    if (element[0].value === "") {
        return 0;
    }
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${element[0].value}&units=Metric&appid=${apiKey}`;

    try {
        let response = await fetch(url);
        let data = await response.json();

        const newHumidity = data.main.humidity + " % ";
        const newWind = Math.floor(data.wind.speed) + " km/h ";
        const newTemperature = Math.floor(data.main.temp) + "° C";
        const newLocation = data.name;

        setHumidity(newHumidity);
        setWind(newWind);
        setTemperature(newTemperature);
        setLocation(newLocation);

        let newWeatherIcon;
        if (data.weather[0].icon === "01d" || data.weather[0].icon === "01n") {
            newWeatherIcon = clearIcon;
        } else if (data.weather[0].icon === "02d" || data.weather[0].icon === "02n") {
            newWeatherIcon = cloudIcon;
        } else if (data.weather[0].icon === "03d" || data.weather[0].icon === "03n") {
            newWeatherIcon = drizzleIcon;
        } else if (data.weather[0].icon === "04d" || data.weather[0].icon === "04n") {
            newWeatherIcon = drizzleIcon;
        } else if (data.weather[0].icon === "09d" || data.weather[0].icon === "09n") {
            newWeatherIcon = rainIcon;
        } else if (data.weather[0].icon === "10d" || data.weather[0].icon === "10n") {
            newWeatherIcon = rainIcon;
        } else if (data.weather[0].icon === "13d" || data.weather[0].icon === "13n") {
            newWeatherIcon = snowIcon;
        } else {
            newWeatherIcon = clearIcon;
        }
        setWeatherIcon(newWeatherIcon);
    } catch (error) {
        console.error('Error fetching weather:', error);
    }
  }
  return (
    <>
    <div className='bg-blue-500 w-[600px] h-[830px] m-auto mt-20 rounded-xl  sm:mt-4 md:mt-10 md:w-[625px] lg:w-[1000px] xl:w-[1250px] xl:h-[1000px] xl:py-16 2xl:w-[1450px] 2xl:h-[1100px] 2xl:py-28'>
      <h1 className='heading flex justify-center translate-y-12 translate-x-2 text-3xl text-slate-300'>WeatherSphere - Your Forecast Haven</h1>
      <div className='flex justify-center gap-4 pt-16'>
        <input className='cityInput flex w-96 h-16 bg-white border-none outline-none rounded-[40px] pl-10 text-neutral-500 font-normal focus:outline-blue-200' type="text" placeholder='Search...'/>
        <div className='flex justify-center items-center w-16 h-16 rounded-3xl bg-white cursor-pointer hover:bg-slate-200'>
          <img src={searchIcon} alt="search icon" onClick={search}/>
        </div>
      </div>
      <div className='flex justify-center mt-7'>
        <img src={weatherIcon} className='weather-icon'/>
      </div>
      <div className='flex justify-center text-white text-9xl font-normal'>
        {Temperature}
      </div>
      <div className='flex justify-center text-white text-6xl font-normal'>
        {Location}
      </div>
      <div className='flex justify-center mt-7 gap-16'>
      <div className='flex justify-center mt-12 text-white'>
        <div className='m-auto flex items-start gap-4'>
          <img src={humidityIcon} alt="" className='mt-3'/>
          <div className='text-4xl font-normal'>
            <div>{Humidity}</div>
            <div className='text-xl font-normal'>Humidity</div>
          </div>
        </div>
      </div>
      <div className='flex justify-center mt-12 text-white'>
        <div className='m-auto flex items-start gap-4'>
          <img src={windIcon} alt="" className='mt-3'/>
          <div className='text-4xl font-normal'>
            <div>{Wind}</div>
            <div className='text-xl font-normal'>Wind speed</div>
          </div>
        </div>
      </div>
      </div>
    </div>
    </>
  )
}

export default WeatherApp;
