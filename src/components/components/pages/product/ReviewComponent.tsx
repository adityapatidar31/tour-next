import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar } from "@/components/ui/avatar";
import { Star } from "lucide-react";

interface User {
  _id: string;
  name: string;
  photo: string;
}

interface Review {
  _id: string;
  review: string;
  rating: number;
  createAt: string;
  user: User;
}

interface ReviewListProps {
  reviews: Review[];
}

const ReviewList: React.FC<ReviewListProps> = ({ reviews }) => {
  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold text-[--foreground]">
        <span>Reviews</span>
      </h2>
      <hr className="border-[--border] my-4" />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {reviews.map((review) => (
          <Card
            key={review._id}
            className="p-4 rounded-2xl shadow-lg bg-[--background]"
          >
            <CardContent className="flex flex-col gap-3">
              <div className="flex items-center gap-3">
                <Avatar>
                  <img
                    src={review.user.photo}
                    alt={review.user.name}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                </Avatar>
                <div>
                  <h4 className="font-semibold text-lg text-[--foreground]">
                    {review.user.name}
                  </h4>
                  <p className="text-sm text-[--muted]">
                    {new Date(review.createAt).toDateString()}
                  </p>
                </div>
              </div>
              <p className="text-[--foreground] text-sm">{review.review}</p>
              <div className="flex items-center gap-1 text-yellow-500">
                {[...Array(review.rating)].map((_, i) => (
                  <Star key={i} size={16} fill="currentColor" stroke="none" />
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ReviewList;
