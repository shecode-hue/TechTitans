import React from "react";
import { Button, Result } from "antd";
import { useNavigate } from "react-router-dom";
import { routesDictionary } from "../../configs/routes-dictionary";

const { home } = routesDictionary;

export const NoDATA = ({ subTitle, title = "500" }) => {
  const navigate = useNavigate();

  return (
    <div className="container">
      <div
        className="frame bg-white"
        style={{
          width: "60vh",
        }}
      >
        <Result
          status="500"
          title={title}
          subTitle={
            subTitle || "Sorry, something went wrong. Contact Adminitstrator"
          }
          extra={
            <Button
              style={{ color: "white", background: "grey" }}
              onClick={() => navigate(home)}
            >
              Back To Home
            </Button>
          }
        />
      </div>
    </div>
  );
};
export default NoDATA;
