import { useState } from "react";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";

export default function MultiDatePicker() {
  const [selectedDates, setSelectedDates] = useState<Date[] | undefined>([]);

  return (
    <div className="space-y-2">
      <Label>Select Start Dates</Label>
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline">
            {selectedDates && selectedDates.length > 0
              ? selectedDates.map((date) => format(date, "PPP")).join(", ")
              : "Pick dates"}
          </Button>
        </PopoverTrigger>
        <PopoverContent align="start">
          <Calendar
            mode="multiple"
            selected={selectedDates}
            onSelect={setSelectedDates}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}
