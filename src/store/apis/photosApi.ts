import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { faker } from "@faker-js/faker";
import { PhotosType, AlbumsType } from "../../types";

const photosApi = createApi({
  reducerPath: "photos",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3005" }),
  endpoints: (builder) => ({
    fetchPhotos: builder.query<PhotosType[], AlbumsType>({
      query: (album) => ({
        url: "/photos",
        params: {
          albumId: album.id,
        },
        method: "GET",
      }),
    }),
    addPhoto: builder.mutation<PhotosType[], AlbumsType>({
      query: (album) => ({
        method: "POST",
        url: "/photos",
        body: {
          albumId: album.id,
          url: faker.image.abstract(150, 150, true),
        },
      }),
    }),
    removePhoto: builder.mutation<PhotosType[], PhotosType>({
      query: (photo) => ({
        method: "DELETE",
        url: `/photos/${photo.id}`,
      }),
    }),
  }),
});

export const {
  useFetchPhotosQuery,
  useAddPhotoMutation,
  useRemovePhotoMutation,
} = photosApi;
export { photosApi };
