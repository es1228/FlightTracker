import { useEffect, useState } from "react";
import type { FlightResponse, LiveFlight } from "../types/types";

const useFetchFlights = (lat: number, lon: number) => {
	const [flights, setFlights] = useState<LiveFlight[]>([]);

	const fetchLiveFlights = async () => {
		try {
			const url = `https://api.airplanes.live/v2/point/${lat}/${lon}/250`;
			const response = await fetch(url);
			const data: FlightResponse = await response.json();
			setFlights(data.ac.filter((flight) => flight.lat !== null));
		} catch (error) {
			console.error(error);
		}
	};

	useEffect(() => {
		fetchLiveFlights();
		const interval = setInterval(fetchLiveFlights, 3000);
		return () => clearInterval(interval);
	}, [lat, lon]);
	return { flights };
};
export default useFetchFlights;
