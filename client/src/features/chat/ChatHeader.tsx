import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useAppSelector } from "../../app/hooks";
import { RoomStateType } from "../room/RoomSlice";
import { RoomType } from "../../types";

const ChatHeader = () => {
  const [room, setRoom] = useState<RoomType | null>(null);
  const { rooms } = useAppSelector<RoomStateType>((state) => state.room);
  let { search } = useLocation();
  let room_id = search.split("=")[1];

  useEffect(() => {
    for (let i = 0; i < rooms.length; i++) {
      const item = rooms[i];
      if (item?._id === room_id) {
        return setRoom(item);
      }
    }
    setRoom(null);
  }, [rooms, room_id]);

  return (
    <div
      className="hidden align-items-center w-full h-3rem pl-3 bg-white border-round-xl mb-5 lg:flex"
      style={{ boxShadow: "rgba(0, 0, 0, 0.04) 0px 3px 5px" }}
    >
      {!room?.name ? <>Choose Room...</> : <>{room?.name}</>}
    </div>
  );
};

export default ChatHeader;
