import React, { useRef } from "react";
import { Modal } from "antd";
import { Button } from "primereact/button";

type Props = {
  visible: boolean;
  onOk: () => void;
  onCancel: () => void;
};

const CreateRoomModal: React.FC<Props> = ({ visible, onOk, onCancel }) => {
  const inputRef = useRef(null);

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
            label="create"
            className="py-1 px-3 cursor-pointer surface-300 text-900 text-sm border-none border-round-md hover:bg-indigo-100"
          />
        </div>
      </div>
    </Modal>
  );
};

export default CreateRoomModal;
