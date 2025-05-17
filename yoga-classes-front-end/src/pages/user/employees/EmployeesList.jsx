import React from "react";

export default function EmployeesList({ employeesData }) {
  return (
    <>
      <h1 className="text-2xl font-semibold text-gray-900">Employees</h1>
      {Array.isArray(employeesData) && employeesData.length > 0 ? (
        <ul role="list" className="divide-y divide-gray-100">
          {employeesData.map((worker, index) => (
            <li key={index} className="flex justify-between gap-x-6 py-5">
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
        <p className="text-gray-500">No workers added yet.</p>
      )}
    </>
  );
}
