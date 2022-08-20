import React, { useState } from "react";
import CreateRoomModal from "../chat/CreateRoomModal";
import { generateLogo } from "../../lib/utils";
import { useLocation, useNavigate } from "react-router-dom";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import { RoomType } from "../../types";

const SideBar: React.FC = () => {
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  //const [searchInput, setSearchInput] = useState<string>("");
  const navigate = useNavigate();
  let { search } = useLocation();
  let room_id = search.split("=")[1];
  const [animationParent] = useAutoAnimate();

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const selectRoom = (id: string) => {
    return navigate(`?room=${id}`);
  };

  const mockData = [
    {
      user_id: "1",
      name: "Room 1",
      _id: "123123123",
      _v: 0,
    },
    {
      user_id: "2",
      name: "Room 3",
      _id: "1231dsadsa23123",
      _v: 0,
    },
    {
      user_id: "3",
      name: "Room 3",
      _id: "1231312312dsad23123",
      _v: 0,
    },
  ];

  return (
    <div className="w-full h-full max-w-20rem mr-2 lg:mr-4 lg:w-full w-5rem">
      <div className="mb-5 border-round-xl hidden lg:flex">
        <input
          className="w-full h-3rem pl-3 border-round-xl"
          placeholder="SEARCH"
          style={{ boxShadow: "rgba(0, 0, 0, 0.04) 0px 3px 5px" }}
        />
      </div>
      <div
        className="w-full min-h-full overflow-scroll h-85vh-to-73vh bg-white border-round-xl p-2"
        style={{
          boxShadow: "rgba(0, 0, 0, 0.04) 0px 3px 5px",
        }}
      >
        <div className="flex justify-content-center lg:justify-content-end my-2 ">
          <button
            onClick={showModal}
            className="hidden lg:flex px-3 py-2 border-round-xl cursor-pointer hover:bg-indigo-100"
          >
            create a room
          </button>
          <button
            onClick={showModal}
            className="transition-all transition-duration-500 text-align-center lg:hidden w-3rem h-3rem px-3 py-2 border-round-xl hover-circle cursor-pointer hover:bg-indigo-100"
          >
            +
          </button>
        </div>
        {/* @ts-ignore */}
        <ul ref={animationParent} className="overflow-scroll hide-scroll">
          {mockData?.map((room: RoomType) => (
            <li
              onClick={() => selectRoom(room._id)}
              className={`transition-all transition-duration-200 py-2 lg:p-2 flex align-items-center border-round-xl justify-content-center lg:justify-content-start w-full cursor-pointer mb-2 ${
                room_id === room._id ? "" : "hover:bg-indigo-50"
              } hover:text-800 ${
                room._id === room_id ? "bg-indigo-100 text-800" : ""
              }`}
              key={room._id}
            >
              <span
                className={`transition-all transition-duration-500 flex align-items-center justify-content-center bg-indigo-300 w-3rem h-3rem mr-0 lg:mr-3 text-white text-xl border-round-xl hover-circle ${
                  room._id === room_id ? "border-circle" : ""
                }`}
              >
                {generateLogo(room.name)}
              </span>
              <span className="hidden lg:flex">{room.name}</span>
            </li>
          ))}
        </ul>
      </div>
      <CreateRoomModal
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      />
    </div>
  );
};

export default SideBar;
