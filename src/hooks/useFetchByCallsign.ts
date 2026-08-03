import { useEffect, useState } from "react";
import type { FlightResponse } from "../types/types";

const useFetchByCallsign = (callsign: string, triggerCount: number) => {
	const [flightLat, setFlightLat] = useState<number>();
	const [flightLon, setFlightLon] = useState<number>();
	const [lastUpdated, setLastUpdated] = useState<number>();

	useEffect(() => {
		const fetchCallsign = async () => {
			if (!callsign) return;

			try {
				const response = await fetch(
					`/api-proxy/api/v2/callsign/${callsign}`,
				);

				if (!response.ok) return null;

				const data: FlightResponse = await response.json();

				if (data.ac && data.ac.length > 0) {
					const flight = data.ac[0];

					if (flight.lat && flight.lon) {
						setFlightLat(flight.lat);
						setFlightLon(flight.lon);
						setLastUpdated(Date.now());
					}
				}
			} catch {
				console.error("Failed to fetch callsign");
			}
		};
		fetchCallsign();
	}, [callsign, triggerCount]);

	return { flightLat, flightLon, lastUpdated };
};
export default useFetchByCallsign;
