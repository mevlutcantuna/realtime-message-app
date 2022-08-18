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
        <div className="w-full h-full max-w-20rem mr-2 lg:mr-4 lg:w-full w-5rem">
            <div className="mb-5 border-round-xl hidden lg:flex">
                <input
                    className="w-full h-3rem pl-3 border-round-xl"
                    placeholder="SEARCH"
                    style={{ boxShadow: "rgba(0, 0, 0, 0.04) 0px 3px 5px" }}
                />
            </div>
            <div
                className="w-full min-h-full h-85vh-to-73vh bg-white border-round-xl p-2"
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
                    <button onClick={showModal}
                        className="transition-all transition-duration-500 text-aling-center lg:hidden w-3rem h-3rem px-3 py-2 border-round-xl hover-circle cursor-pointer hover:bg-indigo-100"
                    >
                        +
                    </button>
                </div>
                <ul className="overflow-scroll hide-scroll">
                    <li className="py-2 lg:p-2 flex align-items-center border-round-xl justify-content-center lg:justify-content-start w-full cursor-pointer mb-2 hover:bg-indigo-50 hover:text-800">
                        <span className="transition-all transition-duration-500 flex align-items-center justify-content-center bg-indigo-300 w-3rem h-3rem mr-0 lg:mr-3 text-white text-xl border-round-xl hover-circle">
                            CR
                        </span>
                        <span className="hidden lg:flex">Chat Room 1</span>
                    </li>
                    <li className="py-2 lg:p-2 flex align-items-center border-round-xl justify-content-center lg:justify-content-start w-full cursor-pointer mb-2 hover:bg-indigo-50 hover:text-800">
                        <span className="transition-all transition-duration-500 flex align-items-center justify-content-center bg-indigo-300 w-3rem h-3rem mr-0 lg:mr-3  text-white text-xl border-round-xl hover-circle">
                            CR
                        </span>
                        <span className="hidden lg:flex">Chat Room 1</span>
                    </li>
                    <li className="py-2 lg:p-2 flex align-items-center border-round-xl justify-content-center lg:justify-content-start w-full cursor-pointer mb-2 hover:bg-indigo-50 hover:text-800">
                        <span className="transition-all transition-duration-500 flex align-items-center justify-content-center bg-indigo-300 w-3rem h-3rem mr-0 lg:mr-3 text-white text-xl border-round-xl hover-circle">
                            CR
                        </span>
                        <span className="hidden lg:flex">Chat Room 1</span>
                    </li>
                </ul>
            </div>
            <CreateRoomModal
                visible={isModalVisible}
                onOk={handleOk}
                onCancel={handleCancel}
            />
        </div >
    );
};

export default SideBar;
