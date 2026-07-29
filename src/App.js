import logo from './logo.svg';
import thunder from './img/thunder.png';
import './App.css';
import { useEffect, useState } from "react";

function App() {
  const [city, setCity] = useState("");
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
  
  return (
    <div className="App">
      <div className="container">
        <h1 className="container_date">{currentDate}</h1>
        <div className="weather_data">
          <h2 className="container_city">{city}</h2>
          <img src={thunder} className="container_img" alt="logo" />
          <h2 className="container_degree">25°C</h2>
          <h2 className="country_per">sunny</h2>
          
        </div>
      </div>
    </div>
  );
}

export default App;
