import React, { useContext, useEffect, useState } from "react";
import logoimge from "../assets/channel-2.jpg";
import thumbnail from "../assets/thumbnail-1.webp";
import { ShopContext } from "../store/shop-context";
import { useRouteLoaderData } from "react-router-dom";
import Modal from "../components/UI/Modal"; // Import the Modal component

export default function Home() {
  const shopData = useRouteLoaderData("home");
  const { shops, setShops } = useContext(ShopContext);
  const [isModalOpen, setIsModalOpen] = useState(false); // State for modal
  console.log("isModalOpen =>",isModalOpen)
  useEffect(() => {
    if (shopData) {
      setShops(shopData);
    }
  }, [shopData, setShops]);

  return (
    <>
      {/* Navbar */}
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
        <div className="w-[180px] flex items-center justify-between shrink-0 mr-5">
          <button
            className="px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition"
            onClick={() => setIsModalOpen(true)} // Open Modal on Click
          >
            Add Shop
          </button>
        </div>
      </div>

      {/* Shop List */}
      <div className="flex flex-wrap gap-4 p-4">
        {shops.length > 0 ? (
          shops.map((shop) => (
            <div
              key={shop.id}
              className="w-full md:w-1/3 p-2 border rounded-lg shadow-md"
            >
              <div className="relative mb-2">
                {/* Using your existing thumbnail image */}
                <img
                  className="w-full h-40 object-cover rounded-t-lg"
                  src={thumbnail}
                  alt={shop.name}
                />
              </div>
              <div className="p-2">
                <h2 className="text-lg font-bold">{shop.name}</h2>
                <p className="text-sm text-gray-600">{shop.description}</p>
                <p className="text-xs text-gray-500 mt-1">
                  📍 {shop.location} | 📞 {shop.phoneNumber}
                </p>
                <p className="text-xs text-gray-500">
                  ⏰ {shop.openingHours} - {shop.closingHours}
                </p>
                <div className="flex gap-2 mt-2">
                  {/* Using your existing logo image */}
                  <img
                    className="w-9 h-9 rounded-full"
                    src={logoimge}
                    alt="Shop Logo"
                  />
                  <p className="text-xs text-gray-600">{shop.email}</p>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500 w-full">
            No shops available.
          </p>
        )}
      </div>

      {/* Modal */}
      <Modal open={isModalOpen}>
        <div className="p-4 bg-white rounded-md shadow-lg">
          <h2 className="text-lg font-bold mb-4">Add New Shop</h2>
          <input
            type="text"
            placeholder="Shop Name"
            className="border p-2 w-full mb-2"
          />
          <input
            type="text"
            placeholder="Description"
            className="border p-2 w-full mb-2"
          />
          <button
            className="px-4 py-2 bg-green-500 text-white font-semibold rounded-lg hover:bg-green-600 transition"
            onClick={() => setIsModalOpen(false)} // Close modal on click
          >
            Close
          </button>
        </div>
      </Modal>
    </>
  );
}
