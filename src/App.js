import './App.css';
import { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import WeatherBox from './component/WeatherBox';
import WeatherButton from './component/WeatherButton';
import ClipLoader from "react-spinners/ClipLoader";

function App() {
  const [weather, setWeather] = useState(null);
  const [city, setCity] = useState('');
  const [loading, setLoading] = useState(true);
  const [selectedCity, setSelectedCity] = useState('');

  const cities = ['seoul', 'paris', 'new york', 'tokyo'];

  const getCurrentLocation = () => {
    navigator.geolocation.getCurrentPosition((position) => {
      let lat = position.coords.latitude;
      let lon = position.coords.longitude;

      getWeatherByCurrentLocation(lat, lon);
      setSelectedCity('');
    });
  }

  const apiKey = process.env.REACT_APP_WEATHER_APP_API_KEY;

  const getWeatherByCurrentLocation = async (lat, lon) => {
    let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`
    setLoading(true);
    let response = await fetch(url);
    let data = await response.json();
    console.log(data);
    setWeather(data);
    setLoading(false);
  }

  const getWeatherByCity = async () => {
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    setLoading(true);
    let response = await fetch(url);
    let data = await response.json();
    console.log(data);
    setWeather(data);
    setLoading(false);
  }

  const handleSetCity = (city) => {
    setCity(city);
    setSelectedCity(city);
  };

  useEffect(() => {
    if (city === "") {
      getCurrentLocation();
    } else {
      getWeatherByCity();
    }
  }, [city])

  return (
    <div>
      {loading ? (
        <div className='container'>
          <ClipLoader
            color="#f88cb6"
            loading={loading}
            size={150}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
        </div>
      ) : (
        <div className='container'>
          <WeatherBox weather={weather} />
          <WeatherButton cities={cities} setCity={handleSetCity} getCurrentLocation={getCurrentLocation} selectedCity={selectedCity}/>
        </div>
      )}
    </div>
  );
}

export default App;
