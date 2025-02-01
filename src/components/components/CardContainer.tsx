import CardComponent from "./CardComponent";
import { Tour } from "./HomePage";

interface CardContainerProps {
  tours: Tour[];
}

function CardContainer({ tours }: CardContainerProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {tours.map((tour) => (
        <CardComponent
          key={tour.id}
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
      ))}
    </div>
  );
}

export default CardContainer;
