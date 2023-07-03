import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { faker } from "@faker-js/faker";
import { PhotosType, AlbumsType } from "../../types";

const photosApi = createApi({
  reducerPath: "photos",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3005" }),
  tagTypes: ["Photo", "AlbumsPhotos"],
  endpoints: (builder) => ({
    fetchPhotos: builder.query<PhotosType[], AlbumsType>({
      providesTags: (result, error, album) => {
        const tags: { type: "Photo" | "AlbumsPhotos"; id: number }[] =
          result
            ? result.map((photo) => ({ type: "Photo", id: photo.id }))
            : [];
        tags.push({ type: "AlbumsPhotos", id: album.id });
        return tags;
      },
      query: (album) => ({
        url: "/photos",
        params: {
          albumId: album.id,
        },
        method: "GET",
      }),
    }),
    addPhoto: builder.mutation<PhotosType[], AlbumsType>({
      invalidatesTags: (result, error, album) => {
        return [{ type: "AlbumsPhotos", id: album.id }];
      },
      query: (album) => ({
        method: "POST",
        url: "/photos",
        body: {
          albumId: album.id,
          url: faker.image.url({ height: 150, width: 150 }),
        },
      }),
    }),
    removePhoto: builder.mutation<PhotosType[], PhotosType>({
      invalidatesTags: (result, error, photo) => {
        return [{ type: "Photo", id: photo.id }];
      },
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
