import './App.css'
import { useEffect, useState } from "react";
import {DailyForecastsType, weatherAPI} from "./api/weather-api.ts";
import { locationUserAPI } from "./api/location-api.ts";

function App() {
    const [forecastsData, setForecastsData] = useState<DailyForecastsType[]>()

    useEffect(() => {
        locationUserAPI.getUserIP()
            .then((userData) => {
                return weatherAPI.getSpecificLocationByIPAddress(userData.ip)
            })
            .then((locationData) => {
                return weatherAPI.getDailyForecasts(locationData.Key)
            })
            .then((forecastsData) => {
                // console.log(forecastsData)
                setForecastsData(forecastsData)
            })
            .catch((error) => {
                // Обработка ошибок
                console.error("Произошла ошибка:", error);
            });

    }, []);
console.log(forecastsData)
    return (
        <>
            {/*<ul>*/}
            {/*    {forecastsData?.map(i => {*/}
            {/*        return (*/}
            {/*            <li>{i.Temperature.Maximum.Value}</li>*/}
            {/*        )*/}
            {/*    })}*/}
            {/*</ul>*/}
        </>

    )
}

export default App
