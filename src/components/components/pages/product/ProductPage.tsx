import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ImageCarousel from "./Carousel";
import NameComponent from "./NameComponent";
import TourDates from "./startDate";
import Location from "./Location";
import MapComponent from "./Map";
import ReviewList from "./ReviewComponent";

export interface Location {
  type: string;
  coordinates: [number, number];
  name: string;
  description: string;
  day: number;
  _id: string;
  id: string;
}

interface Guide {
  _id: string;
  name: string;
  email: string;
  photo: string;
  role: string;
}

interface User {
  _id: string;
  name: string;
  photo: string;
}

interface Review {
  _id: string;
  review: string;
  rating: number;
  createAt: string;
  user: User;
  tour: string;
  __v: number;
  id: string;
}

export interface CompleteTour {
  startLocation: {
    type: string;
    coordinates: [number, number];
    address: string;
    description: string;
  };
  _id: string;
  name: string;
  duration: number;
  maxGroupSize: number;
  difficulty: string;
  category: string;
  ratingsAverage: number;
  ratingsQuantity: number;
  price: number;
  summary: string;
  description: string;
  imageCover: string;
  images: string[];
  startDates: string[];
  secretTour: boolean;
  locations: Location[];
  guides: Guide[];
  slug: string;
  __v: number;
  durationWeeks: number;
  reviews: Review[];
  id: string;
}

function Product() {
  const [tour, setTour] = useState<CompleteTour>();
  const { id } = useParams();
  useEffect(
    function () {
      async function fetchSingleTour() {
        try {
          const res = await axios.get(
            `https://tour-next.onrender.com/api/v1/tours/${id}`
          );
          const data = res.data.data.doc;
          setTour(data);
        } catch (error) {
          console.log(error);
        }
      }

      fetchSingleTour();
    },
    [id]
  );
  if (!tour) return;
  console.log(tour);
  return (
    <>
      <ImageCarousel images={tour.images} coverImage={tour.imageCover} />
      <div className="flex md:flex-row flex-col ">
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
        />
      </div>

      <div className="max-w-screen-xl mx-4">
        <Location locations={tour.locations} />
        <MapComponent locations={tour.locations} />
        <ReviewList reviews={tour.reviews} />
      </div>
    </>
  );
}

export default Product;
