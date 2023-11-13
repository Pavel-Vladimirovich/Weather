import axios from "axios";
const API_KEY = 'bd4d8697c2213442afba131cd703e05a'

const instance = axios.create({
    baseURL: 'https://api.openweathermap.org/data/2.5/',
});

export const weatherAPI = {
    getCurrentForecast(lat?: number, lon?: number, city: string = ''){
       return instance.get<currentWeatherType>(`weather?${(!city ? `lat=${lat}&lon=${lon}` : `q=${city}`)}&appid=${API_KEY}&units=metric`).then((data => data.data))
    },
    getDailyForecast(lat: number | undefined, lon: number | undefined){
        return instance.get<DayliForecast[]>(`forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}`).then((data => data.data))
    },
    getForecast(city: string){
        return instance( `weather?q=${city}&appid=${API_KEY}&units=metric`)
    }
}
//types

export type currentWeatherType = {
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
export type DayliForecast = {
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