import {useEffect} from "react";
import style from './App.module.scss';
import {FormValues, Input} from "./components/Input.tsx";
import {useAppReducer} from "./hooks/useAppReducer";
import {Card} from "./components/Card.tsx";
import windIcon from "./assets/svg/weather-wind.svg"
import {FormikHelpers} from "formik";
import {getDayOfWeek, getWeatherIcon} from "./utils";
import {getCityCoordinates, getUserCoordinates} from "./weatherAsyncFunctions";
import { LinearLoader } from "./components/linearLoader";


function App() {
    const {state, dispatch} = useAppReducer()

    useEffect(() => {
        getUserCoordinatesHandler()
    }, [])

    const getUserCoordinatesHandler = () => {
        getUserCoordinates(dispatch)
    }

    const getCityCoordinatesHandler = (city: string, submitProps: FormikHelpers<FormValues>) => {
        getCityCoordinates(city, submitProps, dispatch)
    }

    const city = state.currentForecast.city
    const temp = Math.round(state.currentForecast.main.temp)
    const feelsLike =  Math.round(state.currentForecast.main.feels_like)
    const weather = state.currentForecast.weather[0].main
    const description = state.currentForecast.weather[0].description
    const weatherIcon = getWeatherIcon(state.currentForecast.weather[0].description) || ''
    const tempMin = Math.round(state.currentForecast.main.temp_min)
    const tempMax = Math.round(state.currentForecast.main.temp_max)
    const wind = Math.round(state.currentForecast.wind.speed)
    return (
        <>
            <div className={style.loader}>
                {state.loader ? <LinearLoader/> : null}
            </div>
            <div className={style.wrapper}>
            <div className={`${style.shape} ${style.shape1}`}></div>
            <div className={`${style.shape} ${style.shape2}`}></div>
            <div className={`${style.shape} ${style.shape3}`}></div>
            <div className={style.container}>
                <div className={style.searchContainer}>
                    <Input forecastByCityName={getCityCoordinatesHandler}
                        getUserCoordinates={getUserCoordinatesHandler}/>
                        {state.messageError ? <span className={style.message}>{state.messageError}</span> : null}
                </div>
                <div className={style.result}>
                    <img src={weatherIcon}
                            alt='icon'/>
                    <h2>{city}</h2>
                </div>
                <div className={style.tempContainer} >
                    <div className={style.currentTemp}>
                        <div>
                            <h1>{temp}°</h1>
                            <h4>feels like {feelsLike}°</h4>
                            <div className={style.wind}><img src={windIcon} alt="wind-icon"/> <span>{wind} m/s</span></div>
                        </div>
                        <div className={style.currentTempMain}>
                            <img src={weatherIcon}
                                 alt='icon'/>
                                 <h4>{description}</h4>
                            <div className={style.currentTempDescription}>
                                <div>
                                    <h4 className={style.title}>min</h4>
                                    <h4 className={style.temp}>{tempMin}°</h4>
                                </div>
                                <div>
                                    <h4 className={style.title}>max</h4>
                                    <h4 className={style.temp}>{tempMax}°</h4>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={style.dailyTemp} >
                        {state.dailyForecast.map((weatherItem, index) => {
                            if (weatherItem) {
                                const dayOfWeek = getDayOfWeek(weatherItem.dt_txt)
                                const weatherIcon = getWeatherIcon(weatherItem.weather[0].description)
                                return <Card
                                    key={index}
                                    forecast={weatherItem}
                                    weatherIcon={weatherIcon}
                                    dayOfWeek={dayOfWeek}/>
                            }
                        })}
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}

export default App
