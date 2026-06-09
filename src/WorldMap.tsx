import {
	LayerGroup,
	LayersControl,
	MapContainer,
	TileLayer,
	WMSTileLayer,
	Pane,
	GeoJSON,
	Marker,
	Tooltip,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import * as L from "leaflet"
import { NightRegion } from "react-leaflet-night-region";
import type { Feature, GeoJsonObject, Geometry } from "geojson";
import atcBoundariesMap from "./data/fir.json"
import { useEffect, useState } from "react";
import { type FlightResponse, type LiveFlight } from "./types/types";
import "leaflet-rotatedmarker";
import planeIconUrl from "./assets/plane.png"

const planeIcon = L.icon({
	iconUrl: planeIconUrl,
	iconSize: [32, 32],
	iconAnchor: [16, 16],
	popupAnchor: [0, -16]
})

const geoJSONStyle = () => (
	{
		color: "green",
		fillOpacity: 0,
		weight: 2,
	}
)

const onEachFeature = (feature: Feature<Geometry>, layer: L.Layer) => {
	feature.properties && layer.bindPopup(feature.properties.name)
}

const WorldMap = () => {
	const [flights, setFlights] = useState<LiveFlight[]>([]);

	const fetchLiveFlights = async () => {
		try {
			const response = await fetch("https://opensky-api-response.onrender.com/api/flights?min_lat=40&max_lat=45&min_lon=-80&max_lon=-75");
			const data: FlightResponse = await response.json();
			setFlights(data.flights)
		}
		catch (error) {
			console.error(error);
		}
	}

	useEffect(() => {
		fetchLiveFlights()
	}, [])

	return (
		<MapContainer
			center={[0, 0]}
			zoom={3}
			minZoom={3}
			maxZoom={18}
			maxBounds={[
				[-85, -Infinity],
				[85, Infinity],
			]}
			maxBoundsViscosity={1.0}
			worldCopyJump
		>
			<LayersControl>
				<LayersControl.Overlay name="Radar">
					<Pane name="radar-layer" style={{ zIndex: 1000 }}>
						<LayerGroup>
							<WMSTileLayer
								url="https://geo.weather.gc.ca/geomet?"
								params={{
									layers: "Radar_1km_SfcPrecipType",
									format: "image/png",
									transparent: true,
								}}
								opacity={0.7}
								attribution="© ECCC"
							/>
						</LayerGroup>
					</Pane>
				</LayersControl.Overlay>
				<LayersControl.Overlay name="Day/Night">
					<NightRegion
						fillColor="#000"
						fillOpacity={0.4}
						color="#ff000"
					/>
				</LayersControl.Overlay>
				<LayersControl.Overlay name="ATC Boundaries">
					<GeoJSON data={atcBoundariesMap as GeoJsonObject} style={geoJSONStyle} onEachFeature={onEachFeature}/>
				</LayersControl.Overlay>
			</LayersControl>
			<LayersControl>
				<LayersControl.BaseLayer checked name="Satellite">
					<LayerGroup>
						<TileLayer url="https://tiles.stadiamaps.com/tiles/alidade_satellite/{z}/{x}/{y}{r}.png" />
					</LayerGroup>
				</LayersControl.BaseLayer>
				<LayersControl.BaseLayer name="Light">
					<TileLayer url="https://tiles.stadiamaps.com/tiles/alidade_smooth/{z}/{x}/{y}{r}.png" />
				</LayersControl.BaseLayer>
				<LayersControl.BaseLayer name="Dark">
					<TileLayer url="https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png" />
				</LayersControl.BaseLayer>
			</LayersControl>
			{flights.map((flight) => (
				<Marker key={flight.hex} position={[flight.lat, flight.lng]} rotationAngle={flight.dir} icon={planeIcon}>
					<Tooltip>
						<p>Flight Number: {flight.airline_icao}{flight.flight_number}</p>
						<p>Altitide: {Math.round(flight.alt * 3.28084)} ft</p>
						<p>Direction: {flight.dir}°</p>
						<p>Speed: {Math.round(flight.speed / 1.852)} knots</p>
					</Tooltip>
				</Marker>
			))}
		</MapContainer>
	);
};
export default WorldMap;
