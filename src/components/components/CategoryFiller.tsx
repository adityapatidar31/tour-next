import { ScrollArea } from "@/components/ui/scroll-area";

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
} from "lucide-react";

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
];

export default function CategoryFilter() {
  return (
    <ScrollArea className="w-full min-w-[800px] overflow-auto">
      <div className="flex gap-6 p-4 min-w-max">
        {categories.map(({ name, icon: Icon }) => (
          <div key={name} className="flex flex-col items-center gap-2">
            <Icon className="w-8 h-8 text-primary" />
            <span className="text-sm font-medium text-white">{name}</span>
          </div>
        ))}
      </div>
    </ScrollArea>
  );
}
