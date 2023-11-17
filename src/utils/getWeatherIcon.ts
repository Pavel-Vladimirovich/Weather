import {weatherIcons} from "../constants/weather-icons.ts";

export const getWeatherIcon = function (weatherKey: string) {
    const obj = weatherIcons.find(el => el.key === weatherKey)
    if (obj) return obj.iconName
    return false
}