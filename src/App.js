import React, { useEffect, useState } from 'react';
import "./App.css";

// ... (previous imports)

import searchIcon from "./assets/search.png";
import drizzleIcon from "./assets/drizzle.png";
import cloudIcon from "./assets/cloud.jpg";
import sunIcon from "./assets/sun.jpg";
import rainIcon from "./assets/rain.jpg";
import snowIcon from "./assets/snow.jpg";
import humidityIcon from "./assets/humidity.png";
import windIcon from "./assets/wind.png";
import clearIcon from "./assets/clear.png";

const Weatherdetails = ({ icon, temp, location, country, wind, lattitude, longitude, humidity, humidityIcon, windIcon }) => {
  return (
    <>
      <div className='image'>
        <img src={icon} alt='sunimg' className='image' />
      </div> <br/>
      <div className='temp'>{temp}&deg;C</div>
      <div className='location'>{location}</div>
      <div className='country'>{country}</div>
      <div className='cord'>
        <div>
          <span className='lattitude'>lattitude</span>
          <span>{lattitude}</span>
        </div>
        <div>
          <span className='lattitude'>longitude</span>
          <span>{longitude}</span>
        </div>
      </div>
      <div className='data-container'>
        <div className='element'>
          <img src={humidityIcon} alt='humidity' height={"50px"} width={"50px"} />
          <div className='humidity-percent'>{humidity}%</div>
          <div className='text'>Humidity</div>
        </div>
        <div className='element'>
          <img src={windIcon} alt='wind' height={"50px"} width={"50px"} />
          <div className='wind-percent'>{wind} km/hr</div>
          <div className='text'>Wind Speed</div>
        </div>
      </div>
      <br />
    </>
  );
};

const App = () => {
  const [text, settext] = useState("chennai");
  const [icon, seticon] = useState(sunIcon);
  const [temp, settemp] = useState(0);
  const [location, setlocation] = useState("chennai");
  const [country, setcountry] = useState("IN");
  const [lattitude, setlattitude] = useState(0);
  const [longitude, setlongitude] = useState(0);
  const [humidity, sethumidity] = useState(0);
  const [wind, setwind] = useState(0);
  const [citynotfound, setcitynotfound] = useState(false);
  const [loading, setloading] = useState(false);

  const weatherIconMap = {
    "01d": clearIcon,
    "01n": clearIcon,
    "02d": cloudIcon,
    "02n": cloudIcon,
    "03d": drizzleIcon,
    "03n": drizzleIcon,
    "04d": drizzleIcon,
    "04n": drizzleIcon,
    "09d": rainIcon,
    "09n": rainIcon,
    "10d": rainIcon,
    "10n": rainIcon,
    "13d": snowIcon,
    "13n": snowIcon,
  };

  const handlecheck = (e) => {
    settext(e.target.value);
  };

  const search = async () => {
    setloading(true);
    let api_key = "43bfb34bb36f59630d50bc6999d2087e";
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${text}&appid=${api_key}&units=Metric`;

    try {
      let res = await fetch(url);
      let data = await res.json();

      if (data.cod === "404" || data.message === "city not found") {
        setcitynotfound(true);
      } else {
        sethumidity(data.main.humidity);
        setwind(data.wind.speed);
        setlattitude(data.coord.lat);
        setlongitude(data.coord.lon);
        settemp(data.main.temp);
        setlocation(text);
        setcountry(data.sys.country);

        const weatherIconcode = data.weather[0].icon;
        seticon(weatherIconMap[weatherIconcode] || clearIcon);
        setcitynotfound(false);
      }
    } catch (error) {
      console.error("An error occurred", error.message);
    } finally {
      setloading(false);
    }
  };

  const handlekeydown = (e) => {
    if (e.key === "Enter") {
      search();
      // settext("");
    }
  };

  useEffect(() => {
    search();
  }, []);

  return (
    <>
      <div className='container'>
        <div className='input-container'>
          <input
            type='text'
            className='city-input'
            placeholder='search city'
            onChange={handlecheck}
            value={text}
            onKeyDown={handlekeydown}
          />
          <div className='search-icon'>
            <img src={searchIcon} alt='searchicon' height={"20px"} onClick={search} />
          </div>
        </div>
        {citynotfound && <div className='ct'>City not found</div>}
        {!citynotfound && <Weatherdetails icon={icon} temp={temp} location={location} country={country} wind={wind} lattitude={lattitude} longitude={longitude} humidity={humidity} humidityIcon={humidityIcon} windIcon={windIcon} />}
        <p className='footer'>Designed by <span>Sathish Kumar</span></p>
      </div>
    </>
  );
};

export default App;