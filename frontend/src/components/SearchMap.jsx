import React from "react";
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";


const customIcon = new L.Icon({
  iconUrl: "/icons/paw-location.png",
  iconSize: [30, 40],
  iconAnchor: [15, 40],
  popupAnchor: [0, -40],
});

const SearchMap = ({ profiles, setSelectedProfile }) => {
  return (
    <aside className="map-container">
      <MapContainer center={[20.5937, 78.9629]} zoom={5} className="map">
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

        {profiles.map((profile) => (
          <Marker
            key={profile.id}
            position={[profile.lat, profile.lng]}
            icon={customIcon}
            eventHandlers={{
              click: () => setSelectedProfile(profile),
            }}
          >
            <Popup>{profile.name} - {profile.service}</Popup>
          </Marker>
        ))}
      </MapContainer>
    </aside>
  );
};

export default SearchMap;
