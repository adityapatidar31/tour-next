import CategoryFilter from "./CategoryFiller";
import CardContainer from "./CardContainer";

import { useQuery } from "@tanstack/react-query";
import { getTours } from "@/services/backend";
import HomePageLoading from "./HomePageLoading";

export default function HomePage() {
  const {
    isLoading,
    data: tours,
    error,
  } = useQuery({
    queryKey: ["tours"],
    queryFn: getTours,
  });

  return (
    <div>
      <CategoryFilter />
      {isLoading && <HomePageLoading />}
      {error && <p>There is error on server side. Please try again letter</p>}
      {tours && <CardContainer tours={tours} />}
    </div>
  );
}
