import { ChangeEvent, useState } from 'react';
import {Field, Form, Formik, FormikHelpers} from 'formik';

type PropsType = {
	forecastByCityName: (city: string, submitProps: FormikHelpers<FormValues>) => void
}

export type FormValues = {
	cityName: string
}

export const Input = ({forecastByCityName}: PropsType) => {
	const [timerId, setTimerId] = useState<number | undefined>(undefined)
	const initialValue: FormValues = {
		cityName: ''
	}
	return(
	<Formik
		initialValues = {initialValue}
		onSubmit={(values,submitProps) => {
				clearTimeout(timerId)
				const id = setTimeout(() => {
					if(values.cityName)
					forecastByCityName(values.cityName, submitProps)
				}, 1000);

				setTimerId(+id)
		}}
	>
		{({ values, handleChange, submitForm }) => (
		<Form>
			<Field type="text" name="cityName" placeholder="Weather in your city" value={values.cityName}
			onChange={(e: ChangeEvent<HTMLInputElement>) => {
				handleChange(e)
				submitForm()
			}}/>
		</Form>
		)}
	</Formik>
)};