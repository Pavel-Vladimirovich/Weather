import clearSky from '../assets/svg-animated/clear-sky.svg';
import cloudy from '../assets/svg-animated/cloudy.svg';
import foggy from '../assets/svg-animated/foggy.svg';
import partlyCloudy from '../assets/svg-animated/partly-cloudy.svg';
import rainy from '../assets/svg-animated/rainy.svg';
import snowy from '../assets/svg-animated/snowy.svg';
import thundery from '../assets/svg-animated/thundery.svg';

export const weatherIcons = [
    { key: 'clear sky', iconName: clearSky, weather: 'Sunny' },
    { key: 'few clouds', iconName: partlyCloudy, weather: 'Partly cloudy' },
    { key: 'scattered clouds', iconName: cloudy, weather: 'Cloudy' },
    { key: 'broken clouds', iconName: cloudy, weather: 'Cloudy' },
    { key: 'overcast clouds', iconName: cloudy, weather: 'Cloudy' },
    { key: 'shower rain', iconName: rainy, weather: 'Rainy' },
    { key: 'moderate rain', iconName: rainy, weather: 'Rainy' },
    { key: 'light rain', iconName: rainy, weather: 'Rainy' },
    { key: 'rain', iconName: rainy, weather: 'Rainy' },
    { key: 'heavy intensity rain', iconName: rainy, weather: 'Rainy' },
    { key: 'thunderstorm', iconName: thundery, weather: 'Thundery' },
    { key: 'snow', iconName: snowy, weather: 'Snowy' },
    { key: 'light snow', iconName: snowy, weather: 'Snowy' },
    { key: 'mist', iconName: foggy, weather: 'Foggy' },
    { key: 'fog', iconName: foggy, weather: 'Foggy' },
];