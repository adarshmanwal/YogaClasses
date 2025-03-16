import { Form, Link, useActionData, useNavigation } from "react-router-dom";

function AuthForm({ mode }) {
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";
  const data = useActionData();

  return (
    <>
      <Form method="post">
        <h1 className="text-2xl font-bold mb-4 text-center">
          {mode === "login" ? "Log in" : "Create a new account"}
        </h1>

        {data?.errors && (
          <ul className="text-red-500 mb-4">
            {Object.values(data.errors).map((err) => (
              <li key={err}>{err}</li>
            ))}
          </ul>
        )}
        {data?.message && <p className="text-red-500 mb-4">{data.message}</p>}

        <div className="mb-4">
          <label htmlFor="email" className="block mb-1 font-medium">
            Email
          </label>
          <input
            id="email"
            type="email"
            name="email"
            required
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="password" className="block mb-1 font-medium">
            Password
          </label>
          <input
            id="password"
            type="password"
            name="password"
            required
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>

        {mode === "signup" && (
          <div className="mb-4">
            <label htmlFor="userType" className="block mb-1 font-medium">
              User Type
            </label>
            <select
              id="userType"
              name="userType"
              required
              className="w-full p-2 border border-gray-300 rounded bg-white"
            >
              <option value="">Select User Type</option>
              <option value="shop_admin">Shop Admin</option>
              <option value="shop_worker">Shop Worker</option>
              <option value="customer">Customer</option>
            </select>
          </div>
        )}

        <div className="flex flex-col items-center gap-4">
          <button
            disabled={isSubmitting}
            className={`w-full px-4 py-2 text-white rounded ${
              isSubmitting
                ? "bg-gray-300 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            {isSubmitting ? "Submitting..." : mode === "login" ? "Login" : "Sign Up"}
          </button>

          <Link
            to={mode === "login" ? "/auth/signup" : "/auth/login"}
            className="text-blue-600 hover:underline"
          >
            {mode === "login" ? "Don't have an account? Sign Up" : "Already have an account? Log in"}
          </Link>
        </div>
      </Form>
    </>
  );
}

export default AuthForm;
