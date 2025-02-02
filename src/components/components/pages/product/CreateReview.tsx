import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import { useAppSelector } from "@/services/hooks";
import { useNavigate } from "react-router-dom";
import { createReview } from "@/services/backend";

export default function Rating() {
  const [description, setDescription] = useState("");
  const [rating, setRating] = useState<number | null>(null);
  const userId = useAppSelector((store) => store.user._id);
  const navigate = useNavigate();
  async function handleSubmit() {
    console.log({ description, rating });
    const review = await createReview();
    console.log(review);
  }

  return (
    <Card className="w-full max-w-full p-6 space-y-4">
      <CardContent className="space-y-4">
        <Select onValueChange={(value) => setRating(Number(value))}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select a rating" />
          </SelectTrigger>
          <SelectContent>
            {[1, 2, 3, 4, 5].map((num) => (
              <SelectItem key={num} value={num.toString()}>
                {num}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Textarea
          placeholder="Enter your feedback"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full"
        />

        {userId ? (
          <Button onClick={handleSubmit} className="w-full">
            Submit
          </Button>
        ) : (
          <Button onClick={() => navigate("/login")} className="w-full ">
            Login
          </Button>
        )}
      </CardContent>
    </Card>
  );
}
