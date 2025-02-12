import React, { useEffect } from "react";
import {
  Outlet,
  useNavigate,
  useRouteLoaderData,
  useSubmit,
} from "react-router-dom";
import Header from "../components/Header";
import SideNav from "../components/SideNav";
import ShopContextProvider from "../store/shop-context";
import UserContextProvider from "../store/user/user-context";

export default function Root() {
  const token = useRouteLoaderData("root");
  const navigate = useNavigate();
  const submit = useSubmit(); // Used to trigger actions programmatically

  useEffect(() => {
    if (!token) return;
    const logoutTimer = setTimeout(() => {
      submit(null, { method: "POST", action: "/logout" });
    }, 1 * 60 * 60 * 1000); // 30 minutes

    return () => clearTimeout(logoutTimer);
  }, [token, submit]);

  return (
    <UserContextProvider>
      <ShopContextProvider>
        <Header />
        <div className="flex flex-col md:flex-row space-x-1">
          {token && (
            <div>
              <SideNav />
            </div>
          )}
          <div className="flex-1">
            <main>
              <Outlet />
            </main>
          </div>
        </div>
      </ShopContextProvider>
    </UserContextProvider>
  );
}
