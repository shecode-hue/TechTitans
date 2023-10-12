import { Skeleton } from "antd";

export const SkeletonLoader = ({ loading, children }) => {
  return (
    <Skeleton style={{ minHeight: "55vh" }} loading={loading}>
      {children}
    </Skeleton>
  );
};

export default SkeletonLoader;
