import { Link } from "react-router-dom";
import CardComponent from "./CardComponent";
import { Tour } from "@/services/types";
import { Separator } from "../ui/separator";
import { MapPin } from "lucide-react";

interface CardContainerProps {
  tours: Tour[];
}

function CardContainer({ tours }: CardContainerProps) {
  return (
    <>
      <div className="flex items-center gap-2 text-2xl font-semibold ">
        <MapPin className="w-6 h-6 text-violet-500" />
        <span>Tours</span>
      </div>
      <Separator className="my-3" />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {tours.map((tour) => (
          <Link to={`/home/${tour.id}`} key={tour.id}>
            <CardComponent
              category={tour.category}
              name={tour.name}
              duration={tour.duration}
              maxGroupSize={tour.maxGroupSize}
              difficulty={tour.difficulty}
              ratingsAverage={tour.ratingsAverage}
              ratingsQuantity={tour.ratingsQuantity}
              price={tour.price}
              summary={tour.summary}
              imageCover={tour.imageCover}
            />
          </Link>
        ))}
      </div>
    </>
  );
}

export default CardContainer;
