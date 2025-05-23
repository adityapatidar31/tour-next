import { CalendarIcon, Star } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAppSelector } from "@/services/hooks";

interface TourDatesProps {
  startDates: string[];
  guides: { name: string }[];
  ratingsAverage: number;
  ratingsQuantity: number;
  onBookNow: (date: string) => void;
}

export default function TourDates({
  startDates,
  guides,
  ratingsAverage,
  ratingsQuantity,
  onBookNow,
}: TourDatesProps) {
  const { _id: userId } = useAppSelector((store) => store.user);

  return (
    <Card className="w-full max-w-2xl m-6">
      <CardHeader>
        <CardTitle>Upcoming Tour Dates</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center gap-2 text-lg font-semibold">
          <Star className="w-5 h-5 text-yellow-500" />
          {ratingsAverage} ({ratingsQuantity} reviews)
        </div>
        <ul className="space-y-2">
          {startDates.map((date, index) => (
            <li
              key={index}
              className="flex items-center gap-2 text-muted-foreground"
            >
              <CalendarIcon className="w-5 h-5" />
              {new Date(date).toLocaleDateString("en-US", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
              {userId && (
                <button
                  className="px-3 py-1 bg-violet-600 text-white rounded-md hover:bg-violet-700"
                  onClick={() => onBookNow(date)}
                >
                  Book Now
                </button>
              )}
            </li>
          ))}
        </ul>
        <div className="mt-4">
          <h3 className="font-semibold">Guides:</h3>
          <ul className="list-disc pl-5 text-muted-foreground">
            {guides.map((guide, index) => (
              <li key={index}>{guide.name}</li>
            ))}
          </ul>
        </div>
      </CardContent>
    </Card>
  );
}
