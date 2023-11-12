import axios from "axios";
const API_KEY = 'XSpB9599oXWIP7IG0Q5OQxmkrG6wFRxG'

const instance = axios.create({
    baseURL: 'http://dataservice.accuweather.com/',
});

export const weatherAPI = {
    getSpecificLocationByIPAddress(ipAddress: string){
       return instance.get<SpecificLocationType>(`locations/v1/cities/ipaddress?apikey=${API_KEY}&q=${ipAddress}`).then((data => data.data))
    },
    getDailyForecasts(locationKey: string){
        return instance.get<DailyForecastsType[]>(`forecasts/v1/daily/5day/${locationKey}?apikey=${API_KEY}&metric=true`).then(data => (data.data))
    }
}
//types
type SpecificLocationType = {
    Key: string,
    "Type": "City",
    "Rank": 20,
    "LocalizedName": "Minsk",
    "EnglishName": "Minsk",
    "PrimaryPostalCode": "",
    Region: {
        ID: string
        LocalizedName: string
        EnglishName: string
    },
    "Country": {
        "ID": "BY",
        "LocalizedName": "Belarus",
        "EnglishName": "Belarus"
    },
    "AdministrativeArea": {
        "ID": "HM",
        "LocalizedName": "Minsk City",
        "EnglishName": "Minsk City",
        "Level": 1,
        "LocalizedType": "Municipality",
        "EnglishType": "Municipality",
        "CountryID": "BY"
    },
    "TimeZone": {
        "Code": "MSK",
        "Name": "Europe/Minsk",
        "GmtOffset": 3,
        "IsDaylightSaving": false,
        "NextOffsetChange": null
    },
    "GeoPosition": {
        "Latitude": 53.9,
        "Longitude": 27.576,
        "Elevation": {
            "Metric": {
                "Value": 213,
                "Unit": "m",
                "UnitType": 5
            },
            "Imperial": {
                "Value": 698,
                "Unit": "ft",
                "UnitType": 0
            }
        }
    }
}

export type DailyForecastsType = {
    Date: string
    EpochDate: number
    Temperature: {
        Minimum: {
            Value: number
            Unit: string
            UnitType: number
        }
        Maximum: {
            Value: number
            Unit: string
            UnitType: number
        }
    }
    Day: {
        Icon: number
        IconPhrase: string
        HasPrecipitation: boolean
        PrecipitationType: string
        PrecipitationIntensity: string
    }
    Night: {
        Icon: number
        IconPhrase: string
        HasPrecipitation: boolean
        PrecipitationType: string
        PrecipitationIntensity: string
    }
    Sources: [
        string
    ]
    MobileLink: string
    Link: string
}

