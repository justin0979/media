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
    // note: REMOVE PAUSE() FOR PRODUCTION
    fetchFn: async (...args) => {
      await pause(1000);
      return fetch(...args);
    },
    // note: REMOVE PAUSE() ABOVE FOR PRODUCTION
  }),
  tagTypes: ["Album", "UsersAlbums"],
  endpoints: (build) => ({
    removeAlbum: build.mutation<AlbumsType[], AlbumsType>({
      invalidatesTags: (result, error, album) => {
        return [{ type: "Album", id: album.id }];
      },
      query: (album) => {
        return {
          url: `/albums/${album.id}`,
          method: "DELETE",
        };
      },
    }),
    addAlbum: build.mutation<AlbumsType[], UsersType>({
      invalidatesTags: (result, error, user) => [
        { type: "UsersAlbums", id: user.id },
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
    /*
     *  See Redux Toolkit docs for following method
     *  https://redux-toolkit.js.org/rtk-query/usage-with-typescript#typing-providestagsinvalidatestags
     */
    fetchAlbums: build.query<AlbumsType[], UsersType>({
      providesTags: (result, error, user) => {
        return result
          ? [
              ...result.map((album) => ({
                type: "Album" as const,
                id: album.id,
              })),
              { type: "UsersAlbums", id: user.id },
            ]
          : [{ type: "UsersAlbums", id: user.id }];
      },
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

export const {
  useRemoveAlbumMutation,
  useAddAlbumMutation,
  useFetchAlbumsQuery,
} = albumsApi;
export { albumsApi };
