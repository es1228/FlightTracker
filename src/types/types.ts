export type LiveFlight = {
  hex: string
  type: string
  flight: string
  r: string
  t: string
  desc?: string
  alt_baro: any
  alt_geom?: number
  gs: number
  ias?: number
  tas?: number
  mach?: number
  track?: number
  track_rate?: number
  roll?: number
  mag_heading?: number
  true_heading?: number
  baro_rate?: number
  geom_rate?: number
  squawk?: string
  emergency?: string
  category: string
  nav_qnh?: number
  nav_altitude_mcp?: number
  lat: number
  lon: number
  nic: number
  rc: number
  seen_pos: number
  version?: number
  nic_baro?: number
  nac_p: number
  nac_v?: number
  sil: number
  sil_type: string
  gva?: number
  sda?: number
  alert?: number
  spi?: number
  mlat: any[]
  tisb: any[]
  messages: number
  seen: number
  rssi: number
  dst: number
  dir: number
  nav_heading?: number
  wd?: number
  ws?: number
}

export type FlightResponse = {
  ac: LiveFlight[]
  msg: string
  now: number
  total: number
  ctime: number
  ptime: number
}

export type PhotonResponse = {
    features: Array<{
        properties: {
            name: string;
            country: string;
            state: string;
            osm_id: number;
        };
        geometry: {
            coordinates: number[];
        };
    }>;
};

export type PhotonFeature = {
    properties: {
        name: string;
        country: string;
        state: string;
        osm_id: number;
    };
    geometry: {
        coordinates: number[];
    };
};