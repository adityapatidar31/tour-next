import CategoryFilter from "./CategoryFiller";
import CardContainer from "./CardContainer";

import { useQuery } from "@tanstack/react-query";
import { getTours } from "@/services/backend";
import HomePageLoading from "./HomePageLoading";
import ErrorComponent from "./Error";
import { useSearchParams } from "react-router-dom";
import FilterComponent from "./Filter";
import { useMemo } from "react";
import { Filter } from "@/services/types";

export default function HomePage() {
  const [searchParams] = useSearchParams();
  const filter: Filter = useMemo(() => {
    return {
      category: searchParams.get("category"),
      sort: searchParams.get("sort"),
      durationStart: searchParams.get("durationStart"),
      durationEnd: searchParams.get("durationEnd"),
      priceStart: searchParams.get("priceStart"),
      priceEnd: searchParams.get("priceEnd"),
      difficulty: [
        ...(searchParams.get("difficultyEasy") ? ["easy"] : []),
        ...(searchParams.get("difficultyMedium") ? ["medium"] : []),
        ...(searchParams.get("difficultyHard") ? ["difficult"] : []),
      ],
      search: searchParams.get("search"),
    };
  }, [searchParams]);

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
