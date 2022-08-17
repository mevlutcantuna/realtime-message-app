import React, { useState } from "react";
import CreateRoomModal from "./CreateRoomModal";

const SideBar: React.FC = () => {
    const [isModalVisible, setIsModalVisible] = useState<boolean>(false);

    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleOk = () => {
        setIsModalVisible(false);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    return (
        <div className="w-full h-full max-w-20rem mr-6 pb-4">
            <div className="mb-5 border-round-xl">
                <input
                    className="w-full h-3rem pl-3 border-round-xl"
                    placeholder="SEARCH"
                    style={{ boxShadow: "rgba(0, 0, 0, 0.04) 0px 3px 5px" }}
                />
            </div>
            <div
                className="w-full h-full bg-white border-round-xl p-2"
                style={{
                    boxShadow: "rgba(0, 0, 0, 0.04) 0px 3px 5px",
                    minHeight: "calc(100vh - 12rem)",
                }}
            >
                <div className="flex justify-content-end my-2 ">
                    <button
                        onClick={showModal}
                        className="px-3 py-2 border-round-xl cursor-pointer hover:bg-indigo-100"
                    >
                        create a room
                    </button>
                </div>
                <ul>
                    <li className="p-2 flex align-items-center border-round-xl justify-content-start w-full cursor-pointer mb-2 hover:bg-indigo-50 hover:text-800">
                        <span className="flex align-items-center justify-content-center bg-indigo-300 w-3rem h-3rem mr-3 text-white text-xl border-circle">
                            CR
                        </span>
                        <span>Chat Room 1</span>
                    </li>
                    <li className="p-2 flex align-items-center border-round-xl justify-content-start w-full cursor-pointer mb-2 hover:bg-indigo-50 hover:text-800">
                        <span className="flex align-items-center justify-content-center bg-indigo-300 w-3rem h-3rem mr-3 text-white text-xl border-circle">
                            CR
                        </span>
                        <span>Chat Room 1</span>
                    </li>
                    <li className="p-2 flex align-items-center border-round-xl justify-content-start w-full cursor-pointer mb-2 hover:bg-indigo-50 hover:text-800">
                        <span className="flex align-items-center justify-content-center bg-indigo-300 w-3rem h-3rem mr-3 text-white text-xl border-circle">
                            CR
                        </span>
                        <span>Chat Room 1</span>
                    </li>
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
