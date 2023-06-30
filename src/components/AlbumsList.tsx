import { ReactNode } from "react";
import { UsersType } from "../types";
import { useFetchAlbumsQuery, useAddAlbumMutation } from "../store";
import Skeleton from "./Skeleton";
import ExpandablePanel from "./ExpandablePanel";
import Button from "./Button";

interface AlbumsListProps {
  user: UsersType;
}

function AlbumsList({ user }: AlbumsListProps) {
  /*
   *  Queries run immediately when the component is displayed on the screen (by default).
   *  `data` is automatically retrieved without the need of useEffect hook.
   *  `isLoading` is only true on initial fetch and will always be false afterwards.
   */
  const { data, error, isLoading } = useFetchAlbumsQuery(user);
  /*
   *  Mutations give you a function to run hen you want to change some data.
   */
  const [addAlbum, results] = useAddAlbumMutation();

  const handleAddAlbum = () => {
    addAlbum(user);
  };

  let content: ReactNode;
  if (data != undefined) {
    if (isLoading) {
      content = <Skeleton times={3} />;
    } else if (error) {
      content = <div>Error loading albums.</div>;
    } else {
      content = data.map((album) => {
        const header = <div>{album.title}</div>;
        return (
          <ExpandablePanel key={album.id} header={header}>
            Album's Photos Content
          </ExpandablePanel>
        );
      });
    }
  }

  return (
    <div>
      <div>
        Albums for {user.name}
        <Button onClick={handleAddAlbum} primary>
          + Add Album
        </Button>
      </div>
      <div>{content}</div>
    </div>
  );
}

export default AlbumsList;
