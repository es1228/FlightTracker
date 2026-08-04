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

export type ADSBDBRoot = {
  response: ADSBDBResponse
}

export type ADSBDBResponse = {
  flightroute: Flightroute
}

export type Flightroute = {
  callsign: string
  callsign_icao: string
  callsign_iata: string
  airline: Airline
  origin: Origin
  destination: Destination
}

export type Airline = {
  name: string
  icao: string
  iata: string
  country: string
  country_iso: string
  callsign: string
}

export type Origin = {
  country_iso_name: string
  country_name: string
  elevation: number
  iata_code: string
  icao_code: string
  latitude: number
  longitude: number
  municipality: string
  name: string
}

export type Destination = {
  country_iso_name: string
  country_name: string
  elevation: number
  iata_code: string
  icao_code: string
  latitude: number
  longitude: number
  municipality: string
  name: string
}
