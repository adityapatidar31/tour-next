import CategoryFilter from "./CategoryFiller";
import CardContainer from "./CardContainer";

import { useQuery } from "@tanstack/react-query";
import { getTours } from "@/services/backend";
import HomePageLoading from "./HomePageLoading";
import ErrorComponent from "./Error";
import { useSearchParams } from "react-router-dom";

export default function HomePage() {
  const [searchParams] = useSearchParams();
  console.log(searchParams.get("category"));
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
      {error && (
        <ErrorComponent message="There is error on server side. Please try again letter" />
      )}
      {tours && <CardContainer tours={tours} />}
    </div>
  );
}
