import { useNavigate } from "react-router-dom";
import { useLocalStorage } from "./useLocalStorage";
import { useContext } from "react";
import { UserContext } from "../context";
import { routesDictionary } from "../configs";

const { home } = routesDictionary;

export const useLogout = () => {
  const { removeItem } = useLocalStorage("user");
  const { setUser } = useContext(UserContext);
  const navigate = useNavigate();
  const logout = () => {
    removeItem();
    setUser(null);
    navigate(home);
  };
  return { logout };
};
