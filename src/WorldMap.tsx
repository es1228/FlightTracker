import {
	LayerGroup,
	LayersControl,
	MapContainer,
	TileLayer,
	WMSTileLayer,
	Pane,
	GeoJSON,
	Marker,
	Popup,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import * as L from "leaflet";
import { NightRegion } from "react-leaflet-night-region";
import type { Feature, GeoJsonObject, Geometry } from "geojson";
import type { LatLngTuple } from "leaflet";
import "leaflet-rotatedmarker";
import planeIconUrl from "./assets/plane.png";
import useFetchFlights from "./hooks/useFetchFlights";
import { useEffect, useMemo, useState, useCallback } from "react";
import useFetchLocation from "./hooks/useFetchLocation";
import useSearch from "./hooks/useSearch";
import Searchbar from "./components/Searchbar";
import Button from "./components/Button";
import useFetchByCallsign from "./hooks/useFetchByCallsign";
import useFetchRoute from "./hooks/useFetchRoute";
import MapRecenter from "./components/MapRecenter";
import MapTracker from "./components/MapTracker";
import MapEventsListener from "./components/MapEventsListener";

const planeIcon = L.icon({
	iconUrl: planeIconUrl,
	iconSize: [32, 32],
	iconAnchor: [16, 16],
	popupAnchor: [0, -16],
});

const geoJSONStyle = () => ({
	color: "green",
	fillOpacity: 0,
	weight: 2,
});

const onEachFeature = (feature: Feature<Geometry>, layer: L.Layer) => {
	feature.properties && layer.bindPopup(feature.properties.name);
};

const WorldMap = () => {
	const [atcBoundaries, setAtcBoundaries] = useState<GeoJsonObject | null>(
		null,
	);
	const [airports, setAirports] = useState<GeoJsonObject | null>(null);

	useEffect(() => {
		fetch("/data/fir.json")
			.then((res) => res.json())
			.then((data: GeoJsonObject) => setAtcBoundaries(data));

		fetch("/data/airports.json")
			.then((res) => res.json())
			.then((data: GeoJsonObject) => setAirports(data));
	}, []);

	const [lat, setLat] = useState(40.6455112407957);
	const [lon, setLon] = useState(-73.7864112854004);

	const [flyToTarget, setFlyToTarget] = useState<LatLngTuple | null>(null);

	const { flights } = useFetchFlights(lat, lon);

	const { location, handleLocationClick, fetchLocation } = useFetchLocation();
	const { items, handleFocus, handleBlur, handleSearch } =
		useSearch(handleLocationClick);

	const [selectedCallsign, setSelectedCallsign] = useState<string>("");
	const [isTrackingLocked, setIsTrackingLocked] = useState<boolean>(false);
	const [triggerCount, setTriggerCount] = useState<number>(0);
	const { flightLat, flightLon, lastUpdated } = useFetchByCallsign(
		selectedCallsign,
		triggerCount,
	);

	const { dep, arr } = useFetchRoute(selectedCallsign);

	const targetAircraftCoords: LatLngTuple | null = useMemo(() => {
		if (!selectedCallsign) return null;

		const locFlight = flights.find((f) => f.flight === selectedCallsign);

		if (locFlight?.lat && locFlight?.lon)
			return [locFlight.lat, locFlight.lon];

		if (flightLat && flightLon) return [flightLat, flightLon];

		return null;
	}, [selectedCallsign, flightLat, flightLon, flights]);

	useEffect(() => {
		if (flightLat && flightLon && isTrackingLocked) {
			setLat(flightLat);
			setLon(flightLon);
			setFlyToTarget([flightLat, flightLon]);
		}
	}, [flightLat, flightLon, lastUpdated, isTrackingLocked]);

	useEffect(() => {
		setLat(location[0]);
		setLon(location[1]);
		setFlyToTarget(location);
	}, [location]);

	const handleMapDragChange = useCallback(
		(newLat: number, newLon: number) => {
			setLat(newLat);
			setLon(newLon);
			setFlyToTarget(null);
		},
		[],
	);

	const handleFlightSubmit = (callsign: string) => {
		setSelectedCallsign(callsign);
		setTriggerCount((prev) => prev + 1);
		setIsTrackingLocked(true);
	};

	const [timeKey, setTimeKey] = useState(Date.now());

	useEffect(() => {
		const interval = setInterval(() => {
			setTimeKey(Date.now());
		}, 300000);
		return () => clearInterval(interval);
	}, []);

	const weatherLayer = useMemo(
		() => (
			<LayersControl.Overlay name="Weather">
				<Pane name="radar-layer" style={{ zIndex: 1000 }}>
					<LayerGroup>
						<WMSTileLayer
							key={timeKey}
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
		),
		[timeKey],
	);

	const terminatorLayer = useMemo(
		() => (
			<LayersControl.Overlay name="Day/Night">
				<NightRegion
					fillColor="#000"
					fillOpacity={0.4}
					color="#ff0000"
				/>
			</LayersControl.Overlay>
		),
		[],
	);

	const atcLayer = useMemo(
		() => (
			<LayersControl.Overlay name="ATC Boundaries">
				<GeoJSON
					key={JSON.stringify(atcBoundaries).length}
					data={atcBoundaries as GeoJsonObject}
					style={geoJSONStyle}
					onEachFeature={onEachFeature}
				/>
			</LayersControl.Overlay>
		),
		[atcBoundaries],
	);

	const airportsLayer = useMemo(
		() => (
			<LayersControl.Overlay name="Airports">
				<GeoJSON
					key={JSON.stringify(airports).length}
					data={airports as any}
					style={geoJSONStyle}
					onEachFeature={onEachFeature}
				/>
			</LayersControl.Overlay>
		),
		[airports],
	);

	return (
		<>
			<div className="fixed z-50" style={{ zIndex: 1000 }}>
				<div className="fixed top-18 left-5 z-50 flex items-center gap-2">
					<p className="rounded-3xl bg-neutral-800/40 p-4 text-white backdrop-blur-3xl">
						Enter Location
					</p>
					<Button
						handleClick={() => {
							setIsTrackingLocked(false);
							fetchLocation();
						}}
						icon="my_location"
						text="Current"
					/>
				</div>
				<div className="fixed top-35">
					<Searchbar
						placeholder="Enter Location..."
						handleChange={handleSearch}
						handleBlur={handleBlur}
						handleFocus={() => {
							setIsTrackingLocked(false);
							handleFocus();
						}}
					/>
				</div>
				<div className="fixed top-50 left-5 z-50 rounded-3xl bg-neutral-800/40 backdrop-blur-3xl md:w-md">
					{items}
				</div>
				<div className="fixed bottom-20">
					<p className="mb-5 ml-5 rounded-3xl bg-neutral-800/40 p-4 text-white backdrop-blur-3xl">
						Track Flight (Click to Lock)
					</p>
					<Searchbar
						placeholder="Callsign (Press ENTER)"
						handleSubmit={handleFlightSubmit}
					/>
				</div>
			</div>
			<MapContainer
				center={[lat, lon]}
				zoom={8}
				minZoom={8}
				maxZoom={18}
				maxBounds={[
					[-85, -Infinity],
					[85, Infinity],
				]}
				maxBoundsViscosity={1.0}
				worldCopyJump
			>
				<MapRecenter target={flyToTarget} />
				<MapTracker
					target={targetAircraftCoords}
					isLocked={isTrackingLocked}
				/>
				<MapEventsListener
					handleChange={handleMapDragChange}
					onUserInteraction={() => setIsTrackingLocked(false)}
				/>
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
					{weatherLayer}
					{terminatorLayer}
					{atcLayer}
					{airportsLayer}
				</LayersControl>
				{flights
					.filter((flight) => !flight?.category?.startsWith("c"))
					.map((flight) => (
						<Marker
							key={flight.hex}
							position={[flight.lat, flight.lon]}
							icon={planeIcon}
							ref={(marker) => {
								if (marker) {
									marker.setRotationAngle(
										flight.track ??
											flight.true_heading ??
											flight.mag_heading ??
											flight.dir,
									);
									marker.setRotationOrigin("center center");
								}
							}}
							eventHandlers={{
								click: () => {
									setSelectedCallsign(flight.flight);
									setIsTrackingLocked(true);
								},
							}}
						>
							<Popup autoPan={false} autoClose={false}>
								<p>Flight Number: {flight.flight}</p>
								<p>
									Altitude: {Math.round(flight.alt_baro)} ft
								</p>
								<p>
									Heading:{" "}
									{Math.round(
										flight.track ??
											flight.true_heading ??
											flight.mag_heading ??
											flight.dir,
									)}
									°
								</p>
								<p>Speed: {Math.round(flight.gs)} knots</p>
								<p>Type: {flight.t}</p>
								<p>
									Route: {dep}-{arr}
								</p>
							</Popup>
						</Marker>
					))}
			</MapContainer>
		</>
	);
};
export default WorldMap;
