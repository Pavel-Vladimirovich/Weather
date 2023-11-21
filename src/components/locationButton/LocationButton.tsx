import {useFormikContext} from "formik";
import locationIcon from "../../assets/svg/location.svg"

type PropsType = {
    getUserCoordinates: () => void
    className: string
}

export const LocationButton = ({getUserCoordinates, className}: PropsType) => {

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
                <img src={locationIcon} alt="" />
            </button>
        </>
    );
};

