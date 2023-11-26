import {useEffect} from "react";
import style from './App.module.scss';
import {Input, LinearLoader, Weather} from "./components";
import {useAppReducer} from "./hooks/useAppReducer";
import {FormikHelpers} from "formik";
import {getCityCoordinates, getUserCoordinates} from "./weatherAsyncFunctions";
import {FormValues} from "./components/input/Input";


function App() {
    const {state, dispatch} = useAppReducer()

    useEffect(() => {
        getUserCoordinatesHandler()
    }, [])

    const getUserCoordinatesHandler = () => {
        getUserCoordinates(dispatch)
    }

    const getCityCoordinatesHandler = (city: string, submitProps: FormikHelpers<FormValues>) => {
        getCityCoordinates(city, submitProps, dispatch)
    }


    return (
        <>
            <div className={style.loader}>
                {state.loader && <LinearLoader/>}
            </div>
            <div className={style.wrapper}>
                <div className={`${style.shape} ${style.shape1}`}></div>
                <div className={`${style.shape} ${style.shape2}`}></div>
                <div className={`${style.shape} ${style.shape3}`}></div>
                <div className={style.container}>
                    <div className={style.searchContainer}>
                        <Input forecastByCityName={getCityCoordinatesHandler}
                            getUserCoordinates={getUserCoordinatesHandler}/>
                            {state.messageError ? <span className={style.message}>{state.messageError}</span> : null}
                    </div>
                    {state.currentForecast.main ?
                        <Weather currentForecast={state.currentForecast} dailyForecast={state.dailyForecast}/> : null
                    }
                </div>
            </div>
        </>
    )
}

export default App