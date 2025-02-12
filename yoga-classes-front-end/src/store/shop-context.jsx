import { createContext, useState } from "react";

export const ShopContext = createContext({
  shops: [],
  addShop: () => {},
});

export default function ShopContextProvider({ children }) {
  const [shops, setShops] = useState([]);

  //add shop from frontend
  //edit shop from frontend
  //delete shop from frontend
  function addShop(shop) {
    setShops((prevShops) => {
      return { items: [...prevShops.items, shop] };
    });
  }

  const ctx = {
    shops: shops,
    setShops: setShops,
    addShop: addShop,
  };
  return <ShopContext.Provider value={ctx}>{children}</ShopContext.Provider>;
}
