import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import { useContext } from "react";
import Root from "./pages/Root";
import Home from "./pages/Home";
import Authentication, { action as authAction } from "./pages/Authenticate";
import Error from "./pages/Error";
import { tokenLoader } from "./utils/auth";
import { action as logoutAction } from "./pages/Logout";

// loaders
import { HomePageLoaders } from "./loaders/homePageLoader";
import { UserContext } from "./store/user/user-context";
import ShopDetails from "./pages/shop/ShopDetails";
import { shopDetailsLoader } from "./loaders/shopLoader";
import { loader as ProfileLoader } from "./loaders/user/profileLoader";
import { loader as userLoader } from "./loaders/user/UserLoader";

// pages
import Profile from "./pages/user/Profile";
import Login from "./pages/user/auth/Login";
import SignUp from "./pages/user/auth/SignUp";
import InviteSignup from "./pages/user/auth/InviteSignup";
import EmployeesList from "./pages/user/employees/EmployeesList";
import User from "./pages/user/employees/User";

function App() {
  const { setUserData } = useContext(UserContext);

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Root />,
      errorElement: <Error></Error>,
      loader: tokenLoader,
      id: "root",
      children: [
        { path: "shop", element: <Home />, loader: HomePageLoaders, id: "home" },
        {
          path: "/",
          element: <Navigate to="/shop" replace />,
        },
        {
          path: "shops/:id",
          element: <ShopDetails />,
          loader: shopDetailsLoader,
          id: "shop-details",
        },
        {
          path: "profile",
          element: <Profile />,
          loader: ProfileLoader,
          id: "profile",
        },
        {
          path: "auth",
          element: <Authentication />,
          action: (args) => authAction({ ...args, context: { setUserData } }),
          children: [
            { index: true, element: <Navigate to="login" replace /> },
            {
              path: "login",
              element: <Login />,
              action: (args) =>
                authAction({ ...args, context: { setUserData } }),
            },
            {
              path: "signup",
              element: <SignUp />,
              action: (args) =>
                authAction({ ...args, context: { setUserData } }),
            },
            {
              path: "accept-invite",
              element: <InviteSignup></InviteSignup>,
            },
          ],
        },
        {
          path: "/logout",
          action: logoutAction,
        },
        {
          path: "usersList",
          element: <EmployeesList />,
          // loader: shopDetailsLoader,
          id: "user-list",
        },
        {
          path: "user/:id",
          element: <User />,
          loader: userLoader,
          id: "userDetails",
        },
      ],
    },
  ]);

  return (
    <>
      <RouterProvider router={router}></RouterProvider>
    </>
  );
}

export default App;
