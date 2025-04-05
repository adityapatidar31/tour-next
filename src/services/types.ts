export interface Filter {
  category: string | null;
  durationStart: string | null;
  durationEnd: string | null;
  priceStart: string | null;
  priceEnd: string | null;
  sort: string | null;
  difficulty: string[];
  search: string | null;
}

export interface Location {
  type: string;
  coordinates: [number, number];
  name: string;
  description: string;
  day: number;
  _id: string;
  id: string;
  image: string;
}

interface Guide {
  _id: string;
  name: string;
  email: string;
  photo: string;
  role: string;
}

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
  tour: string;
  __v: number;
  id: string;
}

interface StartLocation {
  type: string;
  coordinates: [number, number];
  address: string;
  description: string;
}

export interface Tour {
  startLocation: StartLocation;
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

export interface Booking {
  razorpayOrderId: string;
  startDate: string;
  payment: number;
  people: number;

  tourName: string;
  tour: string;
  createdAt: string;
  id: string;
}

export interface CompleteTour {
  startLocation: StartLocation;
  _id: string;
  name: string;
  duration: number;
  maxGroupSize: number;
  difficulty: string;
  category: string;
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
  __v: number;
  durationWeeks: number;
  reviews: Review[];
  id: string;
}

export interface ReviewPageReview {
  _id: string;
  review: string;
  rating: number;
  user: {
    name: string;
  };
  tour: {
    name: string;
    ratingsAverage: number;
    imageCover: string;
    id: string;
  };
}

export interface BookingDetail {
  razorpayOrderId: string;
  startDate: string;
  payment: number;
  people: number;
  paymentStatus: "pending" | "confirmed" | "failed";
  user: string;
  tourName: string;
  tour: Tour;
  createdAt: string;
  id: string;
}
