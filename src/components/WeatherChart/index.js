import './style.scss';
import Chart from "react-apexcharts";
import { DAYS } from '../../constants';

function WeatherChart({ weatherInformation }) {
  const chartData = {  
    series: [
      {
        data: weatherInformation ? weatherInformation.temperature_2m_max.map(temp => Math.round(temp)) : []
      },
      {
        data: weatherInformation ? weatherInformation.temperature_2m_min.map(temp => Math.round(temp)) : []
      }
    ],
    options: {
      chart: {
        height: 350,
        type: 'line',
        dropShadow: {
          enabled: true,
          color: 'white',
          top: 18,
          left: 7,
          blur: 10,
          opacity: 0.2
        },
        zoom: {
          enabled: false
        },
        toolbar: {
          show: false
        }
      },
      colors: ['#ff8181','#77B6EA'],
      dataLabels: {
        enabled: true,
      },
      stroke: {
        curve: 'smooth'
      },
      title: {
        text: '',
        align: 'left',
      },
      grid: {
        borderColor: '#e7e7e7',
        row: {
          colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
          opacity: 0.5
        },
      },
      markers: {
        size: 1
      },
      xaxis: {
        categories: weatherInformation?.time.map(date => DAYS[new Date(date).getDay()]),
        title: {
          text: ''
        }
      },
      yaxis: {
        title: {
          text: 'Hőmérséklet',
          style: {
            color: 'white',
            fontSize: '20px',
            fontWeight: 400
          }
        },
        min: 0,
        max: 40
      },
      legend: {
        show: false,
        showForSingleSeries: false,
        showForNullSeries: false,
        showForZeroSeries: false,
        position: 'top',
        horizontalAlign: 'right',
        floating: false,
        offsetY: -25,
        offsetX: -5
      },
      tooltip: {
        enabled: false
      }
    }
  };

  return (
    <div className="weather-chart">
        <Chart options={chartData.options} series={chartData.series} type="line" height={350} />
    </div>
  )
}

export default WeatherChart;
