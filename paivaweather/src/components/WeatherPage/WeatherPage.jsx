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
          <div className="weather-info">
            <h1>{weather.name}</h1>
            <p>Temperatura: {weather.main.temp}°C</p>
            <p>Clima: {weather.weather[0].description}</p>
            <p>Sensação térmica: {weather.main.feels_like}°C</p>
            <p>Umidade: {weather.main.humidity}%</p>
            <p>Vento: {weather.wind.speed} km/h</p>
          </div>
        ) : (
          <p className="loading">Carregando dados...</p>
        )}
      </div>
    </div>
  );
};

export default WeatherPage;
