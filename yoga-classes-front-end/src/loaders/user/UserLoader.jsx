import httpClient from "../../utils/httpClient";
import { USER_PATH } from "../../utils/routesPath";

export async function loader({ params }) {
  const { id } = params;
  console.log("UserLoader params:", params);

  //   const userData = {
  //     id,
  //     email: `user${id}@example.com`,
  //     createdAt: new Date().toISOString(),
  //     userType: "admin",
  //     status: "active",
  //     accountId: `acc-${id}`,
  //     shops: [
  //       {
  //         id: "shop-101",
  //         name: "Downtown Grocery",
  //         role: "manager",
  //         location: "New York, NY",
  //       },
  //       {
  //         id: "shop-202",
  //         name: "City Electronics",
  //         role: "staff",
  //         location: "Los Angeles, CA",
  //       },
  //       {
  //         id: "shop-303",
  //         name: "Organic Mart",
  //         role: "viewer",
  //         location: "Austin, TX",
  //       },
  //     ],
  //   };
    debugger
  const response = await httpClient.get(`${USER_PATH.ROOT}/${id}`);
  console.log("UserLoader response:", response);
  return response.data;
}
