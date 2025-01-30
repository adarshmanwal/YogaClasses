import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import SideNav from "../components/SideNav";

export default function Root() {
  return (
    <>
      <Header></Header>
      <div className="flex flex-col md:flex-row space-x-1">
        <div className="">
          <SideNav></SideNav>
        </div>
        <div className="flex-1">
          <main>
            <Outlet></Outlet>
          </main>
        </div>
      </div>
    </>
  );
}
