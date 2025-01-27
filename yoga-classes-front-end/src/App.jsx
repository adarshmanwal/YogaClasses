import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Root from "./pages/Root";
import Home from "./pages/Home";
import Authentication from "./pages/Authenticate";
function App() {

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Root/>,
      id: 'root',
      children: [
        {index: true, element: <Home/>},
        {
          path: "auth",
          element: <Authentication></Authentication>
        }
      ]
    },
  ])
  return (
    <RouterProvider router={router}>
    </RouterProvider>
  );
}

export default App;
