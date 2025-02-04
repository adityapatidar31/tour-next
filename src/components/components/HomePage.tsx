import CategoryFilter from "./CategoryFiller";
import CardContainer from "./CardContainer";
import { Separator } from "../ui/separator";

import { useQuery } from "@tanstack/react-query";
import { getTours } from "@/services/backend";
import HomePageLoading from "./HomePageLoading";
import ErrorComponent from "./Error";
import { useSearchParams } from "react-router-dom";
import FilterComponent from "./Filter";
import { useMemo } from "react";
import { Filter } from "@/services/types";
import { MapPin } from "lucide-react";

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
      <div className="flex items-center gap-2 text-2xl font-semibold mt-3 ">
        <MapPin className="w-6 h-6 text-violet-500" />
        <span>Tours</span>
      </div>
      <Separator className="my-3" />
      {isLoading && <HomePageLoading />}
      {error && (
        <ErrorComponent message="There is error on server side. Please try again letter" />
      )}
      {tours && <CardContainer tours={tours} />}
    </div>
  );
}
