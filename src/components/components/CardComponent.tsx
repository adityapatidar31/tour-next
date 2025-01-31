import React from "react";

interface CardProps {
  category: string;
  name: string;
  duration: number;
  maxGroupSize: number;
  difficulty: string;
  ratingsAverage: number;
  ratingsQuantity: number;
  price: number;
  summary: string;
  imageCover: string;
}

const CardComponent: React.FC<CardProps> = ({
  category,
  name,
  duration,
  maxGroupSize,
  difficulty,
  ratingsAverage,
  ratingsQuantity,
  price,
  summary,
  imageCover,
}) => {
  return (
    <div className="rounded-lg shadow-lg overflow-hidden border border-gray-200">
      <img
        src={`./img/${imageCover}`}
        alt={name}
        className="w-full h-64 object-cover"
      />
      <div className="p-4">
        <h2
          className="text-2xl font-semibold"
          style={{ color: "var(--primary-foreground)" }}
        >
          {name}
        </h2>
        <p className="text-sm" style={{ color: "var(--secondary-foreground)" }}>
          {category}
        </p>
        <div className="flex justify-between mt-2">
          <div className="text-sm" style={{ color: "var(--muted-foreground)" }}>
            Duration: {duration} hours
          </div>
          <div className="text-sm" style={{ color: "var(--muted-foreground)" }}>
            Group Size: {maxGroupSize} people
          </div>
        </div>
        <div className="flex justify-between mt-2">
          <div className="text-sm" style={{ color: "var(--muted-foreground)" }}>
            Difficulty: {difficulty}
          </div>
          <div className="text-sm" style={{ color: "var(--muted-foreground)" }}>
            Price: ${price}
          </div>
        </div>
        <div className="flex justify-between mt-2">
          <div className="text-sm" style={{ color: "var(--muted-foreground)" }}>
            Ratings: {ratingsAverage} ({ratingsQuantity} reviews)
          </div>
        </div>
        <p className="text-sm" style={{ color: "var(--muted-foreground)" }}>
          {summary}
        </p>
      </div>
    </div>
  );
};

export default CardComponent;
