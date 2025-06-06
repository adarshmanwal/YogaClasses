import React from "react";

export default function Forms({ title, fields, onSubmit, children }) {

  debugger
  return (
    <form onSubmit={onSubmit} className="p-4 bg-white rounded-md shadow-lg">
      <h2 className="text-lg font-bold mb-4">{title}</h2>

      {fields.map(({ name, type, placeholder, options }) => {
        // Render select dropdown
        if (type === "select") {
          return (
            <select
              key={name}
              name={name}
              // value={initialValues?.[name] || ""}
              // onChange={onChange}
              className="border p-2 w-full mb-2"
            >
              <option value="">-- {placeholder} --</option>
              debugger;
              {options?.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          );
        }

        // Render regular input
        return (
          <input
            key={name}
            type={type}
            name={name}
            // value={initialValues?.[name] || ""}
            placeholder={placeholder}
            // onChange={onChange}
            className="border p-2 w-full mb-2"
          />
        );
      })}

      {children}

      <div className="flex justify-end gap-2">
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
        >
          Submit
        </button>
      </div>
    </form>
  );
}
