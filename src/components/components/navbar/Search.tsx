import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useDebouncedCallback } from "use-debounce";

export default function SearchInput() {
  const [value, setValue] = useState("");
  const debounced = useDebouncedCallback(
    // function
    (value) => {
      setValue(value);
    },
    // delay in ms
    1000
  );

  console.log(value);
  return (
    <Input
      type="text"
      // defaultValue={defaultValue}
      onChange={(e) => debounced(e.target.value)}
      placeholder="Search Tour"
    />
  );
}
