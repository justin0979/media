import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { faker } from "@faker-js/faker";
import { AlbumsType, UsersType } from "../../types";

// DEV ONLY
const pause = (duration: number) => {
  return new Promise((resolve) => {
    setTimeout(resolve, duration);
  });
};

const albumsApi = createApi({
  reducerPath: "albums",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3005",
    fetchFn: async (...args) => {
      // Note: REMOVE FOR PRODUCTION
      await pause(1000);
      return fetch(...args);
    },
  }),
  tagTypes: ["Album"],
  endpoints: (build) => ({
    addAlbum: build.mutation<AlbumsType[], UsersType>({
      invalidatesTags: (result, error, user) => [
        { type: "Album", id: user.id },
      ],
      query: (user) => {
        return {
          url: "/albums",
          method: "POST",
          body: {
            userId: user.id,
            title: faker.commerce.productName(),
          },
        };
      },
    }),
    fetchAlbums: build.query<AlbumsType[], UsersType>({
      providesTags: (result, error, user) => [
        { type: "Album", id: user.id },
      ],
      query: (user) => ({
        url: "/albums",
        params: {
          userId: user.id,
        },
        method: "GET",
      }),
    }),
  }),
});

export const { useAddAlbumMutation, useFetchAlbumsQuery } = albumsApi;
export { albumsApi };
