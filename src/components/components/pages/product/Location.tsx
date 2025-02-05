import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { MapPin } from "lucide-react";

interface Location {
  type: string;
  coordinates: [number, number];
  name: string;
  description: string;
  day: number;
  _id: string;
  id: string;
  image: string;
}

interface LocationProps {
  locations: Location[];
}

const LocationComponent: React.FC<LocationProps> = ({ locations }) => {
  return (
    <div className="space-y-6 px-4 mb-6">
      <h2 className="text-2xl font-semibold flex items-center gap-3">
        <span>
          <MapPin className="w-6 h-6 text-violet-500" />
        </span>
        Locations
      </h2>
      <Separator />
      <div className="space-y-6">
        {locations.map((location) => (
          <Card key={location.id} className="overflow-hidden">
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4 items-center">
              <div className="md:col-span-2">
                <img
                  src={`/img/${location.image}`}
                  alt={location.name}
                  className=" object-cover rounded-lg"
                />
              </div>
              <CardContent className="md:col-span-3 p-6">
                <h3 className="text-xl font-bold">Day: {location.day}</h3>

                <h3 className="text-xl font-bold">{location.name}</h3>
                <p className="text-gray-600 mt-2">{location.description}</p>
              </CardContent>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default LocationComponent;
