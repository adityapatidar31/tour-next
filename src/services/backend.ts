import axios from "axios";
import { CompleteTour, Filter, Tour } from "./types";
import { User } from "@/store/userSlice";
import { Review } from "@/store/reviewSlice";

const BASE_URL = "https://tour-next.onrender.com/";

// const BASE_URL = "http://localhost:3000/";

export async function getTours(filter: Filter): Promise<Tour[]> {
  const {
    category,
    durationStart,
    durationEnd,
    priceStart,
    priceEnd,
    sort,
    difficulty,
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
  console.log(url);
  const response = await axios.get(url, {
    withCredentials: true,
  });
  return response?.data?.data?.doc;
}

export async function getSingleTour(id: string): Promise<CompleteTour> {
  const res = await axios.get(`${BASE_URL}api/v1/tours/${id}`, {
    withCredentials: true,
  });
  const data = res.data.data.doc;
  return data;
}

export async function getUser() {
  const res = await axios.get(`${BASE_URL}api/v1/users/isLogedIn`);
  return res.data.user;
}

export async function loginUser(data: {
  email: string;
  password: string;
}): Promise<User> {
  const res = await axios.post(`${BASE_URL}api/v1/users/login`, data, {
    withCredentials: true,
  });
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
  const res = await axios.post(`${BASE_URL}api/v1/users/signup`, body, {
    withCredentials: true,
  });
  return res.data.data.user;
}

export async function createReview(body: {
  review: string;
  rating: number;
  tour: string;
  user: string;
}): Promise<Review> {
  const res = await axios.post(`${BASE_URL}api/v1/reviews`, body, {
    withCredentials: true,
  });
  return res.data.data.data;
}

export async function findReviewForUserAndTour() {}
