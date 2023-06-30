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
  if (isLoading) {
    content = <Skeleton className="h-10 w-full" times={3} />;
  } else if (error) {
    content = <div>Error loading albums.</div>;
  } else {
    content =
      data &&
      data.map((album) => {
        const header = <div>{album.title}</div>;
        return (
          <ExpandablePanel key={album.id} header={header}>
            Album's Photos Content
          </ExpandablePanel>
        );
      });
  }

  return (
    <div>
      <div className="m-2 flex flex-row items-center justify-between">
        <h3 className="text-lg font-bold">Albums for {user.name}</h3>
        <Button
          loading={results.isLoading}
          onClick={handleAddAlbum}
          primary
        >
          + Add Album
        </Button>
      </div>
      <div>{content}</div>
    </div>
  );
}

export default AlbumsList;
