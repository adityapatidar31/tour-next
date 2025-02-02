import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface Review {
  review: string;
  rating: number;
  userId: string;
  tourId: string;
  id: string;
}

interface CounterState {
  review: string;
  rating: number;
  userId: string;
  tourId: string;
  id: string;
}

// Define the initial state using that type
const initialState: CounterState = {
  id: "",
  tourId: "",
  userId: "",
  rating: 5,
  review: "",
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    addReview(state, action: PayloadAction<Review>) {
      const { tourId, id, userId, rating, review } = action.payload;
      // console.log(name, id, email, role, photo);
      state.id = id;
      state.tourId = tourId;
      state.userId = userId;
      state.rating = rating;
      state.review = review;
    },
  },
});

export const { addReview } = userSlice.actions;

export default userSlice.reducer;
