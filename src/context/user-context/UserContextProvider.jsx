/**
 * UserContext.ts
 *
 * @author Erastus Nathingo <contact@erassy.com>
 * @copyright 2023
 * All rights reserved
 */

import React, { createContext, useEffect, useState } from "react";
import { useLocalStorage } from "../../hooks";

const UserContext = createContext({
  user: JSON.parse(window.localStorage.getItem("user")),
  setUser: () => {},
});

const UserContextProvider = ({ children }) => {
  const [user, setUser] = useState();
  const { getItem } = useLocalStorage("user");

  useEffect(() => {
    setUser(getItem()); 
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const contextValue = {
    user: user,
    setUser,
  };

  return (
    <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>
  );
};

export { UserContext, UserContextProvider };
