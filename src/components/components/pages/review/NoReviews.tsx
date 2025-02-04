import { MessageCircleOff } from "lucide-react";

function NoReviews() {
  return (
    <div className="flex flex-col items-center justify-center p-6 text-center text-gray-500">
      <MessageCircleOff className="w-16 h-16 text-violet-500" />
      <p className="mt-4 text-lg font-semibold">No reviews yet</p>
      <p className="text-sm text-gray-400">
        You have not submitted any reviews yet.
      </p>
    </div>
  );
}

export default NoReviews;
