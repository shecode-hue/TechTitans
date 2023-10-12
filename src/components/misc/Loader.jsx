import React from "react";
import { Progress } from 'antd';

export const Loader = ({percent}) => {
    const [increase, setIncrease] = React.useState(0);
    setTimeout(() => {
        setIncrease(10);
    }, 500);
  return (
    <div className="u-center h-screen">
      <Progress type="circle" percent={percent + increase} style={{ marginRight: 8 }} />
    </div>
  );
};

export default Loader;
