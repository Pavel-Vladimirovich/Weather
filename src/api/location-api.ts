import axios from "axios";

export const userLocationAPI = {
    async getUserLocation() {
        try {
            const data = await axios.get<UserLocationType>('https://ipapi.co/json');
            return (data.data);
        } catch (error: any) {
            console.error('an error occurred while requesting a location: ' + error)
        }
        
    }
}

// types
type UserLocationType = {
    ip: string,
    network: string
    version: string
    city: string
    region: string
    region_code: string
    country: string
    country_name: string
    country_code: string
    country_code_iso3: string
    country_capital: string,
    country_tld: string
    continent_code: string
    in_eu: boolean
    postal: string
    latitude: number
    longitude: number
    timezone: string
    utc_offset: string
    country_calling_code: string
    currency: string
    currency_name: string
    languages: string
    country_area: number
    country_population: number
    asn: string
    org: string
}