import React, { useState } from "react";
import { Modal } from "antd";

const Modals = ({ children }) => {
  const [open, setOpen] = useState(true);
  return (
    <Modal
      title="Modal 1000px width"
      centered
      open={open}
      onOk={() => setOpen(false)}
      onCancel={() => setOpen(false)}
    >
      {children}
    </Modal>
  );
};

export default Modals;
