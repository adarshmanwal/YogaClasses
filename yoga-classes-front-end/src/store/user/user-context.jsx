import { createContext, useEffect, useState } from "react";

const initialUserData = JSON.parse(localStorage.getItem("userData")) || null;

export const UserContext = createContext({
  user: initialUserData,
  setUserData: () => {},
});

let globalSetUserData = () => {};

export default function UserContextProvider({ children }) {
  const [user, setUser] = useState(initialUserData);
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("userData"));
    if (storedUser) {
      setUser(storedUser);
    }
  }, []);

  globalSetUserData = setUserData;

  function setUserData(data) {
    setUser(data);
    localStorage.setItem("userData", JSON.stringify(data)); // Sync localStorage
  }

  return (
    <UserContext.Provider value={{ user, setUserData }}>
      {children}
    </UserContext.Provider>
  );
}

export function updateUserDataOutsideReact(data) {
  globalSetUserData(data);
}
