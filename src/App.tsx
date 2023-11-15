import { useEffect } from "react";
import { DailyForecast } from "./api/weather-api";
import { weatherAPI } from "./api/weather-api.ts";
import './App.css';
import clearSky from './assets/svg-animated/clear-sky.svg';
import cloudy from './assets/svg-animated/cloudy.svg';
import foggy from './assets/svg-animated/foggy.svg';
import partlyCloudy from './assets/svg-animated/partly-cloudy.svg';
import rainy from './assets/svg-animated/rainy.svg';
import snowy from './assets/svg-animated/snowy.svg';
import loaderIcon from './assets/svg-animated/spinner.svg';
import thundery from './assets/svg-animated/thundery.svg';
import { Input } from "./components/input";
import {
    currentForecast,
    currentWeather,
    dailyForecast,
    loader,
    setError,
    useAppReducer
} from "./hooks/useAppReducer";
import currentPosition from "./utils/currentPosition.ts";

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
        const fetchData = async () => {
            dispatch(loader(true))
            try {
                const position = await currentPosition()
                const [currentForecastData, dailyForecastData] = await Promise.all([weatherAPI.getForecastByLocation(position.latitude, position.longitude), weatherAPI.getDailyForecast(position.latitude, position.longitude)])
                dispatch(currentForecast(currentForecastData));
                // dispatch(dailyForecast(dailyForecastData))

            } catch (error: any) {
                console.warn(error?.response?.data.message)
                dispatch(setError(error?.response?.data.message))
            } finally {
                dispatch(loader(false))
            }
        }
        fetchData()
    }, [])

    const forecastByCityNameHandler = async (city: string) => {
        // dispatch(loader(true))
        dispatch(setError(null))
        try {
            const [currentForecastData, dailyForecastData] = await Promise.all([weatherAPI.getForecastByCityName(city), weatherAPI.getDailyForecastByCityName(city)])
            dispatch(currentForecast(currentForecastData))
            // dispatch(dailyForecast(dailyForecastData))
        } catch (error: any) {
            console.warn(error?.response?.data.message)
            dispatch(setError(error?.response?.data.message))
        } finally {
            // dispatch(loader(false))
        }

    }
    const getWeatherDetails = async (city: string) => {
        try {
            const dailyForecastData: DailyForecast[] = await weatherAPI.getDailyForecastByCityName(city)

            // Filter the forecasts to get only one forecast per day
            const uniqueForecastDays: number[] = [];
            const fiveDaysForecast = dailyForecastData.filter(forecast => {
                const forecastDate = new Date(forecast.dt_txt).getDate();
                if (!uniqueForecastDays.includes(forecastDate)) {
                    return uniqueForecastDays.push(forecastDate);
                }
            })
            fiveDaysForecast.forEach((weatherItem, index) => {
                if(index === 0){
                    // console.log(weatherItem)
                    dispatch(currentWeather(weatherItem))
                }else{
                    // console.log(weatherItem)
                    dispatch(dailyForecast(weatherItem))
                }
            })
        }catch (error: any){
            console.warn(error?.response?.data.message)
            dispatch(setError(error?.response?.data.message))
        }
    }
    if (state.currentWeather && state.dailyForecastData){
        console.log(state.currentWeather)
        console.log(state.dailyForecastData)
    }

    const fetchData = async () => {
        dispatch(loader(true))
        try {
            const position = await currentPosition()
            const currentForecastData = await weatherAPI.getWeatherByLocation(position.latitude, position.longitude)// запрос на другой адрес
            dispatch(currentForecast(currentForecastData));
            // dispatch(dailyForecast(dailyForecastData))

        } catch (error: any) {
            console.warn(error?.response?.data.message)
            dispatch(setError(error?.response?.data.message))
        } finally {
            dispatch(loader(false))
        }
    }

    if (state.currentForecastData && state.dailyForecastData)
        return (
            <>
                <div className="wrapper">
                    <div className="shape shape-1"></div>
                    <div className="shape shape-2"></div>
                    <div className="container">
                        <div className="search-container">
                            <Input forecastByCityName={getWeatherDetails}/>
                        </div>
                        <div id="result">
                            {!state.loader ?
                                <div>
                                    {state.messageError ?
                                        <h3 className="msg">{state.messageError}</h3> :
                                        <>
                                            <h2>{state.currentForecastData.name}</h2>
                                            <h4 className="weather">{state.currentForecastData.weather[0].main}</h4>
                                            <h4 className="desc">{state.currentForecastData.weather[0].description}</h4>
                                            <img src={`${getWeatherIcon(state.currentForecastData.weather[0].description)}`}
                                                 alt='icon'/>
                                            <h1>{Math.round(state.currentForecastData.main.temp)} &#176;</h1>
                                            <div className="temp-container">
                                                <div>
                                                    <h4 className="title">min</h4>
                                                    <h4 className="temp">{Math.round(state.currentForecastData.main.temp_min)}&#176;</h4>
                                                </div>
                                                <div>
                                                    <h4 className="title">max</h4>
                                                    <h4 className="temp">{Math.round(state.currentForecastData.main.temp_max)}&#176;</h4>
                                                </div>
                                            </div>
                                        </>}
                                </div>
                                : <img src={loaderIcon} alt='icon'/>}
                        </div>
                    </div>
                </div>
                <button onClick={fetchData}>your geo</button>
            </>

        )
}

export default App
