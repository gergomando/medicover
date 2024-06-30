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
    const value = event.target.value;
    setSearchTerm(value);

    fetch(getCityApiUrl(value))
      .then(response => response.json())
      .then(data => setCities((data || {}).results || []))
      .catch(error => console.error(error));
  }

  const selectCity = event => {
    const city = cities.find(city => city.id === parseInt(event.target.value));

    if (!!city) {
      setSelectedCity(city);
      setModalIsOpen(false);
      loadWeatherInformation(city.latitude, city.longitude);
      localStorage.setItem('city', JSON.stringify(city));
    }
  }

  return (
    <div className="city-modal">
      <Modal
        ariaHideApp={false}
        isOpen={modalIsOpen}
        contentLabel="Település-választó ablak"
        className="city-modal__wrapper"
      >
        { selectedCity && 
        <button 
          className="city-modal__close-button" 
          onClick={() => setModalIsOpen(false)}
          >
            x
        </button>
        }
        <form onSubmit={event => event.preventDefault()}>
          <img height="35" className="city-modal__image" src="/images/sun.svg" />
          <h4 className="city-modal__text">
            Keress rá kedvenc településed nevére, hogy láthasd az opciókat!
          </h4>
          <input 
            className="city-modal__search-input"
            name="cityName"
            type="text"
            value={searchTerm}
            onChange={searchForCities}
          />
          { Array.isArray(cities) &&
            <>
              <h4 className="city-modal__text">
                Kérlek válassz az alábbi listából:
              </h4>
              <select 
                className="city-modal__select" 
                name="city"
                value={selectedCity?.id}
                onChange={selectCity}
                >
                <option value="">
                  { !!cities.length ? '- válassz az alábbbi opciók közül -' : 'nincs találat' }
                  </option>
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
