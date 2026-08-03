import { type ChangeEvent, useEffect, useState } from "react";
import { type PhotonFeature, type PhotonResponse } from "../types/types";
import { type LatLngTuple } from "leaflet";

const useSearch = (handleLocationClick: (location: LatLngTuple) => void) => {
    const [query, setQuery] = useState<string>("");
    const [locations, setLocations] = useState<PhotonFeature[]>([]);

    const handleBlur = () => setLocations([]);
    const handleFocus = () => fetchLocations(query);
    const handleSearch = (e: ChangeEvent<HTMLInputElement>) => setQuery(e.target.value);

    useEffect(() => {
        if (query.length >= 3) {
            const timer = setTimeout(() => {
                fetchLocations(query);
            }, 250);
            return () => clearTimeout(timer);
        } else setLocations([]);
    }, [query]);

    const fetchLocations = async (value: string) => {
        try {
            const response = await fetch(
                `https://photon.komoot.io/api/?q=${encodeURIComponent(value)}`,
            );
            const data: PhotonResponse = await response.json();
            setLocations(data.features.slice(0, 5));
        } catch {
            console.error("Could not search location");
        }
    };

    const items = locations?.map((features) => (
        <li
            key={features.properties.osm_id}
            onMouseDown={() =>
                handleLocationClick([
                    features.geometry.coordinates[1],
                    features.geometry.coordinates[0],
                ])
            }
            className="list-none p-3 first-of-type:rounded-t-3xl last-of-type:rounded-b-3xl hover:bg-neutral-200/60 dark:hover:bg-neutral-800/60"
        >
            <div
                key={features.properties.osm_id}
                className="flex flex-row gap-1"
            >
                <span className="material-symbols-rounded text-black dark:text-white">
                    location_on
                </span>
                <p className="text-black dark:text-white">
                    {features.properties.name
                        ? `${features.properties.name},`
                        : ""}{" "}
                    {features.properties.state
                        ? `${features.properties.state},`
                        : ""}{" "}
                    {features.properties.country
                        ? `${features.properties.country}`
                        : ""}
                </p>
            </div>
        </li>
    ));
    return { items, handleFocus, handleBlur, handleSearch };
};
export default useSearch;