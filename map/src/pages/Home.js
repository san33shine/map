import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker } from 'react-leaflet';
import L from 'leaflet'; 
import 'leaflet/dist/leaflet.css'; 
import axios from 'axios';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';
import InfoModal from '../components/InfoModal';

const Map = () => {
    const position = [1.404, 103.689]; 
    const [weatherMaps, setWeatherMaps] = useState([]);
    const [forecastArray, setForecastArray] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [selectedLocation, setSelectedLocation] = useState(null);

    useEffect(() => {

        const getLocationMap = async () => {

            try {
            const response = await axios.get('https://api.data.gov.sg/v1/environment/2-hour-weather-forecast');
            setWeatherMaps(response.data.area_metadata);
            setForecastArray(response.data.items[0].forecasts);
            } catch (error) {
            console.error('API Call failed:', error);
            }
        };
        
        getLocationMap();
    }, []);

    L.Icon.Default.mergeOptions({
        iconUrl: markerIcon,
        shadowUrl: markerShadow,
    });

    const handleShowModal = (location) => {
        setSelectedLocation(location);
        setShowModal(true);
    };
    
    const handleCloseModal = () => {
        setShowModal(false);
        setSelectedLocation(null);
    };

    return (
    <div>
      <MapContainer
        center={position}
        zoom={13}
        scrollWheelZoom={false}
        style={{ height: "1200px", width: "100%" }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {weatherMaps.map((location) => (
          <Marker
            key={location.name}
            position={[
              location.label_location.latitude,
              location.label_location.longitude,
            ]}
            eventHandlers={{
              click: () => handleShowModal(location),
            }}
          />
        ))}
      </MapContainer>

      {selectedLocation && (
        <InfoModal
          show={showModal}
          handleClose={handleCloseModal}
          location={selectedLocation}
          forecastArray={forecastArray}
        />
      )}
    </div>
    );
};

export default Map;