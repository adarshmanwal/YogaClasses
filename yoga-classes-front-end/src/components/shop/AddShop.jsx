import React, { useContext, useState } from "react";
import Modal from "../UI/Modal";
import httpClient from "../../utils/httpClient";
import { ShopContext } from "../../store/shop-context";

export default function AddShop({ isModalOpen, setIsModalOpen }) {
  const shopCtx = useContext(ShopContext);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    location: "",
    phoneNumber: "",
    email: "",
    openingHours: "",
    closingHours: "",
    daysOpen: "",
    image: null,
  });

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  function convertToBase64(file) {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = () => {
        resolve(fileReader.result);
      };
      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  }

  // Handle file input change
  const handleFileChange = async (e) => {
    const image = e.target.files[0];
    debugger;
    // const base64Image = await convertToBase64(image);

    setFormData((prev) => ({ ...prev, image: image }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const shopData = new FormData();
    Object.keys(formData).forEach((key) => {
      if (key === "image" && formData.image) {
        shopData.append("image", formData.image);
      } else {
        shopData.append(key, formData[key]);
      }
    });

    debugger;

    try {
      const response = await httpClient.post("/shops/create", shopData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      if (response.status === 201) {
        shopCtx.addShop(response.data.data);
      }
      alert("Shop added successfully!");
      setIsModalOpen(false);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <Modal open={isModalOpen} onClose={() => setIsModalOpen(false)}>
      <form
        onSubmit={handleSubmit}
        className="p-4 bg-white rounded-md shadow-lg"
      >
        <h2 className="text-lg font-bold mb-4">Add New Shop</h2>
        <input
          type="text"
          name="name"
          placeholder="Shop Name"
          value={formData.name}
          onChange={handleChange}
          className="border p-2 w-full mb-2"
          required
        />

        <textarea
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
          className="border p-2 w-full mb-2"
        />

        <input
          type="text"
          name="location"
          placeholder="Location"
          value={formData.location}
          onChange={handleChange}
          className="border p-2 w-full mb-2"
          required
        />

        <input
          type="text"
          name="phoneNumber"
          placeholder="Phone Number"
          value={formData.phoneNumber}
          onChange={handleChange}
          className="border p-2 w-full mb-2"
          required
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          className="border p-2 w-full mb-2"
          required
        />

        <input
          type="text"
          name="openingHours"
          placeholder="Opening Hours (e.g., 9:00 AM)"
          value={formData.openingHours}
          onChange={handleChange}
          className="border p-2 w-full mb-2"
        />

        <input
          type="text"
          name="closingHours"
          placeholder="Closing Hours (e.g., 10:00 PM)"
          value={formData.closingHours}
          onChange={handleChange}
          className="border p-2 w-full mb-2"
        />

        <input
          type="text"
          name="daysOpen"
          placeholder="Days Open (e.g., Mon-Fri)"
          value={formData.daysOpen}
          onChange={handleChange}
          className="border p-2 w-full mb-2"
        />

        <input
          type="file"
          name="image"
          accept=".jpeg, .png, .jpg*"
          onChange={(e) => handleFileChange(e)}
          className="border p-2 w-full mb-4"
        />

        <div className="flex justify-end gap-2">
          <button
            type="button"
            className="bg-gray-200 text-gray-700 px-4 py-2 rounded-md"
            onClick={() => setIsModalOpen(false)}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
          >
            Add Shop
          </button>
        </div>
      </form>
    </Modal>
  );
}
