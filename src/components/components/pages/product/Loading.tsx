import { Skeleton } from "@/components/ui/skeleton";

export default function SingleProductLoading() {
  return (
    <div className="space-y-6 p-6">
      <div className="w-full max-w-screen-xl mx-auto">
        <Skeleton className="w-full h-[360px] rounded-xl" />
      </div>
      <div className="flex md:flex-row flex-col gap-6">
        <div className="w-full max-w-2xl">
          <Skeleton className="h-10 w-3/4 mb-4" />
          <Skeleton className="h-6 w-full mb-2" />
          <Skeleton className="h-6 w-2/3 mb-2" />
          <Skeleton className="h-6 w-1/2 mb-2" />
          <Skeleton className="h-6 w-1/3" />
        </div>
        <div className="w-full max-w-2xl">
          <Skeleton className="h-10 w-1/2 mb-4" />
          <Skeleton className="h-6 w-3/4 mb-2" />
          <Skeleton className="h-6 w-full mb-2" />
          <Skeleton className="h-6 w-2/3 mb-2" />
          <Skeleton className="h-6 w-1/2" />
        </div>
      </div>
      <div className="max-w-screen-xl mx-4 space-y-6">
        <div>
          <Skeleton className="h-10 w-1/4 mb-4" />
          <Skeleton className="h-6 w-1/2 mb-2" />
          <Skeleton className="h-40 w-full rounded-xl" />
        </div>
        <Skeleton className="h-80 w-full rounded-xl" />
        <div className="space-y-4">
          <Skeleton className="h-10 w-1/4 mb-4" />
          <Skeleton className="h-6 w-full mb-2" />
          <Skeleton className="h-6 w-3/4 mb-2" />
          <Skeleton className="h-6 w-1/2" />
        </div>
      </div>
    </div>
  );
}
