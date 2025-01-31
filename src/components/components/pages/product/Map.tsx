import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

const locations = [
  {
    coordinates: [28.6139, 77.209] as [number, number],
    name: "New Delhi",
  },
  {
    coordinates: [19.076, 72.8777] as [number, number],
    name: "Mumbai",
  },
  {
    coordinates: [13.0827, 80.2707] as [number, number],
    name: "Chennai",
  },
  {
    coordinates: [12.9716, 77.5946] as [number, number],
    name: "Bangalore",
  },
  {
    coordinates: [22.5726, 88.3639] as [number, number],
    name: "Kolkata",
  },
];

// Make sure you define the icon outside of the map render
const customIcon = new L.Icon({
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
});

const FitBounds = ({
  locations,
}: {
  locations: { coordinates: [number, number]; name: string }[];
}) => {
  const map = useMap();
  const bounds = locations.map((location) => location.coordinates);
  map.fitBounds(bounds);
  return null;
};

const MapComponent = () => {
  return (
    <div className="w-full h-[500px] rounded-2xl overflow-hidden shadow-lg">
      <MapContainer
        center={[25.781842, -80.128473]}
        zoom={7}
        scrollWheelZoom={false}
        className="h-full w-full"
      >
        <TileLayer
          url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/">CARTO</a>'
        />
        <FitBounds locations={locations} />
        {locations.map((location, index) => (
          <Marker key={index} position={location.coordinates} icon={customIcon}>
            <Popup>{location.name}</Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default MapComponent;
