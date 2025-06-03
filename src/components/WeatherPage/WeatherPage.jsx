import WeatherForecast from "../WeatherForecast/WeatherForecast";
import HourlyForecast from "../HourlyForecast/HourlyForecast";
import RecentCities from "../RecentCities/RecentCities";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./WeatherPage.css";

const WeatherPage = () => {
  const { city } = useParams();
  const [weather, setWeather] = useState(null);
  const [minTemp, setMinTemp] = useState(null);
  const [maxTemp, setMaxTemp] = useState(null);
  


  const API_KEY = "06dfcadb4db087afb68800a604f82abf";

  useEffect(() => {
    if (!city) return;

    setWeather(null);
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

        const cityObj = {
          display: response.data.name,
          value: city.toLowerCase()
        };
        
        if (cityObj.display && cityObj.value) {
          const stored = JSON.parse(localStorage.getItem("recentCities")) || [];
          const updated = [cityObj, ...stored.filter(c => c.value !== cityObj.value)];
          localStorage.setItem("recentCities", JSON.stringify(updated.slice(0, 5)));
        }
        
        


        setWeather(response.data);
      } catch (error) {
        console.error("Erro ao buscar clima:", error);
        setWeather(null);
      }
    };

    fetchWeather();
  }, [city]);

  

  useEffect(() => {
    const fetchForecastMinMax = async () => {
      try {
        const response = await axios.get(
          `https://api.openweathermap.org/data/2.5/forecast`,
          {
            params: {
              q: city,
              appid: API_KEY,
              units: "metric",
              lang: "pt_br",
            },
          }
        );

        const today = new Date().getDate();

        const todayTemps = response.data.list.filter((item) => {
          const date = new Date(item.dt_txt);
          return date.getDate() === today;
        });

        if (todayTemps.length > 0) {
          const temps = todayTemps.map((item) => item.main.temp);
          setMinTemp(Math.min(...temps));
          setMaxTemp(Math.max(...temps));
        } else {
          setMinTemp(null);
          setMaxTemp(null);
        }
      } catch (error) {
        console.error("Erro ao calcular min/max do dia:", error);
      }
    };

    if (city) {
      fetchForecastMinMax();
    }
  }, [city]);

  return (
    <div className="weather-page">
      <h1 className="logo" onClick={() => window.location.href = "/"}>PaivaWeather</h1>
      <div className="blur-overlay">
      <div className="weather-logo" onClick={() => window.location.href = "/"}>
     
    </div>

        {weather ? (
          <>
            <div className="weather-info">
              <RecentCities />
              <h1>{weather.name}</h1>
              <p className="temp-highlight">{Math.round(weather.main.temp)}°C</p>
              {minTemp !== null && maxTemp !== null && (
                <p className="temp-range">
                  ↑ {Math.round(maxTemp)}°C &nbsp;&nbsp; ↓ {Math.round(minTemp)}°C
                </p>
              )}
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
            <HourlyForecast city={city} />
          </>
        ) : (
          <p className="loading">Carregando dados...</p>
        )}
      </div>
    </div>
  );
};

export default WeatherPage;
