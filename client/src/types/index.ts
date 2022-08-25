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
    name: string;
    id: string;
    photoURL?: string;
  };
  _id?: string;
  content: string;
  created_date: Date;
  room_id: string;
  __v?: number;
}

export interface ServerToClientEvents {
  noArg: () => void;
  basicEmit: (a: number, b: string, c: Buffer) => void;
  withAck: (d: string, callback: (e: number) => void) => void;
}

export interface ClientToServerEvents {
  hello: () => void;
}
