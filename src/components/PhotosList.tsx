import { ReactNode } from "react";
import Button from "./Button";
import PhotosListItem from "./PhotosListItem";
import Skeleton from "./Skeleton";
import { useFetchPhotosQuery, useAddPhotoMutation } from "../store";
import { AlbumsType } from "../types";

interface PhotosListProps {
  album: AlbumsType;
}

function PhotosList({ album }: PhotosListProps) {
  const { data, isFetching, error } = useFetchPhotosQuery(album);
  const [addPhoto, addPhotoResults] = useAddPhotoMutation();

  const handleAddPhoto = () => {
    addPhoto(album);
  };

  let content: ReactNode;
  if (isFetching) {
    content = <Skeleton className="h-8 w-8" times={4} />;
  } else if (error) {
    content = <div>Error fetching photos...</div>;
  } else {
    content =
      data &&
      data.map((photo) => {
        return <PhotosListItem key={photo.id} photo={photo} />;
      });
  }

  return (
    <div>
      <div className="m-2 flex flex-row items-center justify-between">
        <h3 className="text-lg font-bold">Photos In {album.title}</h3>
        <Button
          loading={addPhotoResults.isLoading}
          onClick={handleAddPhoto}
          primary
        >
          + Add Photo
        </Button>
      </div>
      <div>{content}</div>
    </div>
  );
}

export default PhotosList;
