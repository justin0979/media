import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { faker } from "@faker-js/faker";
import { AlbumsType, UsersType } from "../../types";

const albumsApi = createApi({
  reducerPath: "albums",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3005" }),
  tagTypes: ["Album"],
  endpoints: (build) => ({
    addAlbum: build.mutation<AlbumsType[], UsersType>({
      invalidatesTags: ["Album"],
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
      providesTags: ["Album"],
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
