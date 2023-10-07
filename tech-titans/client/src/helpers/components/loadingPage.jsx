import { Spin } from "antd";

const LoadingPage = ({message}) => (
  <div
    className="container"
    style={{
      height: "100vh",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    }}
  >
    <Spin tip={`${message}`}>
      
    </Spin>
  </div>
);

export default LoadingPage;
