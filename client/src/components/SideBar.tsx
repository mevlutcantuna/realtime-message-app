import React from "react";

const SideBar: React.FC = () => {
    return (
        <div className="w-full h-full max-w-20rem mr-6 pb-4">
            <div
                className="mb-5 border-round-xl"
            >
                <input
                    className="w-full h-3rem pl-3 border-round-xl"
                    placeholder="SEARCH"
                    style={{ boxShadow: "rgba(0, 0, 0, 0.04) 0px 3px 5px" }}
                />
            </div>
            <div
                className="w-full h-full bg-white border-round-xl p-2"
                style={{ boxShadow: "rgba(0, 0, 0, 0.04) 0px 3px 5px", minHeight: "calc(100vh - 12rem)" }}
            >
                <ul>
                    <li className="p-2 flex align-items-center border-round-xl justify-content-start w-full cursor-pointer mb-2 hover:bg-indigo-50 hover:text-800">
                        <span className="flex align-items-center justify-content-center bg-indigo-300 w-3rem h-3rem mr-3 text-white text-xl border-circle">CR</span>
                        <span>Chat Room 1</span>
                    </li>
                    <li className="p-2 flex align-items-center border-round-xl justify-content-start w-full cursor-pointer mb-2 hover:bg-indigo-50 hover:text-800">
                        <span className="flex align-items-center justify-content-center bg-indigo-300 w-3rem h-3rem mr-3 text-white text-xl border-circle">CR</span>
                        <span>Chat Room 1</span>
                    </li>
                    <li className="p-2 flex align-items-center border-round-xl justify-content-start w-full cursor-pointer mb-2 hover:bg-indigo-50 hover:text-800">
                        <span className="flex align-items-center justify-content-center bg-indigo-300 w-3rem h-3rem mr-3 text-white text-xl border-circle">CR</span>
                        <span>Chat Room 1</span>
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default SideBar;
