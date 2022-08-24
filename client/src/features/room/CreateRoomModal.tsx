import React, { useRef } from "react";
import { Modal } from "antd";
import { Button } from "primereact/button";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import toast from "react-hot-toast";
import { UserStateType } from "../user/userSlice";
import { createRoom, RoomStateType } from "./RoomSlice";
import { useNavigate } from "react-router-dom";
import { Socket } from "socket.io-client";
import { ClientToServerEvents, ServerToClientEvents } from "../../types";

type Props = {
  visible: boolean;
  onOk: () => void;
  onCancel: () => void;
  socket: Socket<ServerToClientEvents, ClientToServerEvents> | null;
};

const CreateRoomModal: React.FC<Props> = ({
  visible,
  onOk,
  onCancel,
  socket,
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const { user } = useAppSelector<UserStateType>((state) => state.user);
  const { loading } = useAppSelector<RoomStateType>((state) => state.room);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const submit = async () => {
    if (inputRef.current && user?.uid) {
      if (inputRef.current.value === "")
        return toast.error("Room name is required.");
      let name: string = inputRef.current.value;
      let user_id: string = user?.uid;
      let created_date = new Date();
      let updated_date = new Date();

      const res = await dispatch(
        createRoom({ name, user_id, created_date, updated_date })
      );
      if (res.payload) {
        // @ts-ignore
        socket?.emit("create-room", {
          room_id: res.payload._id,
          name: res.payload.name,
          user_id: res.payload.user_id,
          created_date: res.payload.created_date,
          updated_date: res.payload.updated_date,
        });
        onCancel();
        toast.success("Room created successfully.");
        navigate(`/?room=${res.payload._id}`);
        return (inputRef.current.value = "");
      } else {
        return toast.error("Something went wrong...");
      }
    }
  };

  return (
    <Modal
      visible={visible}
      onOk={onOk}
      onCancel={onCancel}
      footer={null}
      width={400}
    >
      <div className="mt-4">
        <input
          ref={inputRef}
          className="w-full border-round-md py-2 px-3 surface-200"
          placeholder="Type new room name..."
        />
        <div className="mt-3 flex justify-content-end">
          <Button
            onClick={submit}
            loading={loading}
            label="create"
            className="py-1 px-3 cursor-pointer surface-300 text-900 text-sm border-none border-round-md hover:bg-indigo-100"
          />
        </div>
      </div>
    </Modal>
  );
};

export default CreateRoomModal;
