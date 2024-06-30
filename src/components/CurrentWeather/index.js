import './style.scss';



function CurrentWeather({ selectedCity, weatherInformation, setModalIsOpen }) {
  return (
    <div className="current-weather">
      <button className='current-weather__city-name' onClick={() => setModalIsOpen(true)}>
         { selectedCity?.name || 'Nincs kiválasztva' } 
      </button>

      <h1 className='current-weather__temprature'>
        { weatherInformation?.temperature_2m ? Math.round(weatherInformation?.temperature_2m) : '-'} °C
      </h1>

      <p className='current-weather__information'>
        { weatherInformation?.cloud_cover > 20 ? 'Felhős idő' : 'Tiszta idő' } 
        { weatherInformation?.rain > 0 ? '/ Eső lehetséges' : '' }
      </p>
      
    </div>
  )
}

export default CurrentWeather;
