readme_content = """# 🌦️ Weather App

A simple and interactive **Weather Application** built with **HTML**, **CSS**, and **JavaScript**, that allows users to get current weather data for their location or any searched city using the **OpenWeatherMap API**.

---

## 🚀 Features

- 🌍 **Your Weather** – Fetches real-time weather data using your device’s geolocation.  
- 🔍 **Search Weather** – Lets you search weather information by city name.  
- ⏱️ **Live Temperature, Wind Speed, Humidity, and Cloudiness** data.  
- 🧭 **Dynamic UI Tabs** – Switch easily between "Your Weather" and "Search Weather" modes.  
- 💾 **Session Storage** – Remembers your location for faster reloads.  
- 🪄 **Smooth Animations and Responsive Design** – Works perfectly on desktop and mobile devices.

---

## 🧰 Tech Stack

| Component | Technology Used |
|------------|----------------|
| **Frontend** | HTML5, CSS3, JavaScript (ES6) |
| **API** | [OpenWeatherMap API](https://openweathermap.org/api) |
| **Icons & Flags** | OpenWeather & FlagCDN |
| **Storage** | Browser `sessionStorage` |
| **Location Access** | HTML5 Geolocation API |

---

## ⚙️ How It Works

1. When the user opens the app, it first asks for **location permission**.
2. If granted, it fetches weather data using the device’s **latitude** and **longitude**.
3. Alternatively, the user can **search any city** to view its weather details.
4. Data includes:
   - City & Country Flag  
   - Weather Description  
   - Temperature  
   - Wind Speed  
   - Humidity  
   - Cloudiness  

---

## 🗂️ Project Structure

WeatherApp/
│
├── index.html # Main structure and layout
├── style.css # Styling and responsiveness
├── script.js # Core logic and API integration
├── wind.png # Icons used in UI
├── humidity.png
├── clouds.png
├── Location.png
└── Search.jpg

---

## 🔑 API Setup

This project uses the **OpenWeatherMap API**.  
If you fork or clone it, you must use your own API key.

### Steps:
1. Go to [https://openweathermap.org/api](https://openweathermap.org/api)
2. Create a free account
3. Generate your **API key**
4. Open `script.js`
5. Replace the API key inside:
   ```js
   const API_KEY = "YOUR_API_KEY_HERE";


