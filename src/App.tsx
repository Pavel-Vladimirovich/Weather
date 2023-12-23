import {useEffect} from "react";
import styles from './App.module.scss';
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
            <div className={styles.loader}>
                {state.loader && <LinearLoader/>}
            </div>
            <div className={styles.wrapper}>
                <div className={`${styles.shape} ${styles.shape1}`}></div>
                <div className={`${styles.shape} ${styles.shape2}`}></div>
                <div className={`${styles.shape} ${styles.shape3}`}></div>
                <div className={styles.container}>
                    <div className={styles.searchContainer}>
                        <Input forecastByCityName={getCityCoordinatesHandler}
                            getUserCoordinates={getUserCoordinatesHandler}/>
                            {state.messageError ? <span className={styles.message}>{state.messageError}</span> : null}
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