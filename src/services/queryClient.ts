import { QueryClient, useMutation } from "@tanstack/react-query";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 0,
    },
  },
});

import { deleteReview, updateReview } from "@/services/backend";
import { toast } from "react-toastify";

export function useUpdateReview() {
  return useMutation({
    mutationFn: async ({
      tourId,
      review,
      rating,
      reviewId,
    }: {
      tourId: string;
      review: string;
      rating: number;
      reviewId: string;
    }) => {
      if (!tourId) throw new Error("Tour ID is required");
      if (!review) throw new Error("Review is required");
      if (!rating) throw new Error("Rating is required");
      if (!reviewId) throw new Error("reviewID is required");
      return await updateReview(tourId, review, rating, reviewId);
    },
    onSuccess: (_, { tourId }) => {
      toast.success("Review Updated Successfully");

      queryClient.invalidateQueries({ queryKey: ["tour", tourId] });
      queryClient.invalidateQueries({ queryKey: ["reviews"] });
    },
    onError: (error) => {
      toast.error(error.message || "Failed to update review");
    },
  });
}

export function useDeleteReview() {
  return useMutation({
    mutationFn: async (reviewId: string) => {
      return await deleteReview(reviewId);
    },
    onSuccess: () => {
      toast.success("Review Delete Successfully");
      queryClient.invalidateQueries({ queryKey: ["tour", "reviews"] });
      queryClient.invalidateQueries({ queryKey: ["reviews"] });
    },
    onError: (error) => {
      toast.error(error.message || "Failed to delete review");
    },
  });
}
