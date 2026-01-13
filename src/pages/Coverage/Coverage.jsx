import React, { useRef, useState } from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import MarkerClusterGroup from "react-leaflet-cluster"; // Install this package
import "leaflet/dist/leaflet.css";
import { useLoaderData } from "react-router";
import L from "leaflet";

import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";
import { toast } from "react-toastify";

const customIcon = new L.Icon({
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
});

const Coverage = () => {
  const serviceCenters = useLoaderData();
  const mapRef = useRef(null);
  const [selectedDistrict, setSelectedDistrict] = useState(null);

  const focusLocation = (center) => {
    setSelectedDistrict(center.district);
    if (mapRef.current) {
      mapRef.current.flyTo([center.latitude, center.longitude], 12, {
        duration: 1.5,
      });
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    const query = e.target.location.value.toLowerCase();
    if (!query) return;

    const match = serviceCenters.find((c) =>
      c.district.toLowerCase().includes(query)
    );

    if (match) {
      focusLocation(match);
    } else {
      toast.error("No service center found in this district yet!", {
        position: "top-center",
      });
    }
  };

  return (
    <div className="p-4 md:p-8 space-y-6 md:space-y-8">
      {/* Header & Search */}
      <div className="flex flex-col gap-6">
        <div>
          <h1 className="text-3xl md:text-4xl font-black text-accent mb-2">
            Service Coverage
          </h1>
          <p className="text-granite-gray">
            Quickly find our hubs across 64 districts in Bangladesh.
          </p>
        </div>

        <form
          onSubmit={handleSearch}
          className="w-full max-w-2xl mx-auto lg:mx-0"
        >
          <div className="relative flex items-center bg-white shadow-lg rounded-full p-1 border border-gray-100">
            <input
              name="location"
              type="text"
              placeholder="Enter district name..."
              className="input border-none w-full bg-transparent pl-5 pr-2 py-2 md:py-3 outline-none text-accent text-sm md:text-base"
            />
            <button className="btn btn-primary text-granite-gray rounded-full px-5 md:px-8 shadow-md border-none btn-sm md:btn-md">
              Search
            </button>
          </div>
        </form>
      </div>

      <div className="flex flex-col lg:grid lg:grid-cols-4 gap-6 h-125 md:h-150">
        {/* Sidebar List */}
        <div className="hidden lg:flex lg:col-span-1 bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden flex-col">
          <div className="p-4 bg-pale font-bold text-accent border-b text-center">
            Available Hubs
          </div>
          <div className="overflow-y-auto flex-1 divide-y divide-gray-50">
            {serviceCenters.map((center) => (
              <button
                key={center.district}
                onClick={() => focusLocation(center)}
                className={`w-full text-left p-4 hover:bg-primary/5 transition-colors ${
                  selectedDistrict === center.district
                    ? "bg-primary/10 border-l-4 border-primary"
                    : ""
                }`}
              >
                <p className="font-bold text-accent">{center.district}</p>
                <p className="text-xs text-gray-500 truncate">{center.name}</p>
              </button>
            ))}
          </div>
        </div>

        {/* Map Container */}
        <div className="flex-1 lg:col-span-3 rounded-2xl md:rounded-[2.5rem] overflow-hidden shadow-2xl border-2 md:border-8 border-white relative z-0 min-h-87.5">
          <MapContainer
            center={[23.685, 90.3563]}
            zoom={7}
            scrollWheelZoom={true}
            className="h-full w-full"
            ref={mapRef}
          >
            <TileLayer
              attribution="&copy; CartoDB"
              url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
            />

            <MarkerClusterGroup chunkedLoading>
              {serviceCenters.map((center) => (
                <Marker
                  key={center.district}
                  position={[center.latitude, center.longitude]}
                  icon={customIcon}
                >
                  <Popup>
                    <div className="p-1">
                      <h4 className="font-bold text-lg text-primary">
                        {center.name}
                      </h4>
                      <p className="text-sm text-accent mb-1">
                        {center.district} District
                      </p>
                      <div className="text-xs text-gray-500">
                        <strong>Coverage:</strong>{" "}
                        {center.covered_area.join(", ")}
                      </div>
                    </div>
                  </Popup>
                </Marker>
              ))}
            </MarkerClusterGroup>
          </MapContainer>
        </div>

        <div className="flex lg:hidden overflow-x-auto pb-2 gap-2 scrollbar-hide">
          {serviceCenters.map((center) => (
            <button
              key={center.district}
              onClick={() => focusLocation(center)}
              className={`shrink-0 px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap transition-all ${
                selectedDistrict === center.district
                  ? "bg-primary text-granite-gray"
                  : "bg-white border border-gray-200 text-accent"
              }`}
            >
              {center.district}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Coverage;
