import {Actions, loader, setError} from "../hooks/useAppReducer.ts";
import {getCurrentPosition} from "../utils";
import {weatherAPI} from "../api/weather-api.ts";
import {getWeatherDetails} from "./getWeatherDetails.ts";
import React from "react";

export const getUserCoordinates = async (dispatch: React.Dispatch<Actions>) => {
    dispatch(setError(null))
    dispatch(loader(true))
    try {
        const position = await getCurrentPosition()
        const currentUserCoordinates = await weatherAPI.getUserCoordinates(position.latitude, position.longitude)
        const {lat, lon, name} = currentUserCoordinates[0]
        getWeatherDetails(lat, lon, name, dispatch)
    } catch (error: any) {
        console.warn(error?.response?.data.message)
        dispatch(setError(error?.response?.data.message))
    } finally {
        dispatch(loader(false))
    }
}
