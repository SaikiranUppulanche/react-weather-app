import "./App.css";
import CurrentWeather from "./componets/current_weather/CurrentWeather";
import Search from "./componets/search/Search";
import Forecast from "./componets/forecast/Forecast";
import { WEATHER_API_URL, WEATHER_API_KEY } from "./componets/Api";
import { useState } from "react";

function App() {
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState(null);

  const handleOnSearchChange = async (searchData) => {
    try {
      const [lat, lon] = searchData.value.split(" ");

      const currentWeatherFetch = fetch(
        `${WEATHER_API_URL}/weather?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`
      );
      const forecastFetch = fetch(
        `${WEATHER_API_URL}/forecast?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`
      );

      const response = await Promise.all([currentWeatherFetch, forecastFetch]);
      const currentWeatherResponse = await response[0].json();
      const forecastWeatherResponse = await response[1].json();
      setWeather({ city: searchData.label, ...currentWeatherResponse });
      setForecast({ city: searchData.label, ...forecastWeatherResponse });
    } catch (error) {
      console.log(error);
    }
  };

  console.log(weather);
  console.log(forecast);

  return (
    <div className="container">
      <Search onSearchChange={handleOnSearchChange} />
      {weather && <CurrentWeather data={weather} />}
      {forecast && <Forecast data={forecast} />}
    </div>
  );
}

export default App;
