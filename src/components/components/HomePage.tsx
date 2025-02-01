import { Link } from "react-router-dom";
import CategoryFilter from "./CategoryFiller";
import CardContainer from "./CardContainer";
import { useEffect, useState } from "react";
import axios from "axios";

export default function HomePage() {
  const [tours, setTours] = useState([]);

  useEffect(() => {
    const fetchTours = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/v1/tours");
        console.log(response.data); // Log output
        setTours(response.data);
      } catch (error) {
        console.error("Error fetching tours:", error);
      }
    };
    fetchTours();
  }, []);
  return (
    <div>
      <CategoryFilter />
      <CardContainer />
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
