import { useContext, useState } from "react";
import { NavLink, useRouteLoaderData, Form } from "react-router-dom";
import { UserContext } from "../store/user/user-context";

function Header() {
  const token = useRouteLoaderData("root");
  const userData = useContext(UserContext);
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="bg-gray-800">
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center justify-between">
          {/* Home Link */}
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

          {/* Right Section */}
          {token ? (
            <div className="flex items-center space-x-4">
              <span className="text-sm font-medium text-gray-300">
                {userData.user.email}
              </span>
              
              {/* Profile Dropdown */}
              <div className="relative">
                <button
                  type="button"
                  className="flex items-center space-x-2 rounded-full bg-gray-800 text-sm focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800 focus:outline-none"
                  onClick={() => setMenuOpen(!menuOpen)}
                >
                  <img
                    className="w-8 h-8 rounded-full"
                    src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                    alt="User Avatar"
                  />
                </button>
                
                {/* Dropdown Menu */}
                {menuOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 ring-1 ring-black/5 focus:outline-none z-50">
                    <NavLink
                      to="/profile"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Your Profile
                    </NavLink>
                    <NavLink
                      to="/settings"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Settings
                    </NavLink>
                    <Form method="post" action="/logout">
                      <button
                        type="submit"
                        className="w-full text-left block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        Sign out
                      </button>
                    </Form>
                  </div>
                )}
              </div>
            </div>
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
    </nav>
  );
}

export default Header;