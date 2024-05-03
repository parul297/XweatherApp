import { useState } from "react";
import './Weather.css'
import WeatherCard from "./WeatherCard";

const WeatherApp = () => {
  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const apiKey = "1d93002d8f744bbb81b153444242802";

  const handleSearch = () => {
    if (city.trim() === "") {
      alert("Please enter a city name");
      return;
    }

    setLoading(true);
    setError("");

    fetch(`https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch weather data");
        }
        return response.json();
      })
      .then((data) => {
        setWeatherData(data);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        setError(error.message);
      });
  };

  return (
    <div className="container">
      <input
        type="text"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        placeholder="Enter city name"
        className="cityInput"
      />
      <button className="search-button" onClick={handleSearch}>
        Search
      </button>
      {loading && <p className="loading">Loading data...</p>}
      {error && alert(error)}
      {weatherData && (
        <div className="weather-cards">
          <WeatherCard
            title="Temperature"
            value={`${weatherData.current.temp_c} °C`}
          />
          <WeatherCard
            title="Humidity"
            value={`${weatherData.current.humidity}%`}
          />
          <WeatherCard
            title="Condition"
            value={weatherData.current.condition.text}
          />
          <WeatherCard
            title="Wind Speed"
            value={`${weatherData.current.wind_kph} kph`}
          />
        </div>
      )}
    </div>
  );
};

export default WeatherApp;
