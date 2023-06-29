import { configureStore } from "@reduxjs/toolkit";
import { usersReducer, UsersState } from "./slices";

const store = configureStore({
  reducer: {
    users: usersReducer,
  },
});

// Inferred type for AppDispatch: { users: UsersState }
export type AppDispatch = typeof store.dispatch;
export type { UsersState };
export * from "./thunks";
export { store };
