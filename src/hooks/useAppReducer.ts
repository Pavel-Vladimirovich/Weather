import { useReducer } from "react";
import { CurrentForecast, Forecast } from "../api/weather-api";

const initialState = {
    currentForecastData: {
      dt: 0,
      main: {
          temp: 0,
          feels_like: 0,
          temp_min: 0,
          temp_max: 0,
          pressure: 0,
          sea_level: 0,
          grnd_level: 0,
          humidity: 0,
          temp_kf: 0,
      },
      weather: [
          {
              id: 0,
              main: '',
              description: '',
              icon: '',
          }
      ],
      clouds: {
          all: 0,
      },
      wind: {
          speed: 0,
          deg: 0,
          gust: 0,
      },
      visibility: 0,
      pop: 0,
      sys: {
          pod: '',
      },
      dt_txt: '',
    } as Forecast,
    dailyForecastData: [] as Forecast[],
    loader: true as boolean,
    messageError: null as string | null,
    currentWeather: {} as Forecast
}


const reducer = (state: State, action: Actions): State => {
    switch (action.type) {
        case "CURRENT-FORECAST":{
            return {
                ...state,
               currentForecastData: {...action.payload}
            }
        }
        case "DAILY-FORECAST":
            return {
                ...state,
                dailyForecastData: [...state.dailyForecastData, {...action.payload}]
            }
        case "LOADER":
            return {
                ...state,
                loader: action.payload
            }
        case "ERROR":
            return {
                ...state,
                messageError: action.payload
            }
        default:
            return state
    }

}
export const useAppReducer = () => {
	const [state, dispatch] = useReducer(reducer, initialState)
	return {state,  dispatch}
}

//Actions
export const currentForecast = (currentForecast: Forecast) => ({type: 'CURRENT-FORECAST', payload: currentForecast} as const)
export const dailyForecast = (dailyForecast: Forecast) => ({type: 'DAILY-FORECAST', payload: dailyForecast} as const)
export const setError = (error: string | null) => ({type: 'ERROR', payload: error} as const)
export const loader = (value: boolean) => ({type: 'LOADER', payload: value} as const)

//Types
type State = typeof initialState

export type Actions =
    | ReturnType<typeof currentForecast>
    | ReturnType<typeof dailyForecast>
    | ReturnType<typeof setError>
    | ReturnType<typeof loader>
