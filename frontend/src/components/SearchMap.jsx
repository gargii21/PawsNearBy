import React from "react";
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";


const customIcon = new L.Icon({
  iconUrl: "/icons/paw-location.png",
  iconSize: [30, 30],
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
    key={profile.prId} // changed to prId (matching your data)
    position={[profile.lat, profile.lng]}
    icon={customIcon}
    eventHandlers={{
      click: () => setSelectedProfile(profile),
    }}
  >
    <Popup>
  <div style={{
    textAlign: "center",
    backgroundColor: "#fff4e6",
    padding: "10px",
    borderRadius: "8px",
    boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
    width: "150px"
  }}>
    <h4 style={{ margin: "5px 0", color: "#d2691e" }}>{profile.daycare_name}</h4>
    <p style={{ margin: "4px 0", fontSize: "14px", color: "#555" }}>{profile.service}</p>
    <p style={{ margin: "4px 0", fontWeight: "bold", color: "#e6b800" }}>⭐ {profile.rating}</p>
  </div>
</Popup>

  </Marker>
))}

      </MapContainer>
    </aside>
  );
};

export default SearchMap;
