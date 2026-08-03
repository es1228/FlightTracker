import { useEffect } from "react";
import type { FlightResponse } from "../types/types";

const useFetchByCallsign = (callsign: string) => {
	if (!callsign) return;

	useEffect(() => {
		const fetchCallsign = async (callsign: string) => {
			try {
				const response = await fetch(
					`https://opendata.adsb.fi/api/v2/callsign/${callsign}`,
				);

				if (!response.ok) return null;

				const data: FlightResponse = await response.json();

				if (data.ac && data.ac.length > 0) {
					const flight = data.ac[0];

					if (flight.lat && flight.lon)
						return {
							lat: flight.lat,
							lon: flight.lon,
						};
				}
			} catch {
				console.error("Failed to fetch callsign");
			}
		};
        fetchCallsign(callsign);
	}, [callsign]);
};
export default useFetchByCallsign;
