import {Forecast} from "../api/weather-api.ts";

type Props = {
    props: Forecast | null
}

export const Card = ({props}: Props) => {
    return (
        <div>
            <ul style={{position: 'relative', zIndex: '999'}}>
                <li>{props?.weather[0].description}</li>
                <li>{props?.main.temp}</li>
                <li>{props?.main.feels_like}</li>
            </ul>
        </div>
    );
};