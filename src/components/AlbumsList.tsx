import { ReactNode } from "react";
import { UsersType } from "../types";

interface AlbumsListProps {
  user: UsersType;
}

function AlbumsList({ user }: AlbumsListProps) {
  return <div>Albums for {user.name}</div>;
}

export default AlbumsList;
