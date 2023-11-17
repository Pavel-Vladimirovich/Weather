import React from "react";
import style from "./Card.module.scss"
import {Forecast} from "../api/weather-api.ts";
import windIcon from "../assets/svg/weather-wind.svg"
type Props = {
    forecast: Forecast | null
    weatherIcon: string | false
    dayOfWeek: string
}

export const Card = React.memo(({ forecast, weatherIcon, dayOfWeek }: Props) => {
    const temp = forecast?.main.temp && Math.ceil(forecast.main.temp);
    const wind = forecast?.wind.speed && Math.ceil(forecast.wind.speed);

    return (
        <div className={style.weatherCard}>
            <div className={style.day}>{dayOfWeek}</div>
            <img className={style.weatherIcon} src={weatherIcon || ''} alt="Weather Icon" />
            <div className={style.wind}><img src={windIcon} alt="wind-icon"/> <span>{wind} m/s</span></div>
            <div className={style.temperature}>{temp}°</div>
        </div>
    );
});