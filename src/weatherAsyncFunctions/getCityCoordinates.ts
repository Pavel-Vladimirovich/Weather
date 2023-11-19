import {FormikHelpers} from "formik";
import {FormValues} from "../components/Input.tsx";
import {Actions, loader, setError} from "../hooks/useAppReducer.ts";
import {weatherAPI} from "../api/weather-api.ts";
import {getWeatherDetails} from "./getWeatherDetails.ts";
import React from "react";

export const getCityCoordinates = async (city: string, submitProps: FormikHelpers<FormValues>, dispatch: React.Dispatch<Actions>) => {
    dispatch(setError(null))
    dispatch(loader(true))
    try {
        const currentCityCoordinates = await weatherAPI.getCityCoordinates(city)
        if (currentCityCoordinates.length) {
            const {lat, lon} = currentCityCoordinates[0]
            getWeatherDetails(lat, lon, city, dispatch)
            submitProps.resetForm()
        } else {
            dispatch(setError('city not found...'))
        }

    } catch (error) {
        console.error('some error occurred: ' + error)
        dispatch(setError('some error occurred'))
    } finally {
        dispatch(loader(false))
    }
}