import { configureStore } from "@reduxjs/toolkit";
import { usersReducer, UsersType, UsersState } from "./slices";

const store = configureStore({
  reducer: {
    users: usersReducer,
  },
});

export type { UsersType, UsersState };
export { store };
