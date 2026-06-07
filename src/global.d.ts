declare module "react-leaflet-night-region" {
  import { ComponentType } from "react";
  import { PathOptions } from "leaflet";

  export interface NightRegionProps extends PathOptions {
    refreshInterval?: number;
  }

  export const NightRegion: ComponentType<NightRegionProps>;
}

declare module "*.geojson" {
    const value: GeoJSON.FeatureCollection;
    export default value;
}