import {useReducer} from "react";
import {Forecast} from "../api/types.ts";


const initialState: State = {
    currentForecast: {} as CurrentForecast,
    dailyForecast: [],
    loader: false,
    messageError: null,
}

const reducer = (state: State, action: Actions): State => {
    switch (action.type) {
        case "CURRENT-FORECAST": {
            return {
                ...state,
                currentForecast: {...action.payload.currentForecast, city: action.payload.cityName}
            }
        }
        case "DAILY-FORECAST": {
            return {
                ...state,
                dailyForecast: action.payload
            }
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
    return {state, dispatch}
}

//Actions
export const currentForecast = (currentForecast: Forecast, cityName: string) => ({
    type: 'CURRENT-FORECAST',
    payload: {currentForecast, cityName}
} as const)
export const dailyForecast = (dailyForecast: Forecast []) => ({type: 'DAILY-FORECAST', payload: dailyForecast} as const)
export const setError = (error: string | null) => ({type: 'ERROR', payload: error} as const)
export const loader = (value: boolean) => ({type: 'LOADER', payload: value} as const)

//Types

export type Actions =
    | ReturnType<typeof currentForecast>
    | ReturnType<typeof dailyForecast>
    | ReturnType<typeof setError>
    | ReturnType<typeof loader>

export type CurrentForecast = Forecast & { city: string }

type State = {
    currentForecast: CurrentForecast;
    dailyForecast: Forecast[];
    loader: boolean;
    messageError: string | null;
};