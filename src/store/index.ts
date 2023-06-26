import { configureStore } from "@reduxjs/toolkit";
import { usersReducer, UsersType, UsersState } from "./slices";

const store = configureStore({
  reducer: {
    users: usersReducer,
  },
});

// Inferred type for AppDispatch: { users: UsersState }
export type AppDispatch = typeof store.dispatch;
export type { UsersType, UsersState };
export * from "./thunks";
export { store };
