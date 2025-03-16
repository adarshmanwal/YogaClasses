import React from 'react';
import { useRouteLoaderData } from 'react-router-dom';

export default function Profile() {
  const data = useRouteLoaderData('profile');

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <div className="flex items-center space-x-6">
        <img src={data?.avatar || "https://via.placeholder.com/100"} alt="User Avatar" className="w-24 h-24 rounded-full shadow-md" />
        <div>
          <h2 className="text-2xl font-semibold text-gray-800">{data?.name || "adarsh manwal"}</h2>
          <p className="text-gray-600">{data?.email || "johndoe@example.com"}</p>
          <p className="text-gray-500">Joined on: {data?.joinedDate || "January 1, 2024"}</p>
        </div>
      </div>
      <div className="mt-6 border-t pt-4">
        <h3 className="text-lg font-medium text-gray-700">About Me</h3>
        <p className="text-gray-600 mt-2">{data?.bio || "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus at sapien vitae justo interdum dapibus."}</p>
      </div>
      <div className="mt-6">
        <button className="bg-blue-600 text-white px-4 py-2 rounded-md shadow-md hover:bg-blue-700">Edit Profile</button>
      </div>
    </div>
  );
}
