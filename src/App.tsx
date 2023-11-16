import {useEffect} from "react";
import {Forecast} from "./api/weather-api";
import {weatherAPI} from "./api/weather-api.ts";
import './App.css';
import clearSky from './assets/svg-animated/clear-sky.svg';
import cloudy from './assets/svg-animated/cloudy.svg';
import foggy from './assets/svg-animated/foggy.svg';
import partlyCloudy from './assets/svg-animated/partly-cloudy.svg';
import rainy from './assets/svg-animated/rainy.svg';
import snowy from './assets/svg-animated/snowy.svg';
import loaderIcon from './assets/svg-animated/spinner.svg';
import thundery from './assets/svg-animated/thundery.svg';
import {Input} from "./components/Input.tsx";
import {currentForecast, dailyForecast, loader, setError, useAppReducer} from "./hooks/useAppReducer";
import currentPosition from "./utils/currentPosition.ts";
import {Card} from "./components/Card.tsx";

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
    {key: 'heavy intensity rain', iconName: rainy, weather: 'Rainy'},
    {key: 'thunderstorm', iconName: thundery, weather: 'Thundery'},
    {key: 'snow', iconName: snowy, weather: 'Snowy'},
    {key: 'light snow', iconName: snowy, weather: 'Snowy'},
    {key: 'mist', iconName: foggy, weather: 'Foggy'},
    {key: 'fog', iconName: foggy, weather: 'Foggy'},
]

function App() {
    const {state, dispatch} = useAppReducer()
    
    const getWeatherIcon = function (weatherKey: string) {
        const obj = weatherIcons.find(el => el.key === weatherKey)
        if (obj) return obj.iconName
        return false
    }

    useEffect(() => {
        getUserCoordinates()
    }, [])

    const forecastByCityNameHandler = async (city: string) => {
        // dispatch(loader(true))
        dispatch(setError(null))
        try {
            const [currentForecastData, dailyForecastData] = await Promise.all([weatherAPI.getForecastByCityName(city), weatherAPI.getDailyForecastByCityName(city)])
            // dispatch(currentForecast(currentForecastData, city))
            // dispatch(dailyForecast(dailyForecastData))
        } catch (error: any) {
            console.warn(error?.response?.data.message)
            dispatch(setError(error?.response?.data.message))
        } finally {
            // dispatch(loader(false))
        }

    }

    const getWeatherDetails = async (lat: number, lon: number, cityName: string) => {
        try {
            const forecastData: Forecast[] = await weatherAPI.getWeatherDetails(lat, lon)

            // Filter the forecasts to get only one forecast per day
            const uniqueForecastDays: number[] = [];
            const fiveDaysForecast = forecastData.filter(forecast => {
                const forecastDate = new Date(forecast.dt_txt).getDate();
                if (!uniqueForecastDays.includes(forecastDate)) {
                    return uniqueForecastDays.push(forecastDate);
                }
            })

            const [currentDay, ...restDays] = fiveDaysForecast;
            dispatch(currentForecast(currentDay, cityName));
            dispatch(dailyForecast(restDays));

        }catch (error: any){
            console.warn(error?.response?.data.message)
            dispatch(setError(error?.response?.data.message))
        }
    }
    if (state.currentForecast && state.dailyForecast){
        // console.log(state.currentForecast)
        console.log(state.dailyForecast)
    }

    const getUserCoordinates = async () => {
        dispatch(loader(true))
        try {
            const position = await currentPosition()
            const currentUserCoordinates = await weatherAPI.getUserCoordinates(position.latitude, position.longitude)
            const {lat, lon, name} = currentUserCoordinates[0]

            getWeatherDetails(lat, lon, name)

        } catch (error: any) {
            console.warn(error?.response?.data.message)
            dispatch(setError(error?.response?.data.message))
        }
        dispatch(loader(false))
    }

    if (state.currentForecast && state.dailyForecast)
        return (
            <>
                <div className="wrapper">
                    <div className="shape shape-1"></div>
                    <div className="shape shape-2"></div>
                    <div className="container">
                        <div className="search-container">
                            <Input forecastByCityName={forecastByCityNameHandler}/>
                        </div>
                        <div id="result">
                            {!state.loader ?
                                <div>
                                    {state.messageError ?
                                        <h3 className="msg">{state.messageError}</h3> :
                                        <>
                                            <h2>{state.currentForecast.city}</h2>
                                            <h4 className="weather">{state.currentForecast.weather[0].main}</h4>
                                            <h4 className="desc">{state.currentForecast.weather[0].description}</h4>
                                            <img src={`${getWeatherIcon(state.currentForecast.weather[0].description)}`}
                                                 alt='icon'/>
                                            <h1>{Math.round(state.currentForecast.main.temp)} &#176;</h1>
                                            <div className="temp-container">
                                                <div>
                                                    <h4 className="title">min</h4>
                                                    <h4 className="temp">{Math.round(state.currentForecast.main.temp_min)}&#176;</h4>
                                                </div>
                                                <div>
                                                    <h4 className="title">max</h4>
                                                    <h4 className="temp">{Math.round(state.currentForecast.main.temp_max)}&#176;</h4>
                                                </div>
                                            </div>
                                        </>}
                                </div>
                                : <img src={loaderIcon} alt='icon'/>}
                        </div>
                    </div>
                    <div style={{display: 'flex', gap: '20px'}}>
                        {state.dailyForecast.map(weatherItem => (
                            <Card props={weatherItem}/>
                        ))}
                    </div>

                </div>
                <button onClick={getUserCoordinates}>your geolocation</button>
            </>

        )
}

export default App
