import { cn } from "@/lib/utils";
import {
  LucideIcon,
  Mountain,
  Fish,
  Building,
  Bike,
  Sun,
  Snowflake,
  Trees,
  Utensils,
  PartyPopper,
  Landmark,
  Plane,
} from "lucide-react";
import { useSearchParams } from "react-router-dom";

const categories: { name: string; icon: LucideIcon }[] = [
  { name: "Sea", icon: Fish },
  { name: "Park", icon: Trees },
  { name: "City", icon: Building },
  { name: "Sport", icon: Bike },
  { name: "Light", icon: Sun },
  { name: "Snow", icon: Snowflake },
  { name: "Forest", icon: Trees },
  { name: "Food", icon: Utensils },
  { name: "Festival", icon: PartyPopper },
  { name: "Culture", icon: Landmark },
  { name: "Adventure", icon: Mountain },
  { name: "Fly", icon: Plane },
];

export default function CategoryFilter() {
  const [searchParams, setSearchParams] = useSearchParams();
  const activeCategory = searchParams.get("category");

  function addCategory(name: string) {
    searchParams.set("category", name);
    setSearchParams(searchParams);
  }

  return (
    <div className="overflow-x-auto w-full">
      <div className="flex gap-8 p-4 min-w-max">
        {categories.map(({ name, icon: Icon }) => {
          const isActive = activeCategory === name;

          return (
            <div
              key={name}
              className={cn(
                "flex flex-col items-center gap-2 p-2 cursor-pointer",
                isActive && "bg-muted rounded-sm"
              )}
              onClick={() => addCategory(name)}
            >
              <Icon className="w-16 h-16 text-primary" />
              <span className="text-m font-medium text-primary">{name}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
