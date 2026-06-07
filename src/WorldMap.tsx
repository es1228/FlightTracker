import {
	LayerGroup,
	LayersControl,
	MapContainer,
	TileLayer,
	WMSTileLayer,
	Pane,
	GeoJSON,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import * as L from "leaflet"
import { NightRegion } from "react-leaflet-night-region";
import type { Feature, GeoJsonObject, Geometry } from "geojson";
import atcBoundariesMap from "./data/fir.json"

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
	const params = {
		opacity: 0.7,
		layers: "Radar_1km_SfcPrecipType",
		format: "image/png",
		transparent: true,
	};
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
		>
			<LayersControl>
				<LayersControl.Overlay name="Radar">
					<Pane name="radar-layer" style={{ zIndex: 1000 }}>
						<WMSTileLayer
							url="https://geo.weather.gc.ca/geomet?"
							params={params}
						/>
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
		</MapContainer>
	);
};
export default WorldMap;
