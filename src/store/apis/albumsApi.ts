import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { AlbumsType, UsersType } from "../../types";

const albumsApi = createApi({
  reducerPath: "albums",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3005" }),
  endpoints: (build) => ({
    fetchAlbums: build.query<AlbumsType, UsersType>({
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

export const { useFetchAlbumsQuery } = albumsApi;
export { albumsApi };
