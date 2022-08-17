import React from 'react'
import { Modal } from 'antd';

type Props = {
    visible: boolean;
    onOk: () => void
    onCancel: () => void
}

const CreateRoomModal: React.FC<Props> = ({ visible, onOk, onCancel }) => {
    return (
        <Modal visible={visible} onOk={onOk} onCancel={onCancel} footer={null} width={400}>
            <div className='mt-4'>
                <input className='w-full border-round-md py-2 px-3 surface-200' placeholder='Type new room name...' />
                <div className='mt-3 flex justify-content-end'>
                    <button className='py-1 px-3 cursor-pointer border-round-md hover:bg-indigo-100'>
                        create
                    </button>
                </div>
            </div>
        </Modal>
    )
}

export default CreateRoomModal