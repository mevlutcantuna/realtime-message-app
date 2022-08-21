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
  created_date: Date;
  updated_date: Date;
}

export interface MessageType {
  user: {
    name: String;
    id: string;
  };
  _id?: string;
  content: string;
  created_date: Date;
  room_id: string;
  __v?: number;
}
