import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
// import { RootState } from "./store";

export interface User {
  name: string;
  role: "user" | "guide" | "lead-guide" | "admin";
  _id: string;
  email: string;
  photo?: string;
  cart: string[];
}

// Define the initial state using that type
const initialState: User = {
  name: "",
  role: "user",
  _id: "",
  email: "",
  photo: "user.jpeg",
  cart: [
    "5c88fa8cf4afda39709c2955",
    "5c88fa8cf4afda39709c2961",
    "5c88fa8cf4afda39709c295d",
  ],
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    addUser(state, action: PayloadAction<User>) {
      const { name, _id, email, role, photo } = action.payload;
      // console.log(name, id, email, role, photo);
      state.name = name;
      state._id = _id;
      state.email = email;
      state.role = role;
      state.photo = photo || state.photo;
    },
    addItem(state, action: PayloadAction<string>) {
      const itemId = action.payload;
      console.log(itemId);
      state.cart.push(itemId);
    },
  },
});

export const { addUser, addItem } = userSlice.actions;

export default userSlice.reducer;
