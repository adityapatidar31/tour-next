import { Card, CardContent } from "@/components/ui/card";
import StarComponent from "../../Star";
import { useAppSelector } from "@/services/hooks";
import { useNavigate } from "react-router-dom";
import { getAllReviewByUser } from "@/services/backend";
import ReviewPageLoader from "./ReviewPageLoading";
import { UpdateReviewModel } from "./UpdateReview";
import { DeleteReview } from "./DeleteReview";
import { useQuery } from "@tanstack/react-query";
import ErrorComponent from "../../Error";

export default function ReviewPage() {
  const { _id: userId } = useAppSelector((store) => store.user);
  const navigate = useNavigate();
  const {
    data: reviews,
    isPending,
    isError,
  } = useQuery({
    queryKey: ["reviews"],
    queryFn: async () => {
      if (!userId) {
        navigate("/login");
        return [];
      }
      return await getAllReviewByUser(userId);
    },
  });

  if (isPending) {
    return <ReviewPageLoader />;
  }
  if (isError && !reviews) {
    return <ErrorComponent message="Failed to fetch Reviews Try again Later" />;
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
                <DeleteReview reviewId={review._id} />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
