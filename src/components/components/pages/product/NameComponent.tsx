import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface TourNameProps {
  name: string;
  duration: number;
  maxGroupSize: number;
  difficulty: string;
  price: number;
  summary: string;
}

export default function NameComponent({
  name,
  duration,
  maxGroupSize,
  difficulty,
  price,
  summary,
}: TourNameProps) {
  return (
    <Card className="max-w-2xl p-6">
      <CardHeader>
        <CardTitle className="text-3xl font-bold text-primary">
          {name}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-lg space-y-2">
          <p className="mt-4 text-muted-foreground">{summary}</p>

          <p>
            <strong>Duration:</strong> {duration} days
          </p>
          <p>
            <strong>Max Group Size:</strong> {maxGroupSize} people
          </p>
          <p>
            <strong>Difficulty:</strong>{" "}
            {difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}
          </p>
          <p>
            <strong>Price:</strong> ${price}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
