
function currentPosition(): Promise<{ latitude: number; longitude: number }> {
    return new Promise((resolve, reject) => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position: GeolocationPosition) => {
                    const {latitude, longitude} = position.coords
                    // console.log(`Latitude: ${latitude}, Longitude: ${longitude}`);
                    resolve({ latitude, longitude });
                },
                () => {
                    reject(new Error("Unable to retrieve your location"));
                }
            );
        } else {
            reject(new Error("Geolocation not supported"));
        }
    });
}

export default currentPosition;
