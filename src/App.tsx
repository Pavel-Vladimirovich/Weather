import {useEffect, useReducer, useState} from "react";
import {CurrentForecast, DayliForecast} from './api/weather-api';
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
import {Input} from "./components/input";
import loaderIcon from './assets/svg-animated/spinner.svg'

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
    {key: 'mist', iconName: foggy, weather: 'Foggy'},
    {key: 'fog', iconName: foggy, weather: 'Foggy'},
]

const initialState = {
    currentForecastData: {} as CurrentForecast,
    dailyForecastData: [] as DayliForecast[],
    loader: false as boolean,
    messageError: null as string | null
}
type State = typeof initialState
type Actions =
    | { type: 'CURRENT-FORECAST'; payload: CurrentForecast }
    | { type: 'DAILY-FORECAST'; payload: DayliForecast[] }
    | { type: 'ERROR'; payload: string | null }
    | { type: 'LOADER'; payload: boolean }

const reducer = (state: State, action: Actions): State => {
    switch (action.type) {
        case "CURRENT-FORECAST":{
            const {
                base,
                clouds,
                cod,
                coord,
                main,
                name, sys,
                timezone,
                visibility,
                weather,
                wind } = action.payload;

            return {
                ...state,
                currentForecastData: {
                    base,
                    clouds,
                    cod,
                    coord,
                    main,
                    name,
                    sys,
                    timezone,
                    visibility,
                    weather,
                    wind,
                }
            }
        }
        case "DAILY-FORECAST":
            return {
                ...state,
                dailyForecastData: action.payload
            }
        case "LOADER":
            return {
                ...state,
                loader: action.payload
            }
        case "ERROR":
            return {
                ...state,
                messageError: action.payload
            }
        default:
            return state
    }

}


function App() {
    const [state, dispatch] = useReducer(reducer, initialState)
    // const [currentForecastData, setCurrentForecastData] = useState<CurrentForecast>()
    // const [dailyForecastData, setDailyForecastData] = useState<DayliForecast[]>()
    // const [loader, setLoader] = useState<boolean>(false)
    // const [messageError, setMessageError] = useState<string | null>(null)

    const getWeatherIcon = function (weatherKey: string) {
        const obj = weatherIcons.find(el => el.key === weatherKey)
        if (obj) return obj.iconName
        return false
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                const position = await currentPosition()
                const [currentForecastData, dailyForecastData] = await Promise.all(
                    [weatherAPI.getForecastByLocation(position.latitude, position.longitude),
                        weatherAPI.getDailyForecast(position.latitude, position.longitude)])
                dispatch({type:"CURRENT-FORECAST", payload: currentForecastData});
                dispatch({type: "DAILY-FORECAST", payload: dailyForecastData})

            } catch (error: any) {
                console.warn(error?.response?.data.message)
                dispatch({type: "ERROR", payload: error?.response?.data.message})
            }
        }
        fetchData()

    }, [])

    const forecastByCityNameHandler = async (city: string) => {
        dispatch({type: "LOADER", payload: true})
        dispatch({type: "ERROR", payload: null})
        try {
            const [currentForecastData, dailyForecastData] = await Promise.all([weatherAPI.getForecastByCityName(city), weatherAPI.getDailyForecastByCityName(city)])
            dispatch({type:"CURRENT-FORECAST", payload: currentForecastData});
            dispatch({type: "DAILY-FORECAST", payload: dailyForecastData})
        } catch (error: any) {
            console.warn(error?.response?.data.message)
            dispatch({type: "ERROR", payload: error?.response?.data.message})
        } finally {
            dispatch({type: "LOADER", payload: false})
        }

    }
    if (state.currentForecastData && state.dailyForecastData) {
        console.log(state.currentForecastData)
    }

    if (state.currentForecastData && state.dailyForecastData)
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
            </>

        )
}

export default App
