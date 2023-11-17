import axios from "axios";

const API_KEY = 'bd4d8697c2213442afba131cd703e05a'

const instance = axios.create({
    baseURL: 'https://api.openweathermap.org/geo/1.0/',
});

export const weatherAPI = {
    getCityCoordinates(cityName: string) {
        return instance.get<Coordinates[]>(`direct?q=${cityName}&limit=1&appid=${API_KEY}`).then((data => data.data))
    },
    getUserCoordinates(latitude: number, longitude: number) {
        return instance.get<Coordinates[]>(`reverse?lat=${latitude}&lon=${longitude}&limit=1&appid=${API_KEY}`).then((data => data.data))
    },
    getWeatherDetails(lat: number | undefined, lon: number | undefined) {
        // @ts-ignore
        return axios.get<Forecast[]>(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`).then((data => data.data.list))
    },

}
//types
export type Forecast = {
    dt: number
    main: {
        temp: number
        feels_like: number
        temp_min: number
        temp_max: number
        pressure: number
        sea_level: number
        grnd_level: number
        humidity: number
        temp_kf: number
    }
    weather: [
        {
            id: number
            main: string
            description: string
            icon: string
        }
    ],
    clouds: {
        all: number
    }
    wind: {
        speed: number
        deg: number
        gust: number
    }
    visibility: number
    pop: 0
    sys: {
        pod: string
    }
    dt_txt: string
}

type Coordinates = {
    country: string
    lat: number
    lon: number
    name: string
    state: string
}