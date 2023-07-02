import { PhotosType } from "../types";

interface PhotosListItemProps {
  photo: PhotosType;
}

function PhotosListItem({ photo }: PhotosListItemProps) {
  return (
    <div>
      <img className="h-20 w-20" src={photo.url} alt="Random pic" />
    </div>
  );
}

export default PhotosListItem;
