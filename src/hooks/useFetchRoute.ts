import { useEffect, useState } from "react";
import type { ADSBDBRoot } from "../types/types";

const useFetchRoute = (callsign: string) => {
	const [dep, setDep] = useState<string>("");
	const [arr, setArr] = useState<string>("");

	useEffect(() => {
		const fetchRoute = async () => {
			if (!callsign) return;

			try {
				const response = await fetch(
					`https://api.adsbdb.com/v0/callsign/${callsign}`,
				);

				if (!response.ok) return null;

				const data: ADSBDBRoot = await response.json();

				if (data.response.flightroute) {
					const flight = data.response.flightroute;

					if (
						flight.origin.icao_code &&
						flight.destination.icao_code
					) {
						setDep(flight.origin.icao_code);
						setArr(flight.destination.icao_code);
					}
				}
			} catch {
				console.error("Failed to fetch callsign");
			}
		};
		fetchRoute();
	}, [callsign]);

	return { dep, arr };
};
export default useFetchRoute;
