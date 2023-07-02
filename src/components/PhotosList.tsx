import { useFetchPhotosQuery } from "../store";
import { AlbumsType } from "../types";

interface PhotosListProps {
  album: AlbumsType;
}

function PhotosList({ album }: PhotosListProps) {
  useFetchPhotosQuery(album);

  return (
    <div>
      <h1>Photos List Item</h1>
    </div>
  );
}

export default PhotosList;
