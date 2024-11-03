import { createApiCall } from "./axios";
import {
  LoginResponse,
  LoginCredentials,
  RegisterCredentials,
} from "../types/auth";

export const authApi = {
  login: (credentials: LoginCredentials) =>
    createApiCall<LoginResponse>("/users/login", "POST", credentials),

  register: (userData: RegisterCredentials) =>
    createApiCall<LoginResponse>("/users/register", "POST", userData),

  getCurrentUser: () => createApiCall<LoginResponse>("/users/me", "GET"),

  // updateUser: (userData: FormData) => {
  //   console.log("userData", userData);
  //   // const { name, email, id } = userData;
  //   return createApiCall<LoginResponse>(`/users/${userData.id}`, "PUT", {
  //     name,
  //     email,
  //   });
  // },
};

export default authApi;
