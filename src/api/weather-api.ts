import axios from "axios";
const API_KEY = 'bd4d8697c2213442afba131cd703e05a'

const instance = axios.create({
    baseURL: 'https://api.openweathermap.org/data/2.5/',
});

export const weatherAPI = {
    getForecastByLocation(latitude?: number, longitude?: number, city?: string){
       return instance.get<CurrentForecast>(`weather?${(!city ? `lat=${latitude}&lon=${longitude}` : `q=${city}`)}&appid=${API_KEY}&units=metric`).then((data => data.data))
    },
    getForecastByCityName(city: string){
        return instance<CurrentForecast>( `weather?q=${city}&appid=${API_KEY}&units=metric`).then((data => data.data))
    },
    getDailyForecastByCityName(city: string){
        return instance.get<Forecast[]>(`forecast?q=${city}&appid=${API_KEY}&units=metric`).then((data => data.data.list))
    },
    getUserCoordinates(latitude: number, longitude: number){
        return axios.get<UserCoordinates[]>(`https://api.openweathermap.org/geo/1.0/reverse?lat=${latitude}&lon=${longitude}&limit=1&appid=${API_KEY}`).then((data => data.data))
    },
    getWeatherDetails(lat: number | undefined, lon: number | undefined){
        return instance.get<Forecast[]>(`forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`).then((data => data.data.list))
    },
   
}
//types

export type CurrentForecast = {
    base: string
    clouds: { all: number }
    cod: number | string
    coord: { lon: number; lat: number }
    main: {
        feels_like: number
        grnd_level: number
        humidity: number
        pressure: number
        sea_level: number
        temp: number
        temp_max: number
        temp_min: number
    }
    name: string
    sys: {
        country: string
        id: number
        sunrise: number
        sunset: number
        type: number
    }
    timezone: number
    visibility: number
    weather: [
        {
            description: string
            icon: string
            id: number
            main: string
        },
    ]
    wind: {
        deg: number
        gust: number
        speed: number
    }
}
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

type UserCoordinates = {
    country: string
    lat: number
    lon: number
    name: string
}