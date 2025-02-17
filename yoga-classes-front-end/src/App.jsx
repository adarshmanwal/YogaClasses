import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { useContext } from "react";
import Root from "./pages/Root";
import Home from "./pages/Home";
import Authentication, { action as authAction } from "./pages/Authenticate";
import Error from "./pages/Error";
import { tokenLoader } from "./utils/auth";
import { action as logoutAction } from "./pages/Logout";
import { HomePageLoaders } from "./loaders/homePageLoader";
import { UserContext } from "./store/user/user-context";
import ShopDetails from "./pages/shop/ShopDetails";
import { shopDetailsLoader } from "./loaders/shopLoader";

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
        { index: true, element: <Home />, loader: HomePageLoaders, id: "home" },
        { path: "shops/:id", element: <ShopDetails />,loader: shopDetailsLoader,id: "shop-details" },
        { 
          path: "auth",
          element: <Authentication />,
          action: (args) => authAction({ ...args, context: { setUserData } }),
        },
        {
          path: "/logout",
          action: logoutAction,
        },
      ],
    },
  ]);

  return <RouterProvider router={router}></RouterProvider>;
}

export default App;
