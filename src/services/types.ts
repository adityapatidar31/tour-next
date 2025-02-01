interface Location {
  type: string;
  coordinates: [number, number];
  description: string;
  day: number;
  _id: string;
  id: string;
}

interface Guide {
  _id: string;
  name: string;
  email: string;
  photo: string;
  role: string;
}

export interface Tour {
  startLocation: {
    type: string;
    coordinates: [number, number];
    address: string;
    description: string;
  };
  _id: string;
  name: string;
  category: string;
  duration: number;
  maxGroupSize: number;
  difficulty: string;
  ratingsAverage: number;
  ratingsQuantity: number;
  price: number;
  summary: string;
  description: string;
  imageCover: string;
  images: string[];
  startDates: string[];
  secretTour: boolean;
  locations: Location[];
  guides: Guide[];
  slug: string;
  durationWeeks: number;
  id: string;
}
