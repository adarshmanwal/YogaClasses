import { useLoaderData, useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import httpClient from "../../utils/httpClient";
import Modal from "../../components/UI/Modal";
import { ShopContext } from "../../store/shop-context";

export default function ShopDetails() {
  const navigate = useNavigate();
  const shopCtx = useContext(ShopContext);
  const [editShop, setEditShop] = useState(false);
  const [shopData, setShopData] = useState(useLoaderData());

  useEffect(() => {
    const updatedShop = shopCtx.shops.find((s) => s.id === shopData.id);
    if (updatedShop) {
      setShopData(updatedShop);
    }
  }, [shopCtx.shops, shopData.id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setShopData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setShopData((prev) => ({ ...prev, image: e.target.files[0] }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const shop = new FormData();
    Object.keys(shopData).forEach((key) => {
      if (key === "image" && shopData.image) {
        shop.append("image", shopData.image);
      } else {
        shop.append(key, shopData[key]);
      }
    });

    try {
      const response = await httpClient.put(
        `/shops/update/${shopData.id}`,
        shopData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      if (response.status === 201) {
        shopCtx.addShop(response.data.data);
      }
      alert("Shop Updated successfully!");
      setEditShop(false);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleDelete = async () => {
    try {
      const response = await httpClient.delete(`/shops/delete/${shopData.id}`);
      if (response.status === 200) {
        console.log("Shop deleted successfully");
        navigate("/");
      }
    } catch (error) {
      console.error("Failed to delete shop", error);
    }
  };

  return (
    <>
      {editShop && (
        <Modal open={editShop} onClose={() => setEditShop(false)}>
          <form
            onSubmit={handleSubmit}
            className="p-4 bg-white rounded-md shadow-lg"
          >
            <h2 className="text-lg font-bold mb-4">Edit Shop</h2>
            {[
              { name: "name", type: "text", placeholder: "Shop Name" },
              {
                name: "description",
                type: "textarea",
                placeholder: "Description",
              },
              { name: "location", type: "text", placeholder: "Location" },
              {
                name: "phoneNumber",
                type: "text",
                placeholder: "Phone Number",
              },
              { name: "email", type: "email", placeholder: "Email" },
              {
                name: "openingHours",
                type: "text",
                placeholder: "Opening Hours",
              },
              {
                name: "closingHours",
                type: "text",
                placeholder: "Closing Hours",
              },
              { name: "daysOpen", type: "text", placeholder: "Days Open" },
            ].map(({ name, type, placeholder }) => (
              <input
                key={name}
                type={type}
                name={name}
                placeholder={placeholder}
                value={shopData[name] || ""}
                onChange={handleChange}
                className="border p-2 w-full mb-2"
              />
            ))}
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="border p-2 w-full mb-4"
            />
            <div className="flex justify-end gap-2">
              <button
                type="button"
                className="bg-gray-200 px-4 py-2 rounded-md"
                onClick={() => setEditShop(false)}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
              >
                Save Changes
              </button>
            </div>
          </form>
        </Modal>
      )}

      <div className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-8">
        <img
          src={shopData.image || "https://via.placeholder.com/600x300"}
          alt={shopData.name}
          className="w-full h-64 object-cover rounded-lg"
        />
        <div className="mt-4">
          <h1 className="text-2xl font-bold">{shopData.name}</h1>
          <p className="text-gray-600">{shopData.description}</p>
        </div>
        <div className="mt-4 flex justify-end space-x-4">
          <button
            onClick={() => setEditShop(true)}
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
            <strong>📍 Location:</strong> {shopData.location}
          </p>
          <p>
            <strong>📞 Contact:</strong> {shopData.phoneNumber} |{" "}
            {shopData.email}
          </p>
          <p>
            <strong>⏰ Open Hours:</strong> {shopData.openingHours} -{" "}
            {shopData.closingHours}
          </p>
        </div>
      </div>
    </>
  );
}
