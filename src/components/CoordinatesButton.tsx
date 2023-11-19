import {useFormikContext} from "formik";
import style from "./coordinatesButton.module.scss"
type Props = {
    getUserCoordinates: () => void
}

const CoordinatesButton = ({getUserCoordinates}: Props) => {

    const { resetForm } = useFormikContext();

    const onClickHandler = () => {
        getUserCoordinates()
        resetForm()
    }
    return (
        <>
            <button
                className={style.button}
                type="submit"
                onClick={onClickHandler}
            >
               Use Your Location
            </button>
        </>
    );
};

export default CoordinatesButton;
