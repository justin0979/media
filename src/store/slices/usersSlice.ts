import { createSlice, SerializedError } from "@reduxjs/toolkit";
import { fetchUsers, addUser } from "../thunks";

interface UsersType {
  name: string;
  id?: number;
}

interface UsersState {
  data: UsersType[];
  isLoading: boolean;
  error: SerializedError | null;
}

const usersSlice = createSlice({
  name: "users",
  initialState: {
    data: [],
    isLoading: false,
    error: null,
  } as UsersState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchUsers.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error;
      });

    builder
      .addCase(addUser.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(addUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data.push(action.payload);
      })
      .addCase(addUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error;
      });
  },
});

export type { UsersType, UsersState };
export const usersReducer = usersSlice.reducer;
