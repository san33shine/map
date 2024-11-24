import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Button } from 'react-bootstrap';
import Modal from 'react-bootstrap/Modal';
import '../css/info.css';
import Cloudy from '../static/cloudy.png';
import NotFound from '../static/not-found.png';
import Rainy from '../static/rainy.png';
import PartlyCloudy from '../static/partly-cloudy.png';
import Sunny from '../static/sunny.png';
import ThunderyShowers from '../static/thundery-showers.png'
import HumidityChart from './HumidityChart';
import RadiationChart from './RadiationChart';
import TemperatureChart from './TemperatureChart';

const InfoModal = ({ show, handleClose, location, forecastArray }) => {
    const [ rhTime, setRhTime ] = useState([]);
    const [ relativeHumidity, setRelativeHumidity ] = useState([]);
    const [ directRadiation, setDirectRadiation ] = useState([]);
    const [ temperatureDay, setTemperatureDay ] = useState([]);
    const [ maxTempArray, setMaxTempArray ] = useState([]);
    const [ minTempArray, setMinTempArray ] = useState([]);
    const [ locationWeather, setLocationWeather ] = useState(null);

    const weatherIcons = {
      'Cloudy': Cloudy,
      'Sunny': Sunny,
      'Rainy': Rainy,
      'Partly-Cloudy': PartlyCloudy,
      'Thundery Showers': ThunderyShowers,
    };

    const getWeatherImage = (weatherCondition) => {
      return weatherIcons[weatherCondition] || NotFound; 
    };

    useEffect(() => {

      const getOtherData = async () => {
        const baseUrl = "https://api.open-meteo.com/v1/forecast";
        const params = {
            latitude: location.label_location.latitude || null,
            longitude: location.label_location.longitude || null,
            hourly: "relativehumidity_2m,direct_radiation",
            daily: "temperature_2m_max,temperature_2m_min",
            timezone: "Asia/Singapore",
            start_date: '2024-11-23',
            end_date: '2024-11-30',
          };
        const url = `${baseUrl}?${new URLSearchParams(params)}`;

        try {
          const response = await axios.get(url);
          const data = response.data;
          setRhTime(data.hourly.time);
          setRelativeHumidity(data.hourly.relativehumidity_2m);
          setDirectRadiation(data.hourly.direct_radiation);
          setTemperatureDay(data.daily.time);
          setMaxTempArray(data.daily.temperature_2m_max);
          setMinTempArray(data.daily.temperature_2m_min);
          const weather = forecastArray.find(forecast => forecast.area === location.name).forecast
          setLocationWeather(weather);
        } catch (error) {
          console.error('API call failed:', error);
        }
    };

    getOtherData();
  }, [forecastArray, location]);

  return (
    <Modal show={show} onHide={handleClose} centered className="info-modal">
      <Modal.Header className='modal-header'>
        <Modal.Title><h2>{location.name}</h2></Modal.Title>
        <Button variant="secondary" className='close-button'onClick={handleClose}>
          x
        </Button>
      </Modal.Header>
      <Modal.Body>
        <div id='humidity'>
          <HumidityChart
            rhTime={rhTime}
            relativeHumidity={relativeHumidity}
          />
        </div>
        <div id='radiation'>
          <RadiationChart id='rad-chart'
            rhTime={rhTime}
            directRadiation={directRadiation}
          />
        </div>
        <div id='temperature'>
          <TemperatureChart id='temperature-chart'
            temperatureDay={temperatureDay}
            minTempArray={minTempArray}
            maxTempArray={maxTempArray}
          />
        </div>
        <div id='weather'>        
          <p>{locationWeather}</p>
          <img 
            src={getWeatherImage(locationWeather)}
            alt={locationWeather} 
          />
        </div>
      </Modal.Body>

    </Modal>
  )
}

export default InfoModal