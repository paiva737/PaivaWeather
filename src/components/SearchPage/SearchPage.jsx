import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./SearchPage.css";

const SearchPage = () => {
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("BR");
  const navigate = useNavigate();

  const handleSearch = () => {
    if (city.trim()) {
      navigate(`/weather/${city},${country}`);
    }
  };

  return (
    <div className="search-page">
      <div className="overlay">
        <h1 className="logo">PaivaWeather</h1>
        <div className="search-form">
          <input
            type="text"
            value={city}
            placeholder="Digite o nome da cidade"
            onChange={(e) => setCity(e.target.value)}
            className="search-input"
          />
          <select
            className="country-select"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
          >
            <option value="BR">Brasil</option>
            <option value="US">Estados Unidos</option>
            <option value="PT">Portugal</option>
            <option value="AR">Argentina</option>
            <option value="FR">França</option>
            <option value="DE">Alemanha</option>
          </select>
          <button onClick={handleSearch} className="search-button">
            Buscar
          </button>
        </div>
      </div>
    </div>
  );
};

export default SearchPage;
