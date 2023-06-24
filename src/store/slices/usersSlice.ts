import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UsersType {
  name: string;
  id?: number;
}

interface UsersState {
  data: UsersType[];
  isLoading: boolean;
  error: Object | null;
}

const usersSlice = createSlice({
  name: "users",
  initialState: {
    data: [],
    isLoading: false,
    error: null,
  } as UsersState,
  reducers: {},
});

export type { UsersType, UsersState };
export const usersReducer = usersSlice.reducer;
