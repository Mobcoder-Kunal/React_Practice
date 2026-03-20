function WeatherCard({ weather }) {
  console.log(weather);
  return (
    <div className="weather-card">
      {/* <h2>{weather.}</h2>*/}
      <p>Temperature: {weather.temp_C} °C</p>
      {/* <p>Weather: {weather.weather[0].main}</p>*/}
      <p>Humidity: {weather.humidity}%</p>
    </div>
  );
}

export default WeatherCard;
