import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { usersReducer, UsersState } from "./slices";
import { albumsApi, photosApi } from "./apis";

const store = configureStore({
  reducer: {
    users: usersReducer,
    /*
     *  instead of just using: albums: albumsApi.reducer
     *  we use below just in case we have a typo either here or in the albumsApi
     */
    [albumsApi.reducerPath]: albumsApi.reducer,
    [photosApi.reducerPath]: photosApi.reducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware()
      .concat(albumsApi.middleware)
      .concat(photosApi.middleware);
  },
});

setupListeners(store.dispatch);

// Inferred type for AppDispatch: { users: UsersState }
export type AppDispatch = typeof store.dispatch;
export type { UsersState };
export * from "./thunks";
export {
  useRemoveAlbumMutation,
  useFetchAlbumsQuery,
  useAddAlbumMutation,
  useRemovePhotoMutation,
  useFetchPhotosQuery,
  useAddPhotoMutation,
} from "./apis";
export { store };
