import { NavLink, useRouteLoaderData } from "react-router-dom";

function Header() {
  const token = useRouteLoaderData("root");

  return (
    <nav className="bg-gray-800">
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center justify-between">
          <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
            <div className="hidden sm:ml-6 sm:block">
              <div className="flex space-x-4">
                <NavLink
                to="/"
                  className="rounded-md bg-gray-900 px-3 py-2 text-sm font-medium text-white"
                  aria-current="page"
                >
                  Home
                </NavLink>
                <NavLink
                    to="auth?mode=login"
                  className="rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
                >
                  Authenticate
                </NavLink>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Header;
