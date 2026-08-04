import { useState } from "react";
import { type LatLngTuple } from "leaflet";

const useFetchLocation = () => {
    const [location, setLocation] = useState<LatLngTuple>([40.6455112407957, -73.7864112854004]);



    const fetchLocation = () => {
        const options = {
            enableHighAccuracy: true,
        };
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const lat = position.coords.latitude;
                const lon = position.coords.longitude;
                setLocation([lat, lon]);
            },
            () => console.error("Unable to get location"),
            options,
        );
    };

    const handleLocationClick = (location: LatLngTuple) => {
        setLocation(location)
    };

    return {location, handleLocationClick, fetchLocation}
};
export default useFetchLocation;