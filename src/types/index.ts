export interface UsersType {
  name: string;
  id: number;
}

export interface AlbumsType {
  title: string;
  id: number;
  userId: number;
}

export interface PhotosType {
  url: string;
  id: number;
  albumId: number;
}
