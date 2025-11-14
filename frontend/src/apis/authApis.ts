import axios from "axios";
import type { User } from "../pages/admin/usermanagement/_components/columns";

export interface user {
  email: string;
  password: string;
}
export interface userProps {
  username: string;
  password: string;
  role: [];
  email: string;
  phoneNumber: string;
}
const url = import.meta.env.VITE_USER_URL;
export const SignIn = async (data: user) => {
  const res = await axios
    .post(`${url}/auth/signin`, data)
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
}
export const GetEmailFromJWT = async (token: string) => {
  const res = await axios
    .get(`${url}/auth/getemail/${token}`)
    .then((res) => res.data)
    .catch((err) => console.log(err));
  return res;
};
export const GetUserByEmail= async (email: string) => {
  const res = await axios
    .get(`${url}/auth/getuser/${email}`)
    .then((res) => res.data)
    .catch((err) => console.log(err));
  return res;
};
export const GetAllUsers = async (): Promise<User[]> => {
  const res = await axios
    .get(`${url}/all`)
    .then((res) => res.data)
    .catch((err) => console.log(err));
  return res;
};

export const UpdateUser = async (
  data: User,
  id: number,
  token: string
): Promise<User> => {
  const res = await axios
    .put(`${url}/update/${id}`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    })
    .then((res) => res.data)
    .catch((err) => console.log(err));
  return res;
};
export const DeleteUser = async (id: number, token: string) => {
  const res = await axios
    .delete(`${url}/delete/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then((res) => res.data)
    .catch((err) => console.log(err));
  return res;
};
export const CreateUser = async (data: User) => {
  const res = await axios
    .post(`${url}/signup`, data)
    .then((res) => res.data)
    .catch((err) => console.log(err));
  return res;
};