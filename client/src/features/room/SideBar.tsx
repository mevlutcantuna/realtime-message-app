import React, { useEffect, useState } from "react";
import CreateRoomModal from "./CreateRoomModal";
import { generateLogo } from "../../lib/utils";
import { useLocation, useNavigate } from "react-router-dom";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import { RoomType } from "../../types";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { fetchAllRooms } from "./RoomSlice";
import RoomItem from "./RoomItem";

const SideBar: React.FC = () => {
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [searchInput, setSearchInput] = useState<string>("");
  const [searchedAllRooms, setSearchedAllRooms] = useState<RoomType[]>([]);
  const dispatch = useAppDispatch();
  const allRooms = useAppSelector((state) => state.room.allRooms.data);
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

  useEffect(() => {
    // get all room
    dispatch(fetchAllRooms());
  }, [dispatch]);

  useEffect(() => {
    // search all rooms and set it when page initialize
    if (searchInput === "") return setSearchedAllRooms(allRooms);

    let changedAllRooms = allRooms.filter((room: RoomType) =>
      room.name.toLowerCase().includes(searchInput.toLowerCase())
    );
    return setSearchedAllRooms(changedAllRooms);
  }, [searchInput, allRooms]);

  return (
    <div className="w-full h-full max-w-20rem mr-2 lg:mr-4 lg:w-full w-5rem">
      <div className="mb-5 border-round-xl hidden lg:flex">
        <input
          value={searchInput}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setSearchInput(e.target.value)
          }
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
          {searchedAllRooms?.map((room: RoomType) => (
            <RoomItem key={room._id} room={room} />
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
