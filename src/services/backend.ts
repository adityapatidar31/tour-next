import axios from "axios";
import { CompleteTour, Filter, Tour } from "./types";

const BASE_URL = "https://tour-next.onrender.com/";

export async function getTours(filter: Filter): Promise<Tour[]> {
  console.log(filter);
  let url = `${BASE_URL}api/v1/tours?`;
  if (filter.category) {
    url += `category=${filter.category}&`;
  }
  const response = await axios.get(url);
  return response?.data?.data?.doc;
}

export async function getSingleTour(id: string): Promise<CompleteTour> {
  const res = await axios.get(
    `https://tour-next.onrender.com/api/v1/tours/${id}`
  );
  const data = res.data.data.doc;
  return data;
}

export async function getUser() {
  const res = await axios.get(
    "https://tour-next.onrender.com/api/v1/users/isLogedIn",
    {
      withCredentials: true, // ✅ Required to send cookies
    }
  );
  return res.data.user;
}

export async function loginUser(data: { email: string; password: string }) {
  axios.post("https://tour-next.onrender.com/api/v1/users/login", data, {
    withCredentials: true,
  });
}
