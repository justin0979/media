import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UsersType {
  name: string;
}

interface UsersState {
  data: UsersType[];
}

const usersSlice = createSlice({
  name: "users",
  initialState: {
    data: [],
  } as UsersState,
  reducers: {},
});

export type { UsersType, UsersState };
export const usersReducer = usersSlice.reducer;
