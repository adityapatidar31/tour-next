import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import MultiDatePicker from "./MultiDatePicker";

const tourCategory = [
  "Sea",
  "Park",
  "City",
  "Sport",
  "Light",
  "Snow",
  "Forest",
  "Culture",
  "Adventure",
  "Fly",
  "Food",
];

export default function CreateTourPage() {
  return (
    <>
      <div className="space-y-2">
        <Label htmlFor="name">Tour Name</Label>
        <Input id="name" placeholder="Enter tour name" />
      </div>
      <div className="space-y-2">
        <Label htmlFor="duration">Duration</Label>
        <Input id="duration" type="number" placeholder="Enter Duration" />
      </div>
      <div className="space-y-2">
        <Label htmlFor="maxGroupSize">Max Group Size</Label>
        <Input
          id="maxGroupSize"
          type="number"
          placeholder="Enter max group size"
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="difficulty">Difficulty</Label>
        <Select>
          <SelectTrigger id="difficulty">
            <SelectValue placeholder="Select difficulty" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="easy">Easy</SelectItem>
            <SelectItem value="medium">Medium</SelectItem>
            <SelectItem value="difficult">Difficult</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="space-y-2">
        <Label htmlFor="difficulty">Category</Label>
        <Select>
          <SelectTrigger id="difficulty">
            <SelectValue placeholder="Select difficulty" />
          </SelectTrigger>
          <SelectContent>
            {tourCategory.map((category, i) => (
              <SelectItem value={category} key={i}>
                {category}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="space-y-2">
        <Label htmlFor="summary">Summary</Label>
        <Textarea id="summary" placeholder="Enter tour summary" />
      </div>
      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          placeholder="Enter tour description"
          className="h-40"
        />
      </div>
      <MultiDatePicker />
    </>
  );
}
