import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useUpdateReview } from "@/services/queryClient";
import { Edit } from "lucide-react";
import { useState } from "react";

export function UpdateReviewModel({
  defaultRating,
  defaultDescription,
  tourName,
  tourId,
  reviewId,
}: {
  defaultRating: number;
  defaultDescription: string;
  tourName: string;
  tourId: string;
  reviewId: string;
}) {
  const [rating, setRating] = useState<number>(defaultRating);
  const [review, setReview] = useState<string>(defaultDescription);
  const { isPending, mutate } = useUpdateReview();
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="icon">
          <Edit className="w-4 h-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{`Update ${tourName.toLowerCase()} review`}</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="flex flex-col gap-2 items-start">
            <Label className="text-right">Rating</Label>
            <Select
              onValueChange={(value) => setRating(Number(value))}
              value={rating.toString()}
              required
            >
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
          </div>
          <div className="flex flex-col gap-2 items-start">
            <Label className="text-right">Description</Label>
            <Textarea
              placeholder="Enter your feedback"
              value={review}
              onChange={(e) => setReview(e.target.value)}
              className="w-full"
              required
            />
          </div>
        </div>
        <DialogFooter>
          <Button
            type="submit"
            disabled={isPending}
            onClick={() => mutate({ review, rating, tourId, reviewId })}
          >
            {isPending ? "Updating" : "Update Review"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
