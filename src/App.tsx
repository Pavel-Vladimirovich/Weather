import {useEffect, useState} from "react";
import {currentWeatherType, DayliForecast} from './api/weather-api';
import {weatherAPI} from "./api/weather-api.ts";
import './App.css';
import currentPosition from "./utils/currentPosition.ts";
import clearSky from './assets/svg-animated/clear-sky.svg'
import partlyCloudy from './assets/svg-animated/partly-cloudy.svg'
import cloudy from './assets/svg-animated/cloudy.svg'
import rainy from './assets/svg-animated/rainy.svg'
import thundery from './assets/svg-animated/thundery.svg'
import snowy from './assets/svg-animated/snowy.svg'
import foggy from './assets/svg-animated/foggy.svg'

const weatherIcons = [
    {key: 'clear sky', iconName: clearSky, weather: 'Sunny'},
    {key: 'few clouds', iconName: partlyCloudy, weather: 'Partly cloudy'},
    {key: 'scattered clouds', iconName: cloudy, weather: 'Cloudy'},
    {key: 'broken clouds', iconName: cloudy, weather: 'Cloudy'},
    {key: 'overcast clouds', iconName: cloudy, weather: 'Cloudy'},
    {key: 'shower rain', iconName: rainy, weather: 'Rainy'},
    {key: 'moderate rain', iconName: rainy, weather: 'Rainy'},
    {key: 'light rain', iconName: rainy, weather: 'Rainy'},
    {key: 'rain', iconName: rainy, weather: 'Rainy'},
    {key: 'thunderstorm', iconName: thundery, weather: 'Thundery'},
    {key: 'snow', iconName: snowy, weather: 'Snowy'},
    {key: 'mist', iconName: foggy, weather: 'Foggy'},
]

function App() {
    const [currentForecastData, setCurrentForecastData] = useState<currentWeatherType>()
    const [dailyForecastData, setDailyForecastData] = useState<DayliForecast[]>()
    const [inputValue, setInputValue] = useState('')

    const getWeatherIcon = function (weatherKey: string) {
        const obj = weatherIcons.find(el => el.key === weatherKey)
        if (obj) return obj.iconName
        return false
    }

    useEffect(() => {
        currentPosition()
            .then((position) => {
                // console.log("Received position:", position);

                return Promise.all([
                    weatherAPI.getCurrentForecast(position.latitude, position.longitude),
                    weatherAPI.getDailyForecast(position.latitude, position.longitude)
                ]);
            })
            .then(([currentForecastData, dailyForecastData]) => {
                // console.log("Current Forecast:", currentForecastData);
                // console.log("Daily Forecast:", dailyForecastData);

                setCurrentForecastData(currentForecastData);
                setDailyForecastData(dailyForecastData);
            })
            .catch((error) => {
                console.error("Error occurred:", error);
            });
    }, []);
    if (currentForecastData && dailyForecastData)

    return (
        <>
            <div className="wrapper">
                <div className="shape shape-1"></div>
                <div className="shape shape-2"></div>
                <div className="container">
                    <div className="search-container">
                        <input
                            onChange={(e)=>{setInputValue(e.currentTarget.value)}}
                            type="text"
                            placeholder="Enter a city name"
                            id="city"
                            value={inputValue}
                        />
                        <button id="search-btn" onClick={()=>{setInputValue('')}}>Search</button>
                    </div>
                    <div id="result">
                        {/*<h3 className="msg">Please enter a city name</h3>*/}
                        <h2>{currentForecastData.name}</h2>
                        <h4 className="weather">{currentForecastData.weather[0].main}</h4>
                        <h4 className="desc">{currentForecastData.weather[0].description}</h4>
                        <img src={`${getWeatherIcon(currentForecastData.weather[0].description)}`}
                             alt='icon'/>
                        <h1>{Math.round(currentForecastData.main.temp)} &#176;</h1>
                        <div className="temp-container">
                            <div>
                                <h4 className="title">min</h4>
                                <h4 className="temp">{Math.round(currentForecastData.main.temp_min)}&#176;</h4>
                            </div>
                            <div>
                                <h4 className="title">max</h4>
                                <h4 className="temp">{Math.round(currentForecastData.main.temp_max)}&#176;</h4>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </>

    )
}

export default App
