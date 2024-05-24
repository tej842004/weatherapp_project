"use client";
import { useEffect, useState } from "react";
import styles from "./page.module.css";

interface Main {
  temp: number;
  feels_like: number;
  temp_min: number;
  temp_max: number;
  pressure: number;
  humidity: number;
}

interface Weather {
  id: number;
  main: string;
  description: string;
  icon: string;
}

interface WeatherData {
  name: string;
  weather: Weather[];
  main: Main;
}

function getCurrentDate(): string {
  const currentDate = new Date();
  const options: Intl.DateTimeFormatOptions = { month: "long" };
  const formattedDate = currentDate.toLocaleString("en-US", options);
  const date = new Date().getDate() + ", " + formattedDate;
  return date;
}

export default function Home() {
  const date = getCurrentDate();
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [city, setCity] = useState("vadodara");

  async function fetchData(cityName: string) {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=27751ed254cd4c8882645a21e5a3d441`,
        { cache: "no-store" }
      );
      const jsonData: WeatherData = await response.json();
      setWeatherData(jsonData);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchData(city);
  }, []);

  return (
    <main className={styles.main}>
      <article className={styles.widget}>
        <form
          className={styles.weatherLocation}
          onSubmit={(e) => {
            e.preventDefault();
            fetchData(city);
          }}
        >
          <input
            className={styles.input_field}
            type="text"
            placeholder="Enter city name"
            id="cityName"
            name="cityName"
            onChange={(e) => setCity(e.target.value)}
          />
          <button className={styles.search_button} type="submit">
            Search
          </button>
        </form>

        {weatherData && weatherData.weather && weatherData.weather[0] ? (
          <>
            <div className={styles.icon_and_weatherInfo}>
              <div className={styles.weatherIcon}>
                {weatherData.weather[0].description === "rain" ||
                weatherData.weather[0].description === "fog" ? (
                  <i
                    className={`wi wi-day-${weatherData.weather[0].description}`}
                  ></i>
                ) : (
                  <i className="wi wi-day-cloudy"></i>
                )}
              </div>

              <div className={styles.weatherInfo}>
                <div className={styles.temperature}>
                  <span>
                    {(weatherData.main.temp - 273.5).toFixed(2) +
                      String.fromCharCode(176)}
                  </span>
                </div>
                <div className={styles.weatherCondition}>
                  {weatherData.weather[0].description.toUpperCase()}
                </div>
              </div>
            </div>
            <div className={styles.place}>{weatherData.name}</div>
            <div className={styles.date}>{date}</div>
          </>
        ) : (
          <div className={styles.place}>Loading...</div>
        )}
      </article>
    </main>
  );
}
