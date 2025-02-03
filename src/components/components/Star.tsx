import { Star } from "lucide-react";

function StarComponent({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-2">
      {[...Array(5)].map((_, i) => (
        <Star
          key={i}
          className={`h-4 w-4 fill-yellow-500${
            i < rating ? "" : "stroke-gray-300"
          }`}
        />
      ))}
    </div>
  );
}

export default StarComponent;
