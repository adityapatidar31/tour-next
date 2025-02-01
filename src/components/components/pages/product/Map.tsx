import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

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
  // Correctly format the bounds as LatLngBoundsLiteral (array of arrays)
  const bounds = locations.map((location) => [
    location.coordinates[1], // latitude
    location.coordinates[0], // longitude
  ]);
  map.fitBounds(bounds as [number, number][]); // Explicitly cast the bounds type
  return null;
};

interface MapComponentProps {
  locations: {
    coordinates: [number, number];
    name: string;
  }[];
}

function MapComponent({ locations }: MapComponentProps) {
  console.log(locations[0].name);
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
          <Marker
            key={index}
            position={[location.coordinates[1], location.coordinates[0]]} // Swap coordinates here as well
            icon={customIcon}
          >
            <Popup>{location.name}</Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}

export default MapComponent;
