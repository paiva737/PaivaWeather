import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./RecentCities.css";

const RecentCities = () => {
  const [cities, setCities] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("recentCities")) || [];
    setCities(stored);
  }, []);

  const handleClick = (cityObj) => {
    const stored = JSON.parse(localStorage.getItem("recentCities")) || [];
    const updated = [cityObj, ...stored.filter(c => c.value !== cityObj.value)];
    localStorage.setItem("recentCities", JSON.stringify(updated.slice(0, 5)));
    setCities(updated.slice(0, 5));
    navigate(`/weather/${cityObj.value}`);
  };

  return (
    <div className="recent-cities">
      {cities.map((city, index) => (
        <button key={index} className="city-btn" onClick={() => handleClick(city)}>
          {city.display}
        </button>
      ))}
    </div>
  );
};

export default RecentCities;
