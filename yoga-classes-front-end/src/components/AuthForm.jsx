import {
  Form,
  Link,
  useActionData,
  useNavigation,
  useSearchParams,
} from "react-router-dom";

function AuthForm() {
  const [searchParams] = useSearchParams();
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";
  const data = useActionData();
  const isLogin = searchParams.get("mode") === "login";

  return (
    <>
      <Form method="post" className="max-w-xl mx-auto my-8">
        <h1 className="text-2xl font-bold mb-4">
          {isLogin ? "Log in" : "Create a new user"}
        </h1>
        {data && data.errors && (
          <ul className="text-red-500 mb-4">
            {Object.values(data.errors).map((err) => {
              return <li key={err}>{err}</li>;
            })}
          </ul>
        )}
        {data && data.message && (
          <p className="text-red-500 mb-4">{data.message}</p>
        )}
        <p className="mb-4">
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
        </p>
        <p className="mb-4">
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
        </p>
        <div className="flex justify-end items-center gap-4">
          <Link
            to={`?mode=${isLogin ? "signup" : "login"}`}
            className="text-primary-500 hover:text-primary-700"
          >
            {isLogin ? "Create new user" : "Login"}
          </Link>
          <button
            disabled={isSubmitting}
            className={`px-4 py-2 rounded ${
              isSubmitting
                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                : "bg-gray-300 text-gray-800 hover:bg-primary-300"
            }`}
          >
            {isSubmitting ? "Submitting.." : "Save"}
          </button>
        </div>
      </Form>
    </>
  );
}

export default AuthForm;
