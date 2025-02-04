import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { MapPinned } from "lucide-react";
import { Separator } from "@/components/ui/separator";

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
  return (
    <div className="mb-5">
      <h2 className="text-2xl font-semibold flex items-center gap-3">
        <span>
          <MapPinned className="w-6 h-6 text-violet-500" />
        </span>
        Map
      </h2>
      <Separator className="mt-2 mb-5" />
      <div className="w-full h-[500px] rounded-2xl overflow-hidden shadow-lg">
        <MapContainer
          center={[25.781842, -80.128473]}
          zoom={7}
          scrollWheelZoom={false}
          className="h-full w-full"
        >
          <TileLayer url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png" />
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
    </div>
  );
}

export default MapComponent;
