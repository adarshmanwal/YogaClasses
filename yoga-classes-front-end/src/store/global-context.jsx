import { createContext, useState } from "react";

export const GlobalContext = createContext({
  activeMenu: true,
  setActiveMenu: () => {},
});

export default function GlobalContextProvider({ children }) {
  const [activeMenu, setActiveMenu] = useState(true);
  const ctx = {
    activeMenu,
    setActiveMenu,
  };
  return (
    <GlobalContext.Provider value={ctx}>{children}</GlobalContext.Provider>
  );
}
