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
import { useNavigate, useParams } from "react-router-dom";
import { createReview } from "@/services/backend";
import { toast } from "react-toastify";
import { queryClient } from "@/services/queryClient";

export default function Rating() {
  const [description, setDescription] = useState("");
  const [rating, setRating] = useState<number>();
  const userId = useAppSelector((store) => store.user._id);
  const navigate = useNavigate();
  const { id } = useParams();

  async function handleSubmit() {
    if (!rating) {
      toast.error("Rating is required");
      return;
    }
    if (!description) {
      toast.error("Description is required");
      return;
    }
    if (!id) {
      toast.error("Bad request. Try to create review on tour page");
      return;
    }
    const body = {
      review: description,
      rating,
      tour: id,
      user: userId,
    };
    try {
      await createReview(body);
      toast.success("Review Created Successfully");
      queryClient.invalidateQueries({ queryKey: [id] });
    } catch {
      toast.error("Failed to create review");
    }
  }

  return (
    <Card className="w-full max-w-full p-6 space-y-4">
      <CardContent className="space-y-4">
        <Select onValueChange={(value) => setRating(Number(value))} required>
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
          required
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
