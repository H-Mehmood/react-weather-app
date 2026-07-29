import logo from './logo.svg';
import thunder from './img/thunder.png';
import './App.css';
import { useEffect, useState } from "react";

function App() {
  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState("");
  const apiKey = '7b7d4894c8868f1898bed5bcf275cda8';

  const fetchWeatherData = async () => {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
      );
      const data = await response.json();
      console.log(data);
      setWeatherData(data);
    } catch (error) {
      console.error(error);
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
