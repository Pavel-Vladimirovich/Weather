import {useEffect} from "react";
import './App.css';
import loaderIcon from './assets/svg-animated/spinner.svg';
import {FormValues, Input} from "./components/Input.tsx";
import {useAppReducer} from "./hooks/useAppReducer";
import {Card} from "./components/Card.tsx";
import {FormikHelpers} from "formik";
import {getDayOfWeek, getWeatherIcon} from "./utils";
import {getCityCoordinates, getUserCoordinates} from "./weatherAsyncFunctions";


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

    return (
        <>
            <div className="wrapper">
                <div className="shape shape-1"></div>
                <div className="shape shape-2"></div>
                <div className="container">
                    <div className="search-container">
                        <Input forecastByCityName={getCityCoordinatesHandler}/>
                    </div>
                    <div id="result">
                        {!state.loader ?
                            <>
                                {state.messageError ?
                                    <h3 className="msg">{state.messageError}</h3> :
                                    <>
                                        <h2>{state.currentForecast.city}</h2>
                                        <h4 className="weather">{state.currentForecast.weather[0].main}</h4>
                                        <h4 className="desc">{state.currentForecast.weather[0].description}</h4>
                                        <img src={getWeatherIcon(state.currentForecast.weather[0].description) || ''}
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
                            </>
                            : <img src={loaderIcon} alt='icon'/>}
                    </div>
                </div>
                <div className='weather-card'>
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
            <button onClick={getUserCoordinatesHandler}>Use Your Location</button>
        </>

    )
}

export default App
