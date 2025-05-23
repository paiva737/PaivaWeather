import { useEffect, useState } from "react";
import axios from "axios";
import "./WeatherForecast.css";

const WeatherForecast = ({ city }) => {
  const [forecast, setForecast] = useState([]);

  const API_KEY = "06dfcadb4db087afb68800a604f82abf";

  useEffect(() => {
    const fetchForecast = async () => {
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

        
        const dailyData = response.data.list.filter((item) =>
          item.dt_txt.includes("12:00:00")
        );

        setForecast(dailyData.slice(0, 4)); 
      } catch (error) {
        console.error("Erro ao buscar previsão:", error);
      }
    };

    if (city) {
      fetchForecast();
    }
  }, [city]);

  const getDayName = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString("pt-BR", { weekday: "short" });
  };

  return (
    <div className="forecast-container">
      <h2>Próximos dias</h2>
      <div className="forecast-cards">
        {forecast.map((day, index) => (
          <div className="forecast-card" key={index}>
            <p className="day">{getDayName(day.dt_txt)}</p>
            <img
              src={`https://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`}
              alt={day.weather[0].description}
            />
            <p className="temp">{Math.round(day.main.temp)}°C</p>
            <p className="desc">{day.weather[0].description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WeatherForecast;
