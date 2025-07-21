import React from "react";
import { UserRole } from "../../constants/roles";

const NavBarSecondary = ({user}) => {
  return (
    <div className="h-[55px] border-b border-gray-200 flex justify-between items-center px-4">
      <div className="flex items-center"></div>
      <div className="flex flex-1 max-w-[500px] mx-16 items-center">
        <input
          className="flex-1 h-9 px-2 text-base border border-gray-400 rounded-sm shadow-inner outline-none"
          type="text"
          placeholder="Search Shop"
        />
        <button className="h-10 w-[66px] bg-gray-200 border border-gray-400 flex items-center justify-center ml-[-1px] mr-2 relative">
          Search
        </button>
      </div>
      {user.userType === UserRole.SHOP_ADMIN && (
        <div className="w-[180px] flex items-center justify-between shrink-0 mr-5">
          <button
            className="px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition"
            onClick={() => setIsModalOpen(true)} // Open Modal on Click
          >
            Add Shop
          </button>
        </div>
      )}
    </div>
  );
};

export default NavBarSecondary;
