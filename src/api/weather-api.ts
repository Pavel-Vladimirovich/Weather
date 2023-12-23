import axios from "axios";
import {CoordinatesResponse, ForecastResponse} from "./types.ts";

const API_KEY = 'bd4d8697c2213442afba131cd703e05a'

const instance = axios.create({
    baseURL: 'https://api.openweathermap.org/geo/1.0/',
});

export const weatherAPI = {
    getCityCoordinates(cityName: string) {
        return instance.get<CoordinatesResponse[]>(`direct?q=${cityName}&limit=1&appid=${API_KEY}`).then((data => data.data))
    },
    getUserCoordinates(latitude: number, longitude: number) {
        return instance.get<CoordinatesResponse[]>(`reverse?lat=${latitude}&lon=${longitude}&limit=1&appid=${API_KEY}`).then((data => data.data))
    },
    getWeatherDetails(lat: number, lon: number) {
        return axios.get<ForecastResponse>(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`).then((data => data.data.list))
    },

}
