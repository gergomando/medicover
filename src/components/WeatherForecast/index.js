import './style.scss';
import { DAYS } from '../../constants';

function WeatherForecast({ weatherInformation }) {
  return (
    <div className="weather-forecast">
      <p className="weather-forecast__title">
        7 napos előrejelzés
      </p>

      <div className="weather-forecast__days">
        { (weatherInformation?.time || []).map((date, dateIndex) =>
          <div className="weather-forecast__day" key={date}>
            <p className="weather-forecast__day-label">
              { DAYS[new Date(date).getDay()] }
            </p>

            <div className="weather-forecast__day-sunshine">
              <img height="25" src={weatherInformation.rain_sum[dateIndex] > 1 ? '/images/rain.svg' : '/images/sun.svg'} />
              <span>{ Math.round(weatherInformation.rain_sum[dateIndex]) } mm</span>
            </div>

            <p className="weather-forecast__day-temprature">
              <span className="weather-forecast__day-temprature__value">
                { Math.round(weatherInformation.temperature_2m_min[dateIndex]) } °C
              </span>
              <span className="weather-forecast__day-temprature__slash">
                /
              </span>
              <span className="weather-forecast__day-temprature__value">
                { Math.round(weatherInformation.temperature_2m_max[dateIndex]) } °C
              </span>
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

export default WeatherForecast;
