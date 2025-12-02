import axios from "axios";
import type { User } from "../pages/admin/usermanagement/_components/columns";
import type { ApiResponse } from "../types/order";

export interface user {
  email: string;
  password: 
  string;
}
export type Role = {
  id: number;
  name: string;
};
export interface userProps {
  username: string;
  password: string;
  role: [];
  email: string;
  phoneNumber: string;
}

export interface AuthResponseDTO {
  userId: string;
  accessToken: string;
  refreshToken: string;
}
export interface UserResponseDTO {
  id?: string;
  username: string;
  password?: string;
  phoneNumber: string;
  email: string;
  roles: Role[];
}
export interface CreateUserRequest {
  username: string;
  password?: string;
  phoneNumber: string;
  email: string;
  role: Role[];
}
const url = import.meta.env.VITE_USER_URL;
export const SignIn = async (data: user): Promise<ApiResponse<AuthResponseDTO>> => {
  const res = await axios
    .post(`${url}/auth/signin`, data)
    .then((res) => res.data)
    .catch((err) => console.log(err));
  return res;
};

export const GetAllUsers = async (): Promise<ApiResponse<UserResponseDTO[]>> => {
  const res = await axios
    .get(`${url}/auth/all`)
    .then((res) => res.data)
    .catch((err) => console.log(err));
  return res;
};

export const SignUp = async (data: userProps) => {
  const res = await axios
    .post(`${url}/signup`, data)
    .then((res) => res.data)
    .catch((err) => console.log(err));
  return res;
};
export const GetEmailFromJWT = async (token: string): Promise<ApiResponse<string>>=> {
  const res = await axios
    .get(`${url}/auth/getemail/${token}`)
    .then((res) => res.data)
    .catch((err) => console.log(err));
  return res;
};
export const GetUserByEmail = async (email: string):  Promise<ApiResponse<UserResponseDTO>> => {
  const res = await axios
    .get(`${url}/auth/getuser/${email}`)
    .then((res) => res.data)
    .catch((err) => console.log(err));
  return res;
};


export const UpdateUser = async (
  data: CreateUserRequest,
  id: string,
  token: string
): Promise<ApiResponse<UserResponseDTO>> => {
  const res = await axios
    .put(`${url}/auth/update/${id}`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    })
    .then((res) => res.data)
    .catch((err) => console.log(err));
  return res;
};
export const DeleteUser = async (id: string, token: string) => {
  const res = await axios
    .delete(`${url}/auth/delete/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then((res) => res.data)
    .catch((err) => console.log(err));
  return res;
};
export const CreateUser = async (data: CreateUserRequest) => {
  const res = await axios
    .post(`${url}/auth/signup`, data)
    .then((res) => res.data)
    .catch((err) => console.log(err));
  return res;
};
