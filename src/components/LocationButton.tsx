import {useFormikContext} from "formik";
import style from "./locationButton.module.scss"
type Props = {
    getUserCoordinates: () => void
    className: string
}

const CoordinatesButton = ({getUserCoordinates, className}: Props) => {

    const { resetForm } = useFormikContext();

    const onClickHandler = () => {
        getUserCoordinates()
        resetForm()
    }
    return (
        <>
            <button
                className={className}
                type="submit"
                onClick={onClickHandler}
            >
               Use Your Location
            </button>
        </>
    );
};

export default CoordinatesButton;
