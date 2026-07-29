import logo from './logo.svg';
import thunder from './img/thunder.png';
import './App.css';
import { useEffect, useState } from "react";

function App() {
  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const apiKey = process.env.REACT_APP_WEATHER_API_KEY;

  const fetchWeatherData = async () => {
    if (!apiKey) {
      setWeatherData("");
      setErrorMessage("Please configure REACT_APP_WEATHER_API_KEY in your environment.");
      return;
    }

    setErrorMessage("");

    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
      );
      const data = await response.json();

      if (!response.ok || data.cod !== 200) {
        setWeatherData("");
        setErrorMessage(data.message || "Unable to fetch weather data. Please try again.");
        return;
      }

      setWeatherData(data);
    } catch (error) {
      console.error(error);
      setWeatherData("");
      setErrorMessage("Something went wrong while fetching weather data.");
    }
  };

  const currentDate = new Date().toLocaleDateString("en-US", {
    month: "short",
    day: "2-digit",
    year: "numeric",
  });

  useEffect(() => {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported by your browser.");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;

        try {
          const response = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
          );

          const data = await response.json();

          const city =
            data.address.city ||
            data.address.town ||
            data.address.village ||
            data.address.state;

          setCity(city);
          
        } catch (error) {
          console.error(error);
        }
      },
      (error) => {
        console.error(error);
      }
    );

  }, []);
  
  useEffect(() => {
    if (city) {
      fetchWeatherData();
    }
  }, [city]);

  return (
    <div className="App">
      <div className="container">
        <h1 className="container_date">{currentDate}</h1>
        <div className="weather_data">
          {weatherData && weatherData.main ? (
            <>
              <h2 className="container_city">{weatherData.name}</h2>
              <img
                src={thunder}
                className="container_img"
                alt="logo"
              />
              <h2 className="container_degree">{Math.round(weatherData.main.temp)}°C</h2>
              <h2 className="country_per">{weatherData.weather[0].description}</h2>
            </>
          ) : null}
          {errorMessage ? <p className="error_message">{errorMessage}</p> : null}
          <form className='form' onSubmit={(e) => { e.preventDefault(); fetchWeatherData(); }}>
            <input type='text' className='input' placeholder="Enter city name..." onChange={(e) => setCity(e.target.value)} />
            <button type='submit' className='btn'>Search</button>
          </form>
          
        </div>
      </div>
    </div>
  );
}

export default App;
