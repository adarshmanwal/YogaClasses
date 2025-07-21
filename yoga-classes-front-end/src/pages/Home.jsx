import React, { useContext, useEffect, useState } from "react";
import thumbnail from "../assets/thumbnail-1.webp";
import { ShopContext } from "../store/shop-context";
import { useNavigate, useRouteLoaderData } from "react-router-dom";
import AddShop from "../components/shop/AddShop";
import { UserContext } from "../store/user/user-context";
import ShopList from "../components/shop/ShopList";
import NavBarSecondary from "../components/UI/NavBarSecondary";

export default function Home() {
  const shopData = useRouteLoaderData("home");
  const navigate = useNavigate();
  const { shops, setShops } = useContext(ShopContext);
  const { user } = useContext(UserContext);
  const [isModalOpen, setIsModalOpen] = useState(false);
  useEffect(() => {
    if (shopData) {
      setShops(shopData);
    }
  }, [shopData, setShops]);

  return (
    <>
      {/* Navbar */}
      <NavBarSecondary user={user}></NavBarSecondary>
      {/* modal add shop */}
      <AddShop
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
      ></AddShop>

      {/* Shop List */}
      <ShopList shops={shops} user= {user}></ShopList>
    </>
  );
}
