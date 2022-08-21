import React, { useRef } from "react";
import { generateLogo } from "../../lib/utils";
import { RoomType } from "../../types";
import { useLocation, useNavigate } from "react-router-dom";
import { SpeedDial } from "primereact/speeddial";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { UserStateType } from "../user/userSlice";
import { deleteRoom } from "./RoomSlice";
import toast from "react-hot-toast";

interface Props {
  room: RoomType;
}

const RoomItem: React.FC<Props> = ({ room }) => {
  const { user } = useAppSelector<UserStateType>((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  let { search } = useLocation();
  let room_id = search.split("=")[1];
  const toastRef = useRef<any>(null);

  const selectRoom = (id: string) => {
    return navigate(`?room=${id}`);
  };

  const deleteRoomCommand = async (id: string) => {
    const res = await dispatch(deleteRoom(id));
    if (res.payload) {
      toast.success("Room deleted.");
      return navigate("/");
    } else {
      return toast.error("Something went wrong.");
    }
  };

  const items = [
    {
      label: "delete",
      icon: "pi pi-trash",
      command: async () => {
        await deleteRoomCommand(room_id);
      },
    },
  ];

  return (
    <div>
      <li
        onClick={() => selectRoom(room._id)}
        className={`transition-all transition-duration-200 py-2 lg:p-2 flex align-items-center border-round-xl w-full  lg:justify-content-start w-full cursor-pointer mb-2 ${
          room_id === room._id ? "" : "hover:bg-indigo-50"
        } hover:text-800 ${
          room._id === room_id ? "bg-indigo-100 text-800" : ""
        }`}
        key={room._id}
      >
        <div className="flex align-items-center justify-content-center lg:justify-content-start w-full">
          <span
            className={`transition-all transition-duration-500 flex align-items-center justify-content-center bg-indigo-300 w-3rem h-3rem mr-0 lg:mr-3 text-white text-xl border-round-xl hover-circle ${
              room._id === room_id ? "border-circle" : ""
            }`}
          >
            {generateLogo(room.name)}
          </span>
          <span className="hidden lg:flex">{room.name}</span>
        </div>
        <div
          className={`${
            room._id === room_id && user?.uid === room.user_id
              ? "flex"
              : "hidden"
          }`}
        >
          <SpeedDial
            showIcon="pi pi-cog"
            model={items}
            className="hidden lg:flex relative"
            direction="left"
            buttonClassName="w-2rem h-2rem"
          />
        </div>
      </li>
    </div>
  );
};

export default RoomItem;
