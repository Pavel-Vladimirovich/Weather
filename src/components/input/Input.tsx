import * as React from 'react';
import {ChangeEvent, useEffect, useState} from 'react';
import {Field, Form, Formik, FormikHelpers} from 'formik';
import style from "./input.module.scss"
import {LocationButton} from "../locationButton/LocationButton.tsx";

type PropsType = {
    forecastByCityName: (city: string, submitProps: FormikHelpers<FormValues>) => void
    getUserCoordinates: () => void
}

export type FormValues = {
    cityName: string
}

export const Input = React.memo(({forecastByCityName, getUserCoordinates}: PropsType) => {

    const [timerId, setTimerId] = useState<number | undefined>(undefined)
    const initialValue: FormValues = {
        cityName: ''
    }
    const getUserCoordinatesHandler = () => {
        getUserCoordinates()
    }
    useEffect(() => {
        return () => {
            clearTimeout(timerId)
        }
    }, [timerId])

    return (
        <Formik
            initialValues={initialValue}
            onSubmit={(values, submitProps) => {
                const id = setTimeout(() => {
                    values.cityName && forecastByCityName(values.cityName, submitProps)
                }, 2000);
                setTimerId(+id)
            }}
        >
            {({values, handleChange, submitForm}) => (
                <Form className={style.searchContainer}>
                    <Field className={style.input} type="text" name="cityName" placeholder="Weather in your city"
                           value={values.cityName}
                           onChange={(e: ChangeEvent<HTMLInputElement>) => {
                               handleChange(e)
                               submitForm()
                           }}/>
                    <LocationButton className={style.button} getUserCoordinates={getUserCoordinatesHandler}/>
                </Form>
            )}
        </Formik>
    )
});