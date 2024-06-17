import { Children, createContext, useContext, useState } from "react";
const UserContext = createContext(undefined);
export const UserProvider = ({ Children }) => {
  const [showMenu, setShowMEnu] = useState(false);
  return (
    <UserContext.Provider
      value={{ showMenu, setShowMEnu }}
    ></UserContext.Provider>
  );
};
export const useUser = () => useContext(UserContext);
