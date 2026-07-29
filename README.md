# React Weather App

A responsive React weather application that shows current weather conditions for the user's current location or a manually searched city. The app uses the OpenWeatherMap API and browser geolocation to provide a simple and polished weather experience.

## Features

- Detects the user's location automatically using browser geolocation
- Allows manual city search for weather lookup
- Displays temperature, city name, and weather description
- Built with a clean and responsive interface

## Tech Stack

- React
- React Scripts
- OpenWeatherMap API
- CSS for styling

## Getting Started

1. Clone the repository:
   ```bash
   git clone <your-repo-url>
   cd react-weather-app
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a environment file for your API key:
   ```bash
   cp .env.example .env
   ```

4. Start the development server:
   ```bash
   npm start
   ```

## Environment Variables

Create a `.env` file in the project root and add your OpenWeatherMap API key:

```env
REACT_APP_WEATHER_API_KEY=your_openweather_api_key_here
```

> Note: The app will request permission to access your location for automatic weather detection, so your browser should allow geolocation access.

## Project Structure

- `src/App.js` - Main weather UI and API logic
- `src/App.css` - Styling for the app
- `public/` - Static assets and HTML template

## License

This project is licensed under the MIT License.

