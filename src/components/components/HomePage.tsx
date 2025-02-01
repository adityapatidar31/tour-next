import CategoryFilter from "./CategoryFiller";
import CardContainer from "./CardContainer";

import { useQuery } from "@tanstack/react-query";
import { getTours } from "@/services/backend";

export default function HomePage() {
  const {
    isLoading,
    data: tours,
    error,
  } = useQuery({
    queryKey: ["tours"],
    queryFn: getTours,
  });

  if (isLoading) return <p>Loading...</p>;
  if (!tours) return <p>No Tour Available </p>;
  if (error) {
    return <p>There is error on server side. Please try again letter</p>;
  }
  console.log(tours);
  return (
    <div>
      <CategoryFilter />
      <CardContainer tours={tours} />
    </div>
  );
}
