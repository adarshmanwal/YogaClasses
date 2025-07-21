import React from "react";
import { useLoaderData } from "react-router-dom";

const User = () => {
  const user = useLoaderData();

  return (
    <div className="max-w-3xl mx-auto mt-10 p-6 bg-white rounded-xl shadow space-y-6">
      {/* Profile Header */}
      <div className="flex items-center space-x-4">
        <img
          className="w-16 h-16 rounded-full border border-gray-300 shadow-sm"
          src={`https://api.dicebear.com/7.x/initials/svg?seed=${user.email}`}
          alt="User Avatar"
        />
        <div>
          <h2 className="text-xl font-semibold text-gray-800">{user.email}</h2>
          <p className="text-sm text-gray-500 font-mono">
            Account ID: {user.accountId}
          </p>
        </div>
      </div>

      {/* User Info */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <p className="text-sm text-gray-500">User Type</p>
          <p className="text-base font-medium text-gray-700">{user.userType}</p>
        </div>
        <div>
          <p className="text-sm text-gray-500">Status</p>
          <span
            className={`inline-block px-2 py-0.5 rounded-full text-sm font-medium ${
              user.status === "active"
                ? "bg-green-100 text-green-700"
                : user.status === "inactive"
                ? "bg-red-100 text-red-700"
                : "bg-yellow-100 text-yellow-800"
            }`}
          >
            {user.status}
          </span>
        </div>
        <div>
          <p className="text-sm text-gray-500">User ID</p>
          <p className="text-base font-mono text-gray-700">{user.id}</p>
        </div>
        <div>
          <p className="text-sm text-gray-500">Created At</p>
          <p className="text-base text-gray-700">
            {new Date(user.createdAt).toLocaleString()}
          </p>
        </div>
      </div>

      {/* Shops Access Section */}
      <div>
        <h3 className="text-lg font-semibold text-gray-800 mb-2">
          Shop Access
        </h3>
        {user.shopsWithAccess?.length > 0 ? (
          <ul className="space-y-3">
            {user.shopsWithAccess.map((shop) => (
              <li
                key={shop.id}
                className="border p-3 rounded-md bg-gray-50 hover:bg-amber-50 transition"
              >
                <p className="font-medium text-gray-900">{shop.name}</p>
                <p className="text-sm text-gray-600">
                  Email: <span className="font-mono">{shop.email}</span>
                </p>
                <p className="text-sm text-gray-500">
                  Location: {shop.location}
                </p>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-sm text-gray-500">No shop access assigned.</p>
        )}
      </div>
    </div>
  );
};

export default User;
