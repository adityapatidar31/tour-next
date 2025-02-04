import { useEffect, useState } from "react";
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
import { createReview, findReviewByUserAndTour } from "@/services/backend";
import { toast } from "react-toastify";
import {
  queryClient,
  useDeleteReview,
  useUpdateReview,
} from "@/services/queryClient";
import { useMutation } from "@tanstack/react-query";
import { Star } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { SyncLoader } from "react-spinners";

export default function Rating() {
  const [description, setDescription] = useState("");
  const [rating, setRating] = useState<number>();
  const [reviewId, setReviewId] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const userId = useAppSelector((store) => store.user._id);
  const navigate = useNavigate();
  const { id: tourId } = useParams();
  const { mutate: updateMutate, isPending: isUpdatePending } =
    useUpdateReview();
  const { mutate: deleteMutate, isPending: isDeletePending } =
    useDeleteReview();

  const mutation = useMutation({
    mutationFn: async () => {
      if (!rating) throw new Error("Rating is required");
      if (!description) throw new Error("Description is required");
      if (!tourId)
        throw new Error("Bad request. Try to create review on tour page");

      const body = { review: description, rating, tour: tourId, user: userId };
      return await createReview(body);
    },
    onSuccess: () => {
      toast.success("Review Created Successfully");
      queryClient.invalidateQueries();
    },
    onError: (error) => {
      toast.error(error.message || "Failed to create review");
    },
  });

  useEffect(
    function () {
      async function fetchReview() {
        if (tourId && userId) {
          setIsLoading(true);
          const { id, review, rating } = await findReviewByUserAndTour(tourId);
          if (review) setDescription(review);
          if (rating) setRating(rating);
          if (id) setReviewId(id);
          setIsLoading(false);
        }
      }
      fetchReview();
    },
    [tourId, userId]
  );

  function handleUpdate() {
    if (!tourId || !description || !rating) {
      toast.error("Please fill in all required fields");
      return;
    }
    updateMutate({
      tourId,
      review: description,
      rating,
      reviewId,
    });
  }
  function handleDelete() {
    if (!reviewId) return toast.error("Review ID is not fount. Try again");
    deleteMutate(reviewId);
  }
  if (!userId) return;
  return (
    <>
      <h2 className="text-2xl font-semibold flex items-center gap-3">
        <span>
          <Star className="w-6 h-6 text-violet-500" />
        </span>
        Your review
      </h2>
      <Separator className="mt-2 mb-5" />
      <Card className="w-full max-w-full p-6 space-y-4">
        <CardContent className="space-y-4">
          <Select
            onValueChange={(value) => setRating(Number(value))}
            value={rating?.toString()}
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
          <Textarea
            placeholder="Enter your feedback"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full"
            required
          />
          {reviewId && (
            <div className="flex sm:gap-20 gap-10 justify-center">
              <Button
                onClick={handleUpdate}
                disabled={isDeletePending || isUpdatePending}
                className="w-96"
              >
                {isUpdatePending ? <SyncLoader color="#fff" /> : "Update"}
              </Button>
              <Button
                onClick={handleDelete}
                className="w-96"
                variant="destructive"
                disabled={isDeletePending || isUpdatePending}
              >
                {isDeletePending ? <SyncLoader color="#fff" /> : "Delete"}
              </Button>
            </div>
          )}
          {!reviewId &&
            (userId ? (
              <Button
                onClick={() => mutation.mutate()}
                disabled={isLoading}
                className="w-full"
              >
                {isLoading ? <SyncLoader color="#fff" /> : "Submit"}
              </Button>
            ) : (
              <Button onClick={() => navigate("/login")} className="w-full">
                Login
              </Button>
            ))}
        </CardContent>
      </Card>
    </>
  );
}
