import type { LatLngTuple } from "leaflet";
import { useEffect } from "react";
import { useMap } from "react-leaflet";

type MapTrackerProps = {
	target: LatLngTuple | null;
	isLocked: boolean;
};

const MapTracker = ({ target, isLocked }: MapTrackerProps) => {
    const map = useMap();

    useEffect(() => {
        if (target && !isNaN(target[0]) && !isNaN(target[1]) && isLocked) {
            map.panTo(target);
        }
    }, [target, isLocked, map]);

    return null;
};

export default MapTracker;