import { Link } from "react-router-dom";
import CardComponent from "./CardComponent";
import { Tour } from "@/services/types";
import NoToursAvailable from "./NoTourFound";

interface CardContainerProps {
  tours: Tour[];
}

function CardContainer({ tours }: CardContainerProps) {
  return (
    <>
      {tours.length === 0 && <NoToursAvailable />}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {tours.map((tour) => (
          <Link
            to={`/home/${tour.id}`}
            key={tour.id}
            className="group transition-all duration-300 ease-in-out" // 🆕 added group class
          >
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
