import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Weather.css'; 

const Weather = ({ selectedRegion, onRegionChange }) => {
  const [weather, setWeather] = useState(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const apiKey = 'cf75f18af860230d8ee7c926c04aac33'; 
  const baseUrl = 'https://api.openweathermap.org/data/2.5/weather';

  const regions = [
    { name: 'Farg\'ona', apiName: 'Fergana' },
    { name: 'Toshkent', apiName: 'Tashkent' },
    { name: 'Samarqand', apiName: 'Samarkand' },
    { name: 'Andijon', apiName: 'Andijan' },
    { name: 'Namangan', apiName: 'Namangan' },
    { name: 'Guliston', apiName: 'Gulistan' },
    { name: 'Jizzax', apiName: 'Jizzakh' },
    { name: 'Xorazm', apiName: 'Khorezm' },
    { name: 'Qashqadaryo', apiName: 'Qashqadaryo' },
    { name: 'Surxondaryo', apiName: 'Surxondaryo' },
    { name: 'Navoiy', apiName: 'Navoi' },
    { name: 'Nukus', apiName: 'Nukus' },
  ];

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const response = await axios.get(baseUrl, {
          params: {
            q: regions.find(region => region.name === selectedRegion)?.apiName,
            appid: apiKey,
            units: 'metric',
            lang: 'uz',
          },
        });
        setWeather({
          temperature: Math.floor(response.data.main.temp),
          iconUrl: `https://openweathermap.org/img/wn/${response.data.weather[0].icon}.png`,
          city: response.data.name,
        });
      } catch (error) {
        console.error("Error fetching weather data:", error);
      }
    };

    fetchWeather();
  }, [selectedRegion, apiKey]);

  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  const handleRegionChange = (region) => {
    onRegionChange(region);
    setIsDropdownOpen(false);
  };

  return (
    <div className="weather-dropdown">
      <div className="weather" onClick={toggleDropdown}>
        {weather ? (
          <div className="weather-info">
            <img src={weather.iconUrl} className='only-desktop' alt="weather icon" />
            <span>{weather.temperature}°C</span>
            <span className='region'>{weather.city}</span>
          </div>
        ) : (
          <div>Loading...</div>
        )}
      </div>
      {isDropdownOpen && (
        <div className="dropdown-menu">
          {regions.map(({ name }) => (
            <div
              key={name}
              onClick={() => handleRegionChange(name)}
              className="dropdown-item"
            >
              {name}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Weather;