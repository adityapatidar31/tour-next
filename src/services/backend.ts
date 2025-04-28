import axios from "axios";
import {
  Booking,
  BookingDetail,
  CompleteTour,
  Filter,
  ReviewPageReview,
  Tour,
} from "./types";
import { User } from "@/store/userSlice";
import { Review } from "@/store/reviewSlice";
import { NameType, TypePasswordUpdate, userSchema } from "@/schema/schema";

export const BASE_URL = "https://tour-next.onrender.com/";

export const cookieSender = {
  withCredentials: true,
};

// export const BASE_URL = "http://localhost:3000/";

export async function getTours(filter: Filter): Promise<Tour[]> {
  const {
    category,
    durationStart,
    durationEnd,
    priceStart,
    priceEnd,
    sort,
    difficulty,
    search,
  } = filter;
  let url = `${BASE_URL}api/v1/tours?`;
  if (category) {
    url += `category=${category}&`;
  }
  if (durationStart) {
    url += `duration[gte]=${durationStart}&`;
  }
  if (durationEnd) {
    url += `duration[lte]=${durationEnd}&`;
  }
  if (priceStart) {
    url += `price[gte]=${priceStart}&`;
  }
  if (priceEnd) {
    url += `price[lte]=${priceEnd}&`;
  }
  if (sort) {
    url += `sort=${sort}&`;
  }

  difficulty.map((ele) => (url += `difficulty=${ele}&`));
  if (search) {
    url += `search=${search}`;
  }

  console.log(url);
  const response = await axios.get(url, cookieSender);
  return response?.data?.data?.doc;
}

export async function getSingleTour(id: string): Promise<CompleteTour> {
  const res = await axios.get(`${BASE_URL}api/v1/tours/${id}`, cookieSender);
  const data = res.data.data.doc;
  return data;
}

export async function getUser() {
  const res = await axios.get(
    `${BASE_URL}api/v1/users/isLogedIn`,
    cookieSender
  );
  return res.data.user;
}

export async function loginUser(data: {
  email: string;
  password: string;
}): Promise<User> {
  const res = await axios.post(
    `${BASE_URL}api/v1/users/login`,
    data,
    cookieSender
  );
  const user = res.data.data.user;
  return user;
}

interface signBody {
  email: string;
  password: string;
  passwordConfirm: string;
  name: string;
}

export async function signUpUser(body: signBody): Promise<User> {
  const res = await axios.post(
    `${BASE_URL}api/v1/users/signup`,
    body,
    cookieSender
  );
  return res.data.data.user;
}

export async function logoutUser() {
  await axios.post(`${BASE_URL}api/v1/users/logout`, null, cookieSender);
}

export async function createReview(body: {
  review: string;
  rating: number;
  tour: string;
  user: string;
}): Promise<Review> {
  const res = await axios.post(`${BASE_URL}api/v1/reviews`, body, cookieSender);
  return res.data.data.data;
}

interface ReviewApiResponse {
  data: {
    review: Review;
  };
}

export async function findReviewByUserAndTour(tourId: string): Promise<Review> {
  const res = await axios.get<ReviewApiResponse>(
    `${BASE_URL}api/v1/tours/${tourId}/user/review`,
    cookieSender
  );
  return res.data.data?.review;
}

export async function updateReview(
  tourId: string,
  review: string,
  rating: number,
  reviewId: string
) {
  console.log(tourId, review, rating);
  const body = {
    tourId,
    review,
    rating,
  };
  const res = await axios.patch(
    `${BASE_URL}api/v1/reviews/${reviewId}`,
    body,
    cookieSender
  );
  console.log(res);
  return res.data.data;
}

export async function deleteReview(reviewID: string): Promise<void> {
  await axios.delete(`${BASE_URL}api/v1/reviews/${reviewID}`, cookieSender);
}

export async function getAllReviewByUser(
  userId: string
): Promise<ReviewPageReview[]> {
  const res = await axios.get(
    `${BASE_URL}api/v1/reviews/user/${userId}`,
    cookieSender
  );
  console.log(res);
  return res.data.data.reviews;
}

export async function updateCurrentPassword(
  currentPassword: string,
  password: string,
  passwordConfirm: string
) {
  const body = {
    password,
    currentPassword,
    passwordConfirm,
  };
  await axios.patch(
    `${BASE_URL}api/v1/users/updateMyPassword`,
    body,
    cookieSender
  );
}

export async function getAllCartTours(tourIds: string[]): Promise<Tour[]> {
  const res = await axios.post(
    `${BASE_URL}api/v1/tours/cart`,
    { tourIds },
    cookieSender
  );
  return res.data;
}

export async function getAllBookingUser(): Promise<Booking[]> {
  const res = await axios.get(`${BASE_URL}api/v1/orders`, cookieSender);

  return res.data.data;
}

export async function createOrder(
  tourId: string,
  people: number,
  startDate: string
) {
  const res = await axios.post(
    `${BASE_URL}api/v1/orders`,
    {
      tourId,
      people,
      startDate,
    },
    cookieSender
  );
  return res;
}

export async function getOrderById(orderId: string): Promise<BookingDetail> {
  const res = await axios.get(
    `${BASE_URL}api/v1/orders/${orderId}`,
    cookieSender
  );

  return res.data.data;
}

export async function updateMyName(name: NameType) {
  const response = await axios.patch(
    `${BASE_URL}api/v1/users/name`,
    name,
    cookieSender
  );

  const parsed = userSchema.safeParse(response.data?.data?.user);

  if (parsed.error) {
    console.log("Backend is not providing the valid format of the data");
    console.log(parsed.error);
  }
  return parsed.data || null;
}

export const updateMyPassword = async (password: TypePasswordUpdate) => {
  await axios.patch(
    `${BASE_URL}api/v1/users/updateMyPassword`,
    password,
    cookieSender
  );
};

export const updateMyProfileImage = async (formData: FormData) => {
  const response = await axios.patch(
    `${BASE_URL}api/v1/users/profile`,
    formData,
    cookieSender
  );

  const parsed = userSchema.safeParse(response.data.data.user);
  if (!parsed.success) console.log(parsed.error);

  return parsed.data;
};
