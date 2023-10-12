import { Spin } from "antd";

export const LoadingPage = ({ message, height = "100vh" }) => (
  <div
    className="container"
    style={{
      height: height,
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    }}
  >
    <Spin tip={`${message}`}></Spin>
  </div>
);

export default LoadingPage;
