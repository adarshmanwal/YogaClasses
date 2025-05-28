import { useContext, useEffect, useState } from "react";
import { fetchEmployees } from "../../../api/employeeService";
import { URL_PATH, SHOP_PATH } from "../../../utils/routesPath";
import { UserContext } from "../../../store/user/user-context";
import Modal from "../../../components/UI/Modal";
import Forms from "../../../components/UI/Forms";
import httpClient from "../../../utils/httpClient";
import { useLocation } from "react-router-dom";

export default function EmployeesList({employeesListData = []}) {
  const [employeesData, setEmployeesData] = useState([]);
  const [shopsData, setShopsData] = useState([]);
  const userData = useContext(UserContext);
  const [assignedShop, setAssignedShop] = useState(false);
  const location = useLocation();
  const isFromUserList = location.pathname.includes("/usersList");

  useEffect(() => {
    const loadEmployees = async () => {
      try {
        const response = await fetchEmployees(
          `${URL_PATH.GET_EMPLOYEES}/${userData.user.accountId}`
        );
        if (response) {
          setEmployeesData(response);
        }
      } catch (error) {
        console.error("Error fetching employees:", error);
      }
    };
    const loadShops = async () => {
      try {
        const response = await fetchEmployees(`${SHOP_PATH.ALL}`);
        if (response) {
          setShopsData(response);
        }
      } catch (error) {
        console.error("Error fetching shops:", error);
      }
    };
    loadShops();
    if (employeesListData && employeesListData.length > 0) {
      setEmployeesData(employeesListData);
    } else {
      loadEmployees();
    }
  }, []);

  const handleAssignShop = async (e) => {
    e.preventDefault();
    try {
      const formdata = new FormData(e.target);
      const employeeId = formdata.get("employeeId");
      const shopId = formdata.get("shopId");
      const response = await httpClient.put(`${SHOP_PATH.ASSIGN_EMPLOYEE}`, {
        employeeId,
        shopId,
      });
      if (response.status === 200) {
        alert("Employee assigned to shop successfully!");
        setAssignedShop(false);
      }
    } catch (error) {
      console.error("Error assigning employee to shop:", error);
    }
  };

  const createEmployeeOptions = (employees) => {
    return employees.map((employee) => ({
      value: employee.id,
      label: employee.email,
    }));
  };
  const createShopOptions = (shops) => {
    return shops.map((shop) => ({
      value: shop.id,
      label: shop.name,
    }));
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-semibold text-gray-900 mb-6">Employees</h1>
      {isFromUserList && <button
        className="px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75"
        onClick={() => setAssignedShop(true)}
      >
        Assign Shop
      </button>}

      {Array.isArray(employeesData) && employeesData.length > 0 ? (
        <ul role="list" className="divide-y divide-gray-100 space-y-4">
          {employeesData.map((worker, index) => (
            <li
              key={index}
              className="flex justify-between gap-x-6 py-5 bg-white p-4 rounded-md shadow-sm"
            >
              <div className="flex min-w-0 gap-x-4">
                <img
                  className="size-12 flex-none rounded-full bg-gray-50"
                  src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                  alt="Worker"
                />
                <div className="min-w-0 flex-auto">
                  <p className="text-sm/6 font-semibold text-gray-900">
                    {worker.name || "Unknown"}
                  </p>
                  <p className="mt-1 truncate text-xs/5 text-gray-500">
                    {worker.email || "No email provided"}
                  </p>
                </div>
              </div>
              <div className="shrink-0 sm:flex sm:flex-col sm:items-end">
                <p className="text-sm text-gray-500">
                  Status: {worker.status || "N/A"}
                </p>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-500 mt-4">No workers added yet.</p>
      )}

      {assignedShop && (
        <Modal open={assignedShop} onClose={() => setAssignedShop(false)}>
          <Forms
            title="Assign Employee to Shop"
            // onChange={handleChange}
            onSubmit={handleAssignShop}
            fields={[
              {
                name: "employeeId",
                type: "select",
                placeholder: "Select Employee",
                options: createEmployeeOptions(employeesData),
              },
              {
                name: "shopId",
                type: "select",
                placeholder: "Select Shop",
                options: createShopOptions(shopsData.data || []),
              },
            ]}
          />
        </Modal>
      )}
    </div>
  );
}
