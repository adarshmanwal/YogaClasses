import { useLoaderData, useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import httpClient from "../../utils/httpClient";
import Modal from "../../components/UI/Modal";
import { ShopContext } from "../../store/shop-context";
import EmployeesList from "../user/employees/EmployeesList";
import Forms from "../../components/UI/Forms";
import { UserContext } from "../../store/user/user-context";

export default function ShopDetails() {
  const navigate = useNavigate();
  const shopCtx = useContext(ShopContext);
  const userCtx = useContext(UserContext);
  const [editShop, setEditShop] = useState(false);
  const [addWorkerModel, setAddWorkerModel] = useState(false);
  const [shopData, setShopData] = useState(useLoaderData());

  useEffect(() => {
    const updatedShop = shopCtx.shops.find((s) => s.id === shopData.shop.id);
    if (updatedShop) {
      setShopData(updatedShop);
    }
  }, [shopCtx.shops, shopData.shop]);

  const handleChange = (stateFunction) => (e) => {
    const { name, value } = e.target;
    stateFunction((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setShopData((prev) => ({ ...prev, image: e.target.files[0] }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const shop = new FormData();
    Object.keys(shopData.shop).forEach((key) => {
      if (key === "image" && shopData.shop.image) {
        shop.append("image", shopData.shop.image);
      } else {
        shop.append(key, shopData[key]);
      }
    });

    try {
      const response = await httpClient.put(
        `/shops/update/${shopData.shop.id}`,
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

  const handleAddWorker = async (e) => {
    e.preventDefault();
    try {
      const workerForm = new FormData(e.target);
      const worker = {
        name: workerForm.get("employeeName"),
        email: workerForm.get("employeeEmail"),
        accountId: userCtx.user.accountId,
      };

      const response = await httpClient.post(
        `/users/invite/${shopData.shop.id}`,
        worker
      );
      if (response.status === 200 || response.statusText === "OK") {
        alert("Worker added successfully");
        setEmployeesData((prev) => [...prev, worker]);
        setAddWorkerModel(false);
      }
    } catch (error) {
      console.error("Error adding worker:", error);
      alert("Failed to add worker. Please try again.");
    }
  };

  const handleDelete = async () => {
    try {
      const response = await httpClient.delete(`/shops/delete/${shopData.shop.id}`);
      if (response.status === 200) {
        navigate("/");
      }
    } catch (error) {
      console.error("Failed to delete shop", error);
    }
  };

  return (
    <>
      {/* edit shop model */}
      {editShop && (
        <Modal open={editShop} onClose={() => setEditShop(false)}>
          <Forms
            title="Edit Shop"
            fields={[
              { name: "name", type: "text", placeholder: "Shop Name" },
              { name: "description", type: "text", placeholder: "Description" },
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
            ]}
            initialValues={shopData.shop}
            onChange={handleChange(setShopData)}
            onSubmit={handleSubmit}
          >
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="border p-2 w-full mb-4"
            />
            {/* <div className="flex justify-end gap-2">
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
            </div> */}
          </Forms>
        </Modal>
      )}

      {/* add Workers model */}
      {addWorkerModel && (
        <Modal open={addWorkerModel} onClose={() => setAddWorkerModel(false)}>
          <Forms
            onClose={() => setAddWorkerModel(false)}
            title="Add Employee"
            fields={[
              {
                name: "employeeName",
                type: "text",
                placeholder: "Employee Name",
              },
              {
                name: "employeeEmail",
                type: "email",
                placeholder: "Employee Email",
              },
            ]}
            onSubmit={handleAddWorker}
          ></Forms>
        </Modal>
      )}

      <div className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-8">
        <img
          src={shopData.shop.image || "https://via.placeholder.com/600x300"}
          alt={shopData.shop.name}
          className="w-full h-64 object-cover rounded-lg"
        />
        <div className="mt-4">
          <h1 className="text-2xl font-bold">{shopData.shop.name}</h1>
          <p className="text-gray-600">{shopData.shop.description}</p>
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
          <button
            onClick={() => setAddWorkerModel(true)}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          >
            Add Workers
          </button>
        </div>
        <div className="mt-4 border-t pt-4 text-gray-700">
          <p>
            <strong>📍 Location:</strong> {shopData.shop.location}
          </p>
          <p>
            <strong>📞 Contact:</strong> {shopData.shop.phoneNumber} |{" "}
            {shopData.shop.email}
          </p>
          <p>
            <strong>⏰ Open Hours:</strong> {shopData.shop.openingHours} -{" "}
            {shopData.shop.closingHours}
          </p>
        </div>
      </div>

      <div className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-8">
        <EmployeesList employeesListData={shopData.workers} ></EmployeesList>
      </div>
    </>
  );
}
