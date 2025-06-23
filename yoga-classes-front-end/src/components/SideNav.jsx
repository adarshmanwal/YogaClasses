import { Link, NavLink } from "react-router-dom";
import { useContext } from "react";
import { MdOutlineCancel } from "react-icons/md";
import { SiShopware } from "react-icons/si";
import { CiShop } from "react-icons/ci";
import { FaUserFriends } from "react-icons/fa";
import { GlobalContext } from "../store/global-context";
const links = [
  {
    title: "Dashboard",
    links: [
      {
        name: "Shop",
        icon: <CiShop />,
      },
    ],
  },
  {
    title: "Users",
    links: [
      {
        name: "usersList",
        icon: <FaUserFriends />,
      },
    ],
  },
];
export default function SideNav() {
  const { activeMenu, setActiveMenu } = useContext(GlobalContext);
  const handleCloseSideBar = () => {
    if (activeMenu !== undefined && screenSize <= 900) {
      setActiveMenu(false);
    }
  };
  const activeLink =
    "flex items-center gap-5 pl-4 pt-3 pb-2.5 rounded-lg  text-white  text-md m-2";
  const normalLink =
    "flex items-center gap-5 pl-4 pt-3 pb-2.5 rounded-lg text-md text-gray-700 dark:text-gray-200 dark:hover:text-black hover:bg-light-gray m-2";
  return (
    <div className="h-screen text-white md:overflow-hidden overflow-auto md:hover:overflow-auto pb-10 bg-gray-800">
      {activeMenu && (
        <>
          <div className="flex justify-between items-center">
            <Link
              to="/"
              onClick={handleCloseSideBar}
              className="items-center gap-3 ml-3 mt-4 flex text-xl font-extrabold tracking-tight dark:text-white "
            >
              <SiShopware /> <span>Adiyog</span>
            </Link>
            <button
              type="button"
              onClick={() => setActiveMenu(!activeMenu)}
              className="text-xl rounded-full p-3 hover:bg-light-gray mt-4 block "
            >
              <MdOutlineCancel />
            </button>
          </div>
          <div className="mt-10 ">
            {links.map((item) => (
              <div key={item.title}>
                <p className="text-white m-3 mt-4 uppercase">{item.title}</p>
                {item.links.map((link) => (
                  <NavLink
                    to={`/${link.name}`}
                    key={link.name}
                    onClick={handleCloseSideBar}
                    className={({ isActive }) =>
                      isActive ? activeLink : normalLink
                    }
                  >
                    {link.icon}
                    <span className="capitalize ">{link.name}</span>
                  </NavLink>
                ))}
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

{
  /* <div className="h-screen w-64 bg-gray-800 text-white">
      <ul>
        <li className="p-4 hover:bg-gray-700 cursor-pointer">Shop</li>
        <li className="p-4 hover:bg-gray-700 cursor-pointer">About</li>
        <li className="p-4 hover:bg-gray-700 cursor-pointer">Services</li>
        <Link to="/usersList">
          <li className="p-4 hover:bg-gray-700 cursor-pointer">Users</li>
        </Link>
      </ul>
    </div> */
}
