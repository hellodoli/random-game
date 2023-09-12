import { Modal } from "antd";

export const showModalInfo = ({
  title = "",
  content = null
}: {
  title?: string;
  content?: any;
}) => {
  Modal.info({
    title,
    content,
    onOk() {}
  });
};

export const showModalSuccess = ({
  title = "Success",
  content = null
}: {
  title?: string;
  content?: any;
}) => {
  Modal.success({
    title,
    content,
    onOk() {}
  });
};

export const showModalError = ({ title = "Error", content = null }) => {
  Modal.error({
    title,
    content
  });
};
