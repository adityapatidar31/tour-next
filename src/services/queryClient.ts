import { QueryClient, useMutation } from "@tanstack/react-query";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 0,
    },
  },
});

import { updateReview } from "@/services/backend";
import { toast } from "react-toastify";

export function useUpdateReview() {
  return useMutation({
    mutationFn: async ({
      tourId,
      review,
      rating,
    }: {
      tourId: string;
      review: string;
      rating: number;
    }) => {
      if (!tourId) throw new Error("Tour ID is required");
      if (!review) throw new Error("Review is required");
      if (!rating) throw new Error("Rating is required");

      return await updateReview(tourId, review, rating);
    },
    onSuccess: (_, { tourId }) => {
      toast.success("Review Updated Successfully");

      queryClient.invalidateQueries({ queryKey: ["tour", tourId] });
    },
    onError: (error) => {
      toast.error(error.message || "Failed to update review");
    },
  });
}
