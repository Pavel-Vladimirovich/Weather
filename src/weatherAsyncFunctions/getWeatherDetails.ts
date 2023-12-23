import {Actions, currentForecast, dailyForecast, setError} from "../hooks/useAppReducer.ts";
import {weatherAPI} from "../api/weather-api.ts";
import React from "react";
import {Forecast} from "../api/types.ts";


export const getWeatherDetails = async (lat: number, lon: number, cityName: string, dispatch: React.Dispatch<Actions>) => {
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
        dispatch(setError(null))
    } catch (error: any) {
        console.warn(error?.response?.data.message)
        dispatch(setError(error?.response?.data.message))
    }
}