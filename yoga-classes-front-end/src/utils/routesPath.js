export const URL_PATH = {
    ROOT: "/",
    AUTH: "/auth",
    LOGIN: "/auth/login",
    SIGNUP: "/auth/signup",
    ACCEPT_INVITE: "/auth/accept-invite",
    LOGOUT: "/logout",
    SHOPS: "/shops/:id",
    USER_PROFILE: "/users/profile",
    GET_EMPLOYEES: "/users/getEmployees",
}
export const USER_PATH = {
    ROOT: "/users",
    PROFILE: "/users/profile",
    EMPLOYEES: "/users/employees",
    ADD_EMPLOYEE: "/users/addEmployee",
    EDIT_EMPLOYEE: "/users/editEmployee/:id",
}
export const SHOP_PATH = {
    ROOT: "/shops",
    ALL: "/shops/shopsList",
    ADD: "/shops/add",
    EDIT: "/shops/edit/:id",
    DETAILS: "/shops/:id",
    ASSIGN_EMPLOYEE: "/shops/assignEmployee",
}