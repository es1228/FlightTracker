import type { LatLngTuple } from "leaflet";
import { useEffect } from "react";
import { useMap } from "react-leaflet";

type MapRecenterProps = {
	target: LatLngTuple | null;
};

const MapRecenter = ({ target }: MapRecenterProps) => {
    const map = useMap();

    useEffect(() => {
        if (target) {
            map.setView(target);
        }
    }, [target, map]);

    return null;
};
export default MapRecenter;