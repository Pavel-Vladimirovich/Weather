import {getDayOfWeek, getWeatherIcon} from "../../utils";
import {Card} from "../card/Card.tsx";
import {CurrentForecast} from "hooks/useAppReducer.ts";
import {humidityIcon, maxIcon, minIcon, windIcon} from "../../assets";
import {Forecast} from "api/types.ts";
import styles from "./weather.module.scss";

type PropsType = {
    currentForecast: CurrentForecast
    dailyForecast: Forecast[]
}

export const Weather = ({currentForecast, dailyForecast}: PropsType) => {

    const city = currentForecast?.city
    const temp = Math.round(currentForecast?.main?.temp) | 0
    const feelsLike = Math.round(currentForecast?.main?.feels_like)
    const weather = currentForecast?.weather?.[0]?.main || ''
    const description = currentForecast?.weather?.[0]?.description || ''
    const weatherIcon = getWeatherIcon(currentForecast?.weather?.[0]?.description) || ''
    const tempMin = Math.round(currentForecast?.main?.temp_min)
    const tempMax = Math.round(currentForecast?.main?.temp_max)
    const wind = Math.round(currentForecast?.wind?.speed)
    const humidity = Math.round(currentForecast?.main?.humidity)

    return (
        <div>
            <div className={styles.result}>
                <img src={weatherIcon}
                     alt='icon'/>
                <h2>{weather}</h2>
                <h1>{city}</h1>
            </div>
            <div className={styles.tempContainer}>
                <div className={styles.current}>
                    <div>
                        <h2>{temp}°</h2>
                        <h4>feels like {feelsLike}°</h4>
                        <div className={styles.currentDiscription}>
                            <div>
                                <img src={minIcon} alt="icon"/>
                                <h4 className={styles.temp}>{tempMin}°</h4>
                            </div>
                            <div>
                                <img src={maxIcon} alt="icon"/>
                                <h4 className={styles.temp}>{tempMax}°</h4>
                            </div>
                        </div>
                    </div>
                    <div>
                        <img className={styles.currentIcon}
                             src={weatherIcon}
                             alt='icon'/>
                        <h4>{description}</h4>
                        <div className={styles.currentDescription}>
                            <div>
                                <img src={windIcon} alt="icon"/>
                                <h4 className={styles.temp}>{wind} m/s</h4>
                            </div>
                            <div>
                                <img src={humidityIcon} alt="icon"/>
                                <h4 className={styles.temp}>{humidity} %</h4>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={styles.daily}>
                    {dailyForecast.map((weatherItem, index) => {
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
    )
}