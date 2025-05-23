import WeatherForecast from "../WeatherForecast/WeatherForecast";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./WeatherPage.css";

const WeatherPage = () => {
  const { city } = useParams();
  const [weather, setWeather] = useState(null);

  const API_KEY = "06dfcadb4db087afb68800a604f82abf";

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const response = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather`,
          {
            params: {
              q: city,
              appid: API_KEY,
              units: "metric",
              lang: "pt_br",
            },
          }
        );
        setWeather(response.data);
      } catch (error) {
        console.error("Erro ao buscar clima:", error);
        setWeather(null);
      }
    };

    fetchWeather();
  }, [city]);

  return (
    <div className="weather-page">
      <div className="blur-overlay">
        {weather ? (
          <>
          <div className="weather-info">
  <h1>{weather.name}</h1>
  <p className="temp-highlight">{Math.round(weather.main.temp)}°C</p>
<p className="temp-range">
  ↑ {Math.round(weather.main.temp_max)}°C &nbsp;&nbsp; ↓ {Math.round(weather.main.temp_min)}°C
</p>

  <div className="weather-cards">
    <div className="info-card">
      <p className="label">Clima</p>
      <p>{weather.weather[0].description}</p>
    </div>
    <div className="info-card">
      <p className="label">Sensação</p>
      <p>{Math.round(weather.main.feels_like)}°C</p>
    </div>
    <div className="info-card">
      <p className="label">Umidade</p>
      <p>{weather.main.humidity}%</p>
    </div>
    <div className="info-card">
      <p className="label">Vento</p>
      <p>{weather.wind.speed} km/h</p>
    </div>
  </div>
</div>


           
            <WeatherForecast city={city} />
          </>
        ) : (
          <p className="loading">Carregando dados...</p>
        )}
      </div>
    </div>
  );
};

export default WeatherPage;
