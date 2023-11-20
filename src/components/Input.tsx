import {ChangeEvent, useState} from 'react';
import {Field, Form, Formik, FormikHelpers} from 'formik';
import style from "./input.module.scss"
import LocationButton from './LocationButton';

type PropsType = {
    forecastByCityName: (city: string, submitProps: FormikHelpers<FormValues>) => void
    getUserCoordinates: () => void
}

export type FormValues = {
    cityName: string
}

export const Input = ({forecastByCityName, getUserCoordinates}: PropsType) => {

    const [timerId, setTimerId] = useState<number | undefined>(undefined)
    const initialValue: FormValues = {
        cityName: ''
    }
    const getUserCoordinatesHandler = () => {
        getUserCoordinates()
    }

    return (
        <Formik
            initialValues={initialValue}
            onSubmit={(values, submitProps) => {
                clearTimeout(timerId)
                const id = setTimeout(() => {
                    if (values.cityName) {
                        forecastByCityName(values.cityName, submitProps)
                    }
                }, 1500);
                setTimerId(+id)

            }}
        >
            {({values, handleChange, submitForm}) => (
                <Form>
                    <div className={style.searchContainer}>
                        <Field className={style.input} type="text" name="cityName" placeholder="Weather in your city" value={values.cityName}
                            onChange={(e: ChangeEvent<HTMLInputElement>) => {
                                handleChange(e)
                                submitForm()
                            }}/>

                         
                        <LocationButton className={style.button} getUserCoordinates={getUserCoordinatesHandler}/>
                    </div>
                </Form>
            )}

        </Formik>
    )
};