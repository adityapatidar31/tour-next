import { Card, CardContent } from "@/components/ui/card";
import StarComponent from "../../Star";
import { useAppSelector } from "@/services/hooks";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getAllReviewByUser } from "@/services/backend";
import { ReviewPageReview } from "@/services/types";
import ReviewPageLoader from "./ReviewPageLoading";
import { UpdateReviewModel } from "./UpdateReview";
import { DeleteReview } from "./DeleteReview";

export default function ReviewPage() {
  const { _id: userId } = useAppSelector((store) => store.user);
  const [reviews, setReviews] = useState<ReviewPageReview[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const navigate = useNavigate();
  useEffect(
    function () {
      if (!userId) {
        navigate("/login");
        return;
      }
      setIsLoading(true);
      async function getReviews() {
        const data = await getAllReviewByUser(userId);
        setReviews(data);
      }
      setIsLoading(false);
      getReviews();
    },
    [userId, navigate]
  );
  if (isLoading) {
    return <ReviewPageLoader />;
  }
  return (
    <div className="px-12 min-w-[615px]">
      <h1 className="text-3xl font-bold mb-6">Your Reviews</h1>
      <div className="grid gap-4">
        {reviews.map((review) => (
          <Card key={review._id} className="flex gap-4 p-4 shadow-md">
            <img
              src={`/img/${review.tour.imageCover}`}
              alt={review.tour.name}
              className="w-32 h-24 object-cover rounded-lg"
            />
            <CardContent className="flex-1">
              <div className="flex justify-between items-center mb-2">
                <h2 className="text-xl font-semibold">{review.tour.name}</h2>
                <StarComponent rating={review.rating} />
              </div>
              <p className="text-gray-600 mb-2">
                <span className="font-bold">Review:</span> {review.review}
              </p>
              <div className="flex gap-2">
                <UpdateReviewModel
                  defaultRating={review.rating}
                  defaultDescription={review.review}
                  tourName={review.tour.name}
                  tourId={review.tour.id}
                  reviewId={review._id}
                />
                <DeleteReview />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
