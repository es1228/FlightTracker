import { MapContainer, TileLayer } from "react-leaflet";
import 'leaflet/dist/leaflet.css';

const WorldMap = () => {
	return (
		<MapContainer center={[0, 0]} zoom={3} minZoom={3} maxZoom={18} maxBounds={[[-85, -Infinity], [85, Infinity]]} maxBoundsViscosity={1.0}>
			<TileLayer url="https://mt1.google.com/vt/lyrs=y&x={x}&y={y}&z={z}" />
		</MapContainer>
	);
};
export default WorldMap;
