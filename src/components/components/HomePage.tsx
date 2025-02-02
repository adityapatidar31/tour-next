import CategoryFilter from "./CategoryFiller";
import CardContainer from "./CardContainer";

import { useQuery } from "@tanstack/react-query";
import { getTours } from "@/services/backend";
import HomePageLoading from "./HomePageLoading";
import ErrorComponent from "./Error";
import { useSearchParams } from "react-router-dom";
import { Filter } from "@/services/types";
import FilterComponent from "./Filter";

const filter: Filter = {};

export default function HomePage() {
  const [searchParams] = useSearchParams();
  filter.category = searchParams.get("category") || undefined;

  const {
    isLoading,
    data: tours,
    error,
  } = useQuery({
    queryKey: ["tours", filter],
    queryFn: () => getTours(filter),
  });
  return (
    <div>
      <CategoryFilter />
      <FilterComponent />
      {isLoading && <HomePageLoading />}
      {error && (
        <ErrorComponent message="There is error on server side. Please try again letter" />
      )}
      {tours && <CardContainer tours={tours} />}
    </div>
  );
}
