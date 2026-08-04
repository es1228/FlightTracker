# FlightTracker
A simple and minimal flight tracking map.
https://es1228.github.io/FlightTracker/ 

# Motivation
I've always found live flight tracking sites such as FlightRadar24 interesting, and thought it would be interesting to build my own minimal version of these sites using purely free community data.

# Images
<img width="1918" height="910" alt="image" src="https://github.com/user-attachments/assets/a02f666e-7be7-4a26-94d7-9f893e4432d8" />

# Tech Stack
Frontend: React + TypeScript + TailwindCSS
Maps: React-Leaflet (CARTO + ESRI Basemaps)
Flights API: airplanes.live
Routes API: adsbdb.com
Location: Photon
Weather: ECCC Weather API

# Features
- Multiple Basemaps (Light, Dark, Satelite)
- Multiple Layers (Day/Night Line, Weather Radar, Airport Locations, ATC/FIR Zones)
- Location Search: Instantly go to a location using the searchbar
- Flight Search: Search any flight name to be redirected to where that flight currently is on the map
- Flight Info: Click any flight to get the flight information and lock its position to the center of the map, useful for following flights.
- Live Updates: Frequent refresh rates (every 3s)

# Contributing
Feel free to contribute by opening an issue or creating a PR.

# License
GNU GPL v3
