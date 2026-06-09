export type LiveFlight = {
  hex: string;
  reg_number: string;
  flag: string;
  lat: number;
  lng: number;
  alt: number;
  dir: number;
  speed: number;
  v_speed: number;
  squawk: string;
  flight_number: string;
  flight_icao: string;
  flight_iata: string;
  dep_icao: string;
  arr_icao: string;
  airline_icao: string;
  aircraft_icao: string;
  status: string;
  updated: number;
}

export type FlightResponse = {
  status: string;
  timestamp: string;
  count: number;
  flights: LiveFlight[];
}