import { useEffect, useState } from "react";
import type { FlightResponse, LiveFlight } from "../types/types";

const useFetchFlights = (lat: number, lon: number) => {
	const [flights, setFlights] = useState<LiveFlight[]>([]);

	const fetchLiveFlights = async () => {
		try {
			const response = await fetch(
				`/api-proxy/api/v3/lat/${lat}/lon/${lon}/dist/250`,
			);
			const data: FlightResponse = await response.json();
			setFlights(data.ac.filter((flight) => flight.lat !== null));
		} catch (error) {
			console.error(error);
		}
	};

	useEffect(() => {
		fetchLiveFlights();
		const interval = setInterval(fetchLiveFlights, 3000);
        return () => clearInterval(interval)
	}, [lat, lon]);
	return { flights };
};
export default useFetchFlights;
