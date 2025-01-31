import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface ImageCarouselProps {
  images: string[];
  coverImage: string;
}

export default function ImageCarousel({
  images,
  coverImage,
}: ImageCarouselProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const allImages = [coverImage, ...images];

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const scrollAmount = clientWidth * 0.8;
      scrollRef.current.scrollTo({
        left:
          direction === "left"
            ? scrollLeft - scrollAmount
            : scrollLeft + scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="relative w-full max-w-screen-xl mx-auto">
      <button
        onClick={() => scroll("left")}
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-background p-2 rounded-full shadow-md z-10"
      >
        <ChevronLeft className="w-6 h-6 text-primary" />
      </button>
      <div
        ref={scrollRef}
        className="flex gap-6 overflow-x-auto scroll-smooth scrollbar-hide px-8 py-6"
      >
        {allImages.map((src, index) => (
          <img
            key={index}
            src="https://images.unsplash.com/photo-1551698618-1dfe5d97d256?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt={`Tour Image ${index + 1}`}
            className="w-[360px] md:h-[240px] lg:w-[540px] lg:h-[360px] object-cover rounded-xl shadow-lg shrink-0"
          />
        ))}
      </div>
      <button
        onClick={() => scroll("right")}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-background p-2 rounded-full shadow-md z-10"
      >
        <ChevronRight className="w-6 h-6 text-primary" />
      </button>
    </div>
  );
}
