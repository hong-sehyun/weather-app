import './App.css';
import { useEffect, useState } from 'react';
import WeatherBox from './component/WeatherBox';
import WeatherButton from './component/WeatherButton';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {

  const [weather, setWeather] = useState(null);
  const getCurrentLocation = () => {
    navigator.geolocation.getCurrentPosition((position) => {
      let lat = position.coords.latitude
      let lon = position.coords.longitude

      getWeatherByCurrentLocation(lat, lon)
    });
  }

  const getWeatherByCurrentLocation = async(lat, lon) => {
    let apiKey = process.env.REACT_APP_WEATHER_APP_API_KEY;
    let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`
    let response = await fetch(url);
    let data = await response.json();
    console.log(data);
    setWeather(data);
  }

  useEffect(() => {
    getCurrentLocation();
  }, [])
  return (
    <div>
      <div className='container'>
        <WeatherBox weather={weather}/>
        <WeatherButton/>
      </div>
    </div>
  );
}

export default App;
