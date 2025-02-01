import axios from "axios";
import { Tour } from "./types";

const BASE_URL = "https://tour-next.onrender.com/";

export async function getTours(): Promise<Tour[]> {
  const response = await axios.get(`${BASE_URL}api/v1/tours`);
  console.log(response);

  return response?.data?.data?.doc;
}
