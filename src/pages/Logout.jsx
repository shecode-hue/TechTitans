import React, { useEffect, useContext } from "react";
import { UserContext } from "../context";
import { useNavigate } from "react-router-dom";
import { useLocalStorage } from "../hooks";

export const Logout = () => {
  const { setUser } = useContext(UserContext);
  const navigate = useNavigate();
  const { removeItem } = useLocalStorage("user");

  useEffect(() => {
    setUser(undefined);
    removeItem();
    navigate("/");
    return () => {
      setUser(undefined);
      removeItem();
      navigate("/");
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <div>Logging out...</div>;
};
