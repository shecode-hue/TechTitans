import React, { useEffect, useContext } from "react";
import { UserContext } from "../context/User.context";
import { useNavigate } from "react-router-dom";

export const Logout = () => {
  const { setUser } = useContext(UserContext);
  const navigate = useNavigate();
  useEffect(() => {
    setUser(undefined);
    localStorage.removeItem("user");
    navigate("/");
    return () => {
      setUser(undefined);
      localStorage.removeItem("user");
      navigate("/");
    };
  }, [navigate, setUser]);

  return <div>Logging out...</div>;
};
