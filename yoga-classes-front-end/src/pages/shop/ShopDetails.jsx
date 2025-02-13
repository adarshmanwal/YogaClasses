import { useLoaderData, useNavigate } from "react-router-dom";
import httpClient from "../../utils/httpClient";

export default function ShopDetails() {
  const shop = useLoaderData();
  const navigate = useNavigate()

  const handleEdit = () => {
    console.log("Edit shop:", shop.id);
  };

  const handleDelete = async () => {
    const response = await httpClient.delete(`/shops/delete/${shop.id}`);
    debugger
    if (response.status === 200) {
      console.log("Shop deleted successfully");
    } else {
      console.log("Failed to delete shop");
    }
    navigate("/");
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-8">
      <img
        src={shop.image || "https://via.placeholder.com/600x300"}
        alt={shop.name}
        className="w-full h-64 object-cover rounded-lg"
      />
      <div className="mt-4">
        <h1 className="text-2xl font-bold">{shop.name}</h1>
        <p className="text-gray-600">{shop.description}</p>
      </div>
      <div className="mt-4 flex justify-end space-x-4">
        <button
          onClick={handleEdit}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
        >
          Edit
        </button>
        <button
          onClick={handleDelete}
          className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
        >
          Delete
        </button>
      </div>
      <div className="mt-4 border-t pt-4 text-gray-700">
        <p>
          <strong>📍 Location:</strong> {shop.location}
        </p>
        <p>
          <strong>📞 Contact:</strong> {shop.phoneNumber} | {shop.email}
        </p>
        <p>
          <strong>⏰ Open Hours:</strong> {shop.openingHours} -{" "}
          {shop.closingHours}
        </p>
      </div>
    </div>
  );
}
