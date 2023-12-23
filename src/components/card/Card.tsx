import * as React from "react";
import style from "./Card.module.scss"
import {windIcon} from "../../assets";
import {Forecast} from "api/types.ts";

type PropsType = {
    forecast: Forecast
    weatherIcon: string | false
    dayOfWeek: string
}

export const Card = React.memo(({forecast, weatherIcon, dayOfWeek}: PropsType) => {
    const temp = Math.ceil(forecast.main.temp);
    const wind = Math.ceil(forecast.wind.speed);
    return (
        <div className={style.weatherCard}>
            <div className={style.day}>{dayOfWeek}</div>
            <img className={style.weatherIcon} src={weatherIcon || ''} alt="Weather Icon"/>
            <div className={style.wind}><img src={windIcon} alt="wind-icon"/> <span>{wind} m/s</span></div>
            <div className={style.temperature}>{temp}°</div>
        </div>
    );
});