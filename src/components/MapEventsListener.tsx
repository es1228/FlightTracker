import { useRef } from "react";
import { useMapEvents } from "react-leaflet";

type MapEventProps = {
	handleChange: (lat: number, lon: number) => void;
	onUserInteraction: () => void;
};

const MapEventsListener = ({
    handleChange,
    onUserInteraction,
}: MapEventProps) => {
    const timerRef = useRef<number | null>(null);

    const map = useMapEvents({
        dragstart: () => {
            onUserInteraction();
        },
        moveend: () => {
            if (timerRef.current) clearTimeout(timerRef.current);

            timerRef.current = setTimeout(() => {
                const center = map.getCenter();
                handleChange(center.lat, center.lng);
            }, 1000);
        },
    });

    return null;
};

export default MapEventsListener;