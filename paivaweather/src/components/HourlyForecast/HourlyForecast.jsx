import { useEffect, useState } from "react";
import axios from "axios";
import "./HourlyForecast.css";

const HourlyForecast = ({ city }) => {
  const [hourlyData, setHourlyData] = useState([]);

  const API_KEY = "06dfcadb4db087afb68800a604f82abf";

  useEffect(() => {
    const fetchHourly = async () => {
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

        // Pegamos apenas as próximas 6 horas
        const nextHours = response.data.list.slice(0, 6);
        setHourlyData(nextHours);
      } catch (error) {
        console.error("Erro ao buscar previsão por hora:", error);
      }
    };

    if (city) {
      fetchHourly();
    }
  }, [city]);

  const formatHour = (dtTxt) => {
    const date = new Date(dtTxt);
    return date.toLocaleTimeString("pt-BR", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="hourly-container">
      <h2>Próximas horas</h2>
      <div className="hourly-scroll">
        {hourlyData.map((hour, index) => (
          <div className="hour-card" key={index}>
            <p className="hour">{formatHour(hour.dt_txt)}</p>
            <img
              src={`https://openweathermap.org/img/wn/${hour.weather[0].icon}@2x.png`}
              alt={hour.weather[0].description}
            />
            <p className="temp">{Math.round(hour.main.temp)}°C</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HourlyForecast;
