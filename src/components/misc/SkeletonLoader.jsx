import { Skeleton } from "antd";

export const SkeletonLoader = ({ loading, children }) => {
  return <Skeleton loading={loading}>{children}</Skeleton>;
};

export default SkeletonLoader;
