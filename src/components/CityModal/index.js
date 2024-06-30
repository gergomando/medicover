import Modal from 'react-modal';
import { useEffect, useState } from 'react';
import './style.scss';

function CityModal({
  selectedCity = undefined,
  modalIsOpen = false,
  setSelectedCity = () => {},
  setModalIsOpen = () => {},
  loadWeatherInformation = () => {}
}) {
  const [cities, setCities] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  const getCityApiUrl = (cityName) => {
    const city = encodeURIComponent(cityName);

    return `https://geocoding-api.open-meteo.com/v1/search?name=${city}&count=10&language=en&format=json`;
  }

  const searchForCities = event => {
    fetch(getCityApiUrl(event.target.value))
      .then(response => response.json())
      .then(data => setCities((data || {}).results))
      .catch(error => console.error(error));
  }

  const selectCity = event => {
    const city = cities.find(city => city.id === parseInt(event.target.value));
    
    if (!!city) {
      setSelectedCity(city);
      setModalIsOpen(false);
      loadWeatherInformation(city.latitude, city.longitude);
    }
  }

  return (
    <div className="city-modal">
      <Modal
        ariaHideApp={false}
        isOpen={modalIsOpen}
        contentLabel="Example Modal"
        className="city-modal__wrapper"
      >
        { selectedCity && 
        <button 
          className="city-modal__close-button" 
          onClick={() => setModalIsOpen(false)}
          >
            close
        </button>
        }
        <form>
          <h4 className='city-modal__title'>
            Gépeld be kedvenc városod nevét.
          </h4>
          <input 
            className="city-modal__search-input"
            name="cityName"
            type="text"
            onChange={searchForCities}
          />
          { Array.isArray(cities) && !!cities.length &&
            <>
              <h4>Kérlek válassz az alábbi listából:</h4>
              <select 
                className="city-modal__select" 
                name="city"
                value={selectedCity?.id}
                onChange={selectCity}
                >
                <option value="">-</option>
                { cities.map(city =>
                  <option value={city.id} key={city.id}>
                    { city.name  } - { city.country }
                  </option>
                )}
              </select>
            </>
          }
        </form>
      </Modal>
    </div>
  );
}

export default CityModal;
