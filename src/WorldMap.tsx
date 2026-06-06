import {
	LayerGroup,
	LayersControl,
	MapContainer,
	TileLayer,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";

const WorldMap = () => {
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
				<LayersControl.BaseLayer checked name="Satellite">
					<LayerGroup>
						<TileLayer
							url="https://tiles.stadiamaps.com/tiles/alidade_satellite/{z}/{x}/{y}{r}.png" />
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
