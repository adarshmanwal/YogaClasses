import React from "react";
import { Outlet, useRouteLoaderData } from "react-router-dom";
import Header from "../components/Header";
import SideNav from "../components/SideNav";
import ShopContextProvider from "../store/shop-context";
import UserContextProvider from "../store/user/user-context";

export default function Root() {
  const token = useRouteLoaderData("root");
  return (
    <UserContextProvider>
      <ShopContextProvider>
        <Header></Header>
        <div className="flex flex-col md:flex-row space-x-1">
          {token && (
            <div className="">
              <SideNav></SideNav>
            </div>
          )}
          <div className="flex-1">
            <main>
              <Outlet></Outlet>
            </main>
          </div>
        </div>
      </ShopContextProvider>
    </UserContextProvider>
  );
}
