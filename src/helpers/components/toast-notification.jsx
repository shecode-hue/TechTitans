import { CloseCircleOutlined, CheckCircleOutlined } from "@ant-design/icons";
import { notification } from "antd";

export const openNotification = (type, message) => {
  notification.open({
    style: {
      top: 60,
    },
    message: type,
    description: message,
    icon:
      type === "Success" ? (
        <CheckCircleOutlined style={{ color: " #00FF00" }} />
      ) : (
        <CloseCircleOutlined style={{ color: "#ff0000" }} />
      )
  });
};
