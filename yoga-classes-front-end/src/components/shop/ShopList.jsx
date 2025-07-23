import React from "react";
import logoimge from "../../assets/channel-2.jpg"; // Assuming this is the correct path for the logo image
import { UserRole } from "../../constants/roles";
import { socket } from "../../socket";
const ShopList = ({ shops, user }) => {
  const handleJoinShop = (e, shopId) => {
    try {
      e.stopPropagation();
      console.log("Joining shop with ID:", shopId);
      // Emit a socket event to join the shop
      socket.emit("joinShop", 'hello');
    } catch (error) {
      console.error("Error joining shop:", error);
    }
  };
  return (
    <div className="flex flex-wrap gap-4 p-4">
      {shops.length > 0 ? (
        shops.map((shop) => (
          <div
            key={shop.id}
            onClick={() => navigate(`/shops/${shop.id}`)}
            className="w-full md:w-1/3 p-2 border rounded-lg shadow-md bg-gray-50 cursor-pointer hover:shadow-lg transition"
          >
            <div className="relative mb-2">
              <img
                className="w-full h-40 object-cover rounded-t-lg"
                src={shop.image || thumbnail}
                alt={shop.name}
              />
            </div>
            <div className="p-2 flex flex-col gap-2">
              <div>
                <h2 className="text-lg font-bold">{shop.name}</h2>
                <p className="text-sm text-gray-600">{shop.description}</p>
                <p className="text-xs text-gray-500 mt-1">
                  📍 {shop.location} | 📞 {shop.phoneNumber}
                </p>
                <p className="text-xs text-gray-500">
                  ⏰ {shop.openingHours} - {shop.closingHours}
                </p>
              </div>

              <div className="flex items-center justify-between mt-2">
                <div className="flex items-center gap-2">
                  <img
                    className="w-9 h-9 rounded-full"
                    src={logoimge}
                    alt="Shop Logo"
                  />
                  <p className="text-xs text-gray-600">{shop.email}</p>
                </div>
                {user.userType === UserRole.CUSTOMER && (
                  <button
                    className="bg-blue-600 text-white text-sm font-medium px-4 py-2 rounded-lg hover:bg-blue-700 active:bg-blue-800 transition-all duration-200"
                    onClick={(e) => handleJoinShop(e, shop.id)}
                  >
                    Join Shop
                  </button>
                )}
              </div>
            </div>
          </div>
        ))
      ) : (
        <p className="text-center text-gray-500 w-full">No shops available.</p>
      )}
    </div>
  );
};

export default ShopList;
