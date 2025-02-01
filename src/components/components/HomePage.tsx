import CategoryFilter from "./CategoryFiller";
import CardContainer from "./CardContainer";

import { useQuery } from "@tanstack/react-query";
import { getTours } from "@/services/backend";
import HomePageLoading from "./HomePageLoading";
import ErrorComponent from "./Error";

export default function HomePage() {
  const {
    isLoading,
    data: tours,
    error,
  } = useQuery({
    queryKey: ["tours"],
    queryFn: getTours,
  });
  console.log(error);
  return (
    <div>
      <CategoryFilter />
      {isLoading && <HomePageLoading />}
      {error && (
        <ErrorComponent message="There is error on server side. Please try again letter" />
      )}
      {tours && <CardContainer tours={tours} />}
    </div>
  );
}
