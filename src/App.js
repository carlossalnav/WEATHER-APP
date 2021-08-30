
import React, { useState } from "react"
import Clock from "./components/Clock/Clock"
import Loading from "./components/Loading/Loading";
const api = {
  key: "87a59d01e60b5a6d745b08b22363a38d",
  base: "https://api.openweathermap.org/data/2.5/"
}

function App() {

  const[query, setQuery] = useState("");
  const[weather, setWeather] = useState({});

  const search = evt => {
    if (evt.key === "Enter" ){
      fetch(`${api.base}weather?q=${query}&units=metric&appid=${api.key}`)
      .then(res => res.json())
      .then(result => {
        setWeather(result);
        setQuery("");
        console.log(result);
      })
    }
  }
  const weatherLocation =  evt => {
    function success(pos) {
      var crd = pos.coords;
    
      console.log('Your current position is:');
      console.log('Latitude : ' + crd.latitude);
      console.log('Longitude: ' + crd.longitude);
      console.log('More or less ' + crd.accuracy + ' meters.');

      fetch(`${api.base}weather?lat=${crd.latitude}&lon=${crd.longitude}&units=metric&appid=${api.key}`)
      .then(res => res.json())
      .then(result => {
        setWeather(result);
        setQuery("");
        console.log(result);
      })
    };
    
    function error(err) {
      console.warn('ERROR(' + err.code + '): ' + err.message);
    };
    navigator.geolocation.getCurrentPosition(success, error);
  }

  let date = String(new window.Date());
  date = date.slice(3,15);

  return (
    <div className={(typeof weather.main != "undefined") 
    ? ((weather.main.temp > 18) 
      ? "app warm" : "app cold") : "app normal"}>
      <main>
        <div className="search-box">
          <input type="text" className="search-bar" placeholder="Search..." onChange={e => setQuery(e.target.value)} value={query} onKeyPress={search}/>
          
        </div>

        {(typeof weather.main == "undefined") ? (
          <div onLoad={weatherLocation()}>
            <Loading/>
        </div>
        ) : 
        <div>
          <div className="location-box">
            <div className="location">{weather.name}, {weather.sys.country}</div>
            <div className="date">{date}</div>
            <div className="time">
              <Clock/>
            </div>
          </div>

          <div className="weather-box">
            <div className="temp">{Math.round(weather.main.temp)}°</div>
            <div className="weather">
              {weather.weather[0].main}
              <img className="icon" src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}.png`}/>
            </div>
          </div>
      </div>
        }

      </main>
    </div>
  );
}

export default App;
