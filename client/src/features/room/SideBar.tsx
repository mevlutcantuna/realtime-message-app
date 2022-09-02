import React, { useEffect, useState } from 'react';
import CreateRoomModal from './CreateRoomModal';
import { useAutoAnimate } from '@formkit/auto-animate/react';
import {
    ClientToServerEvents,
    RoomType,
    ServerToClientEvents,
} from '../../types';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { fetchAllRooms, setRooms } from './RoomSlice';
import RoomItem from './RoomItem';
import { Socket } from 'socket.io-client';

interface Props {
    socket: Socket<ServerToClientEvents, ClientToServerEvents> | null;
}

const SideBar: React.FC<Props> = ({ socket }) => {
    const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
    const [searchInput, setSearchInput] = useState<string>('');
    const [searchedAllRooms, setSearchedAllRooms] = useState<RoomType[]>([]);
    const [newRoom, setNewRoom] = useState<RoomType>();
    const dispatch = useAppDispatch();
    const rooms = useAppSelector((state) => state.room.rooms);
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
        //@ts-ignore
        socket?.on('get-created-room', (data) => {
            setNewRoom({ ...data });
        });
    }, [socket]);

    useEffect(() => {
        if (newRoom) {
            const roomExists = rooms?.findIndex(
                (item: RoomType) => item._id === newRoom._id
            );

            if (roomExists === -1) {
                const newRooms = [newRoom, ...rooms];
                dispatch(setRooms(newRooms));
            } else {
                dispatch(setRooms([...rooms]));
            }
        }
    }, [newRoom, dispatch]);

    useEffect(() => {
        // get all room
        dispatch(fetchAllRooms());
    }, [dispatch]);

    useEffect(() => {
        // search all rooms and set it when page initialize
        if (searchInput === '') return setSearchedAllRooms(rooms);

        let changedAllRooms = rooms.filter((room: RoomType) =>
            room.name.toLowerCase().includes(searchInput.toLowerCase())
        );
        return setSearchedAllRooms(changedAllRooms);
    }, [searchInput, rooms]);

    // @ts-ignore
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
                    style={{ boxShadow: 'rgba(0, 0, 0, 0.04) 0px 3px 5px' }}
                />
            </div>
            <div
                className="w-full min-h-full overflow-scroll h-85vh-to-73vh bg-white border-round-xl p-2"
                style={{
                    boxShadow: 'rgba(0, 0, 0, 0.04) 0px 3px 5px',
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
                <ul
                    // @ts-ignore
                    ref={animationParent}
                    className="overflow-scroll hide-scroll"
                >
                    {searchedAllRooms?.map((room: RoomType) => (
                        <RoomItem socket={socket} key={room?._id} room={room} />
                    ))}
                </ul>
            </div>
            <CreateRoomModal
                visible={isModalVisible}
                onOk={handleOk}
                onCancel={handleCancel}
                socket={socket}
            />
        </div>
    );
};

export default SideBar;
