import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
// import { RootState } from "./store";

interface CounterState {
  name: string;
  role: "user" | "guide" | "lead-guide" | "admin";
  id: string;
  email: string;
  photo: string;
}

interface User {
  name: string;
  role: "user" | "guide" | "lead-guide" | "admin";
  id: string;
  email: string;
  photo?: string;
}

// Define the initial state using that type
const initialState: CounterState = {
  name: "",
  role: "user",
  id: "",
  email: "",
  photo: "",
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    addUser(state, action: PayloadAction<User>) {
      const { name, id, email, role, photo } = action.payload;
      state.name = name;
      state.id = id;
      state.email = email;
      state.role = role;
      state.photo = photo || "";
    },
  },
});

export const { addUser } = userSlice.actions;

export default userSlice.reducer;
