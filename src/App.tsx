import { useEffect, useState } from "react";
import { userLocationAPI } from './api/location-api';
import { currentWeatherType, DayliForecast } from './api/weather-api';
import { weatherAPI } from "./api/weather-api.ts";
import './App.css';

function App() {
    const [currentForcastData, setCurrentForcastData] = useState<currentWeatherType>()
    const [dayliForcastData, setDayliForcastData] = useState<DayliForecast[]>()

    const [location, setLocation] = useState({lat: 0, lon: 0})

    useEffect(()=>{
        userLocationAPI.getUserLocation()
            .then((userData) => {
                if(userData)
                setLocation({lat: userData.latitude, lon: userData.longitude})
            })
            .catch((error)=>{
                console.log(error)
            })
    },[])


    useEffect(() => {
            weatherAPI.getCurrentForcast(location.lat, location.lon, 'Minsk')
            .then((currentForcastData)=>{
                console.log(currentForcastData)
                setCurrentForcastData(currentForcastData)
            })
            .catch((error) => {
                console.error("Произошла ошибка:", error);
            });

            weatherAPI.getDayliForcast(location.lat, location.lon)
            .then((dayliForcastData) => {
                console.log(dayliForcastData)
                setDayliForcastData(dayliForcastData)
            })
            .catch((error) => {
                console.error("Произошла ошибка:", error);
            });

    }, [location]);
    // weatherAPI.getCurrentForcast(location.lat, location.lon, 'Minsk')
    return (
        <>
            {dayliForcastData?.map(item => {
                return(
                    <div key={item.dt}>
                        <div>{item.main.temp}</div>
                        <div>{item.dt_txt}</div>
                        
                    </div>
                )
            })}
            <span>погода сейчас; </span>
            {currentForcastData?.main.temp}
        </>

    )
}

export default App
