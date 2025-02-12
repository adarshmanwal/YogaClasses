import { useContext } from "react";
import { NavLink, useRouteLoaderData, Form } from "react-router-dom";
import { UserContext } from "../store/user/user-context";

function Header() {
  const token = useRouteLoaderData("root");
  const userData = useContext(UserContext);
  console.log(userData.user.email);

  return (
    <nav className="bg-gray-800">
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center justify-around">
          <div>
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive
                  ? "rounded-md px-3 py-2 text-sm font-medium bg-gray-700 text-white"
                  : "rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
              }
              aria-current="page"
            >
              Home
            </NavLink>
          </div>
          <div>
            {token ? (
              <Form method="post" action="/logout">
                <button
                  type="submit"
                  className="rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
                >
                  Logout
                </button>
                <span className="ml-4 text-sm font-medium text-gray-300">
                  {userData.user.email}
                </span>
              </Form>
            ) : (
              <NavLink
                to="auth?mode=login"
                className={({ isActive }) =>
                  isActive
                    ? "rounded-md px-3 py-2 text-sm font-medium bg-gray-700 text-white"
                    : "rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
                }
              >
                Authenticate
              </NavLink>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Header;
