import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Root from "./pages/Root";
import Home from "./pages/Home";
import Authentication, { action as authAction } from "./pages/Authenticate";
import Error from "./pages/Error";
import { checkAuthLoader, tokenLoader } from "./utils/auth";
import { action as logoutAction} from "./pages/Logout";
function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Root />,
      errorElement: <Error></Error>,
      loader: tokenLoader,
      id: "root",
      children: [
        { index: true, element: <Home />,loader: checkAuthLoader },
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
  return <RouterProvider router={router}></RouterProvider>;
}

export default App;
