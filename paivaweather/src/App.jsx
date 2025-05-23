import { BrowserRouter, Routes, Route } from "react-router-dom";
import SearchPage from "./components/SearchPage/SearchPage";
import WeatherPage from "./components/WeatherPage/WeatherPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SearchPage />} />
        <Route path="/weather/:city" element={<WeatherPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
