import { useState } from "react";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Card } from "@/components/ui/card";
import { useNavigate, useSearchParams } from "react-router-dom";

const difficulty = ["easy", "medium", "hard"];

const sortOptions = [
  { value: "price_asc", label: "Price: Low to High" },
  { value: "price_desc", label: "Price: High to Low" },
  { value: "rating_asc", label: "Rating: Low to High" },
  { value: "rating_desc", label: "Rating: High to Low" },
];

export default function FilterComponent() {
  const [selectedDifficulty, setSelectedDifficulty] = useState<string[]>([]);
  const [searchParams, setSearchParams] = useSearchParams();

  const [duration, setDuration] = useState<[number, number]>([1, 14]);
  const [price, setPrice] = useState<[number, number]>([1000, 30000]);
  const [sort, setSort] = useState<string>(sortOptions[0].value);

  const navigate = useNavigate();

  const handleDifficultyChange = (difficulty: string) => {
    setSelectedDifficulty((prev) =>
      prev.includes(difficulty)
        ? prev.filter((d) => d !== difficulty)
        : [...prev, difficulty]
    );
  };
  function handleApplyFilter() {
    searchParams.set("durationStart", duration[0].toString());
    searchParams.set("durationEnd", duration[1].toString());
    searchParams.set("priceStart", price[0].toString());
    searchParams.set("priceEnd", price[1].toString());

    if (sort === "price_asc") searchParams.set("sort", "price");
    else if (sort === "price_desc") searchParams.set("sort", "-price");
    else if (sort === "rating_asc") searchParams.set("sort", "rating");
    else searchParams.set("sort", "-rating");

    difficulty.forEach((diff) => {
      searchParams.delete(`difficulty${diff}`);
    });

    selectedDifficulty.map((difficulty) =>
      searchParams.set(`difficulty${difficulty}`, difficulty)
    );

    setSearchParams(searchParams);
  }

  function handleClearFilter() {
    navigate("/home", { replace: true });
  }
  return (
    <div className="mx-1 sm:mx-3 my-1">
      <Card className="p-4 w-full  mx-auto space-y-4 bg-background">
        <div className="flex sm:flex-row flex-col">
          {/* Difficulty Filter */}
          <div className="w-full mb-4">
            <h3 className="text-lg font-semibold">Difficulty</h3>
            <div className="flex gap-3 mt-2">
              {difficulty.map((diff) => (
                <label key={diff} className="flex items-center gap-2">
                  <Checkbox
                    checked={selectedDifficulty.includes(diff)}
                    onCheckedChange={() => handleDifficultyChange(diff)}
                  />
                  {diff}
                </label>
              ))}
            </div>
          </div>
          {/* Sort Filter */}
          <div className="w-full">
            <h3 className="text-lg font-semibold mb-2">Sort by</h3>
            <Select value={sort} onValueChange={setSort}>
              <SelectTrigger className="w-full">
                {sortOptions.find((s) => s.value === sort)?.label}
              </SelectTrigger>
              <SelectContent>
                {sortOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        {/* Duration Filter */}
        <div className="flex sm:flex-row flex-col gap-3">
          <div className="w-full">
            <h3 className="text-lg font-semibold mb-1">Duration (days)</h3>
            <Slider
              min={1}
              max={30}
              step={1}
              value={duration}
              onValueChange={(value) => setDuration(value as [number, number])}
              className="w-full [&>span]:w-4 [&>span]:h-4 [&>span]:bg-white [&>span]:border-2 [&>span]:border-violet-500 rounded-full"
            />
            <div className="text-sm mt-2">
              {duration[0]} - {duration[1]} days
            </div>
          </div>

          {/* Price Filter */}
          <div className="w-full">
            <h3 className="text-lg font-semibold mb-1">Price (₹)</h3>
            <Slider
              min={1000}
              max={100000}
              step={100}
              value={price}
              onValueChange={(value) => setPrice(value as [number, number])}
              className="w-full [&>span]:w-4 [&>span]:h-4 [&>span]:bg-white [&>span]:border-2 [&>span]:border-violet-500 rounded-full"
            />
            <div className="text-sm mt-2">
              ₹{price[0]} - ₹{price[1]}
            </div>
          </div>
        </div>
        <div className="flex gap-3 px-6">
          <Button className="w-full mt-4" onClick={handleApplyFilter}>
            Apply Filters
          </Button>
          <Button className="w-full mt-4" onClick={handleClearFilter}>
            Clear All Filters
          </Button>
        </div>
      </Card>
    </div>
  );
}
