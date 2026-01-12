import React from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useLoaderData } from "react-router";

const Coverage = () => {
  const position = [23.685, 90.3563];
  const serviceCenters = useLoaderData();

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-bold text-accent">
        We are available in 64 districts
      </h1>

      <input
        type="text"
        placeholder="Search district (e.g. Dhaka)..."
        className="input input-bordered w-full max-w-xs rounded-full"
      />

      <h3 className="text-xl font-bold text-accent">
        We deliver almost all over Bangladesh
      </h3>

      <div className="h-125 w-full rounded-3xl overflow-hidden shadow-xl border-4 border-white">
        <MapContainer
          center={position}
          zoom={8}
          scrollWheelZoom={false}
          className="h-full w-full"
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          {serviceCenters.map((center) => (
            <Marker
              key={center.district}
              position={[center.latitude, center.longitude]}
            >
              <Popup>
                <strong>{center.name}</strong> <br />
                {center.district} <span>District</span> <br />
                <span> Service Area: {center.covered_area.join(", ")} </span>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
    </div>
  );
};

export default Coverage;
