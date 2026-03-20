import { useState } from "react";
import WeatherCard from "../components/WeatherCard";
import "../styles/weather.css";

function WeatherPage() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);

  const getWeather = async () => {
    if (!city) return;
    const result = await fetch(`https://wttr.in/${city}?format=j1`);
    const data = await result.json();

    console.log(data);
    const current = data["data"]["current_condition"][0];
    console;
    console.log(current);
    setWeather(current);
    setLoading(false);
  };

  return (
    <div className="weather-container">
      <h2> Weather App </h2>
      <input
        value={city}
        onChange={(e) => setCity(() => e.target.value)}
        placeholder="Enter city name"
      />

      <button onClick={getWeather}> Search </button>

      {loading && <p> Loading... </p>}
      {weather && <WeatherCard weather={weather} />}
    </div>
  );
}

export default WeatherPage;
