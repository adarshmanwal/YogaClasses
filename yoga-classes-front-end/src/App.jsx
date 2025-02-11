import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Root from "./pages/Root";
import Home from "./pages/Home";
import Authentication, { action as authAction } from "./pages/Authenticate";
import Error from "./pages/Error";
import { tokenLoader } from "./utils/auth";
import { action as logoutAction } from "./pages/Logout";

import { HomePageLoaders } from "./loaders/homePageLoader";
const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <Error></Error>,
    loader: tokenLoader,
    id: "root",
    children: [
      { index: true, element: <Home />, loader: HomePageLoaders,id: "home" },
      {
        path: "auth",
        element: <Authentication></Authentication>,
        action: authAction,
      },
      {
        path: "/logout",
        action: logoutAction,
      },
    ],
  },
]);
function App() {
  return <RouterProvider router={router}></RouterProvider>;
}

export default App;
