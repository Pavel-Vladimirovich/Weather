import { ChangeEvent, useState } from 'react';
import { Field, Form, Formik } from 'formik';
import * as Yup from 'yup';

type PropsType = {
	forecastByCityName: (city: string) => void
}
const SignupSchema = Yup.object().shape({
	cityName: Yup.string().required('Required'),
  });

export const Input = ({forecastByCityName}: PropsType) => {
	const [timerId, setTimerId] = useState<number | undefined>(undefined)
	return(
	<Formik
		initialValues={{ cityName: ''}}
		validationSchema={SignupSchema}
		onSubmit={(values) => {
				clearTimeout(timerId)
				const id = setTimeout(() => {
					if(values.cityName)
					forecastByCityName(values.cityName)
				}, 2000);
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