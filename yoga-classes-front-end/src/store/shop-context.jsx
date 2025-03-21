import { createContext, useState } from "react";

export const ShopContext = createContext({
  shops: [],
  addShop: () => {},
  updateShop: () => {},
});

export default function ShopContextProvider({ children }) {
  const [shops, setShops] = useState([]);

  //add shop from frontend
  //edit shop from frontend
  //delete shop from frontend
  function addShop(shop) {
    setShops((prevShops) => {
      return [shop, ...prevShops];
    });
  }

  function updateShop(shop) {
    setShops((prevShops) => {
      const shopIndex = prevShops.findIndex((s) => s.id === shop.id);
      prevShops[shopIndex] = shop;
      return prevShops;
    });
  }

  const ctx = {
    shops: shops,
    setShops: setShops,
    addShop: addShop,
    updateShop: updateShop,
  };
  return <ShopContext.Provider value={ctx}>{children}</ShopContext.Provider>;
}
