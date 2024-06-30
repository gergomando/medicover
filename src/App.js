import { useEffect, useState } from 'react';
import './App.scss';
import CityModal from './components/CityModal';
import CurrentWeather from './components/CurrentWeather';
import WeatherForecast from './components/WeatherForecast';
import WeatherChart from './components/WeatherChart';

function App() {
  const cityInStorage = JSON.parse(localStorage.getItem('city'));
  const [modalIsOpen, setModalIsOpen] = useState(!cityInStorage);
  const [selectedCity, setSelectedCity] = useState(cityInStorage);
  const [weatherInformation, setWeatherInformation] = useState({});

  const loadWeatherInformation = (
    latitude = selectedCity?.latitude, 
    longitude = selectedCity?.longitude
  ) => {
    if (!latitude || !longitude) 
      return;

    const apiURL = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,rain,cloud_cover&daily=temperature_2m_max,temperature_2m_min,sunshine_duration,precipitation_probability_max`; 
    fetch(apiURL)
      .then(response => response.json())
      .then(data => setWeatherInformation(data))
      .catch(error => console.error(error));
  }

  useEffect(() =>{ 
    if (cityInStorage) 
      loadWeatherInformation();
  }, []);

  return (
    <div className="app">
      <div className="container">
        <div className="weather">
          <div className="sidebar">
            <CurrentWeather
              selectedCity={selectedCity}
              weatherInformation={weatherInformation.current}
              setModalIsOpen={setModalIsOpen}
            />
          </div>
          <div className="main-content">
            <WeatherForecast weatherInformation={weatherInformation.daily} />
            <WeatherChart weatherInformation={weatherInformation.daily} />
          </div>
        </div>

        <div className='author'>
          Mándó Gergő
        </div>
      </div>
      <CityModal
        selectedCity={selectedCity}
        modalIsOpen={modalIsOpen}
        setModalIsOpen={setModalIsOpen}
        setSelectedCity={setSelectedCity}
        loadWeatherInformation={loadWeatherInformation}
      />
    </div>
  );
}

export default App;
