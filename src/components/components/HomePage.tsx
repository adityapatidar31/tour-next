import { Link } from "react-router-dom";
import CategoryFilter from "./CategoryFiller";
import CardContainer from "./CardContainer";
import { useEffect, useState } from "react";
import axios from "axios";

interface Location {
  type: string;
  coordinates: [number, number];
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

export interface Tour {
  startLocation: {
    type: string;
    coordinates: [number, number];
    address: string;
    description: string;
  };
  _id: string;
  name: string;
  category: string;
  duration: number;
  maxGroupSize: number;
  difficulty: string;
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
  durationWeeks: number;
  id: string;
}

export default function HomePage() {
  const [tours, setTours] = useState<Tour[]>([]);

  useEffect(() => {
    const fetchTours = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/v1/tours");
        const data = response.data.data.doc;
        setTours(data);
      } catch (error) {
        console.error("Error fetching tours:", error);
      }
    };
    fetchTours();
  }, []);
  console.log(tours);
  return (
    <div>
      <CategoryFilter />
      <CardContainer tours={tours} />
      <h2 className="text-2xl font-semibold">Welcome to the Home Page!</h2>
      <div className="mt-4">
        <Link to="/home/1" className="text-violet-600 hover:underline">
          Go to Content 1
        </Link>
      </div>
      <div className="mt-2">
        <Link to="/home/2" className="text-violet-600 hover:underline">
          Go to Content 2
        </Link>
      </div>
      <div className="mt-2">
        <Link to="/home/3" className="text-violet-600 hover:underline">
          Go to Content 3
        </Link>
      </div>
    </div>
  );
}
