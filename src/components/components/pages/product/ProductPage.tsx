import { useParams } from "react-router-dom";
import { useState } from "react";
import ImageCarousel from "./Carousel";
import NameComponent from "./NameComponent";
import TourDates from "./startDate";
import Location from "./Location";
import MapComponent from "./Map";
import ReviewList from "./ReviewComponent";
import { useQuery } from "@tanstack/react-query";
import { getSingleTour } from "@/services/backend";
import ErrorComponent from "../../Error";
import SingleProductLoading from "./Loading";
import CreateReview from "./CreateReview";
import BookingModal from "./BookingModal";

function Product() {
  const { id } = useParams<{ id: string }>();
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [isBookingOpen, setIsBookingOpen] = useState(false);

  const {
    isLoading,
    data: tour,
    error,
  } = useQuery({
    queryKey: ["tour", id],
    queryFn: () => getSingleTour(id || "Invalid Id"),
  });

  if (isLoading) return <SingleProductLoading />;
  if (error || !tour) {
    return <ErrorComponent message="Invalid Id: Please Provide the valid Id" />;
  }

  return (
    <>
      <ImageCarousel images={tour.images} coverImage={tour.imageCover} />
      <div className="flex md:flex-row flex-col">
        <NameComponent
          name={tour.name}
          duration={tour.duration}
          maxGroupSize={tour.maxGroupSize}
          difficulty={tour.difficulty}
          price={tour.price}
          summary={tour.summary}
        />
        <TourDates
          startDates={tour.startDates}
          guides={tour.guides}
          ratingsAverage={tour.ratingsAverage}
          ratingsQuantity={tour.ratingsQuantity}
          onBookNow={(date) => {
            setSelectedDate(date);
            setIsBookingOpen(true);
          }}
        />
      </div>

      <div className="max-w-screen-xl mx-4">
        <Location locations={tour.locations} />
        <MapComponent locations={tour.locations} />
        <CreateReview />
        <ReviewList reviews={tour.reviews} />
      </div>

      {/* Booking Modal */}
      {tour && selectedDate && (
        <BookingModal
          isOpen={isBookingOpen}
          onClose={() => setIsBookingOpen(false)}
          tourName={tour.name}
          summary={tour.summary}
          price={tour.price}
          startDate={selectedDate}
        />
      )}
    </>
  );
}

export default Product;
