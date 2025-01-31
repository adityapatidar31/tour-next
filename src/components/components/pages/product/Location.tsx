import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

interface Location {
  id: string;
  name: string;
  image: string;
  description: string;
  day: number;
}

interface LocationProps {
  locations: Location[];
}

const LocationComponent: React.FC<LocationProps> = ({ locations }) => {
  return (
    <div className="space-y-6 px-4">
      <h2 className="text-2xl font-semibold">Locations</h2>
      <Separator />
      <div className="space-y-6">
        {locations.map((location) => (
          <Card key={location.id} className="overflow-hidden">
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4 items-center">
              <div className="md:col-span-2">
                <img
                  src="https://images.unsplash.com/photo-1551698618-1dfe5d97d256?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
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
