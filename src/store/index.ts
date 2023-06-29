import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { usersReducer, UsersState } from "./slices";
import { albumsApi } from "./apis";

const store = configureStore({
  reducer: {
    users: usersReducer,
    /*
     *  instead of just using: albums: albumsApi.reducer
     *  we use below just in case we have a typo either here or in the albumsApi
     */
    [albumsApi.reducerPath]: albumsApi.reducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(albumsApi.middleware);
  },
});

setupListeners(store.dispatch);

// Inferred type for AppDispatch: { users: UsersState }
export type AppDispatch = typeof store.dispatch;
export type { UsersState };
export * from "./thunks";
export { useFetchAlbumsQuery } from "./apis";
export { store };
