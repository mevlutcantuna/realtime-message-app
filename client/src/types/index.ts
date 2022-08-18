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
  id: string;
  user_id: string;
}
