export interface UserType {
  accessToken?: string;
  refreshToken?: string;
  displayName: string;
  photoURL: string | null;
  uid: string;
  email: String;
}

export interface RoomType {
  name: string;
  _id: string;
  user_id: string;
  _v: number;
}
