import axios from "axios";
import { CompleteTour, Tour } from "./types";

const BASE_URL = "https://tour-next.onrender.com/";

export async function getTours(): Promise<Tour[]> {
  const response = await axios.get(`${BASE_URL}api/v1/tours`);
  return response?.data?.data?.doc;
}

export async function getSingleTour(id: string): Promise<CompleteTour> {
  const res = await axios.get(
    `https://tour-next.onrender.com/api/v1/tours/${id}`
  );
  const data = res.data.data.doc;
  return data;
}
