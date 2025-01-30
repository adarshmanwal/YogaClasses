import React from "react";

export default function SideNav() {
  return (
    <div className="h-screen w-64 bg-gray-800 text-white">
      <ul>
        <li className="p-4 hover:bg-gray-700 cursor-pointer">Shop</li>
        <li className="p-4 hover:bg-gray-700 cursor-pointer">About</li>
        <li className="p-4 hover:bg-gray-700 cursor-pointer">Services</li>
        <li className="p-4 hover:bg-gray-700 cursor-pointer">Contact</li>
      </ul>
    </div>
  );
}
