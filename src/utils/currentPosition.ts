
function currentPosition(): Promise<{ latitude: number; longitude: number }> {
    return new Promise((resolve, reject) => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position: GeolocationPosition) => {
                    const latitude = position.coords.latitude;
                    const longitude = position.coords.longitude;
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
