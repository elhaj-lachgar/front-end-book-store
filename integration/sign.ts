import ParserJson from "./parse-json";
import { header, TError } from "@/lib/utils";

export type User = {
  data: {
    name: string;
    email: string;
    _id: string;
    profile?: string;
    role: string;
    createdAt: string;
    updatedAt: string;
    __v: number;
    card?: string;
  };
  token: string;
};

export type TUser = {
  name: string;
  email: string;
  _id: string;
  profile?: string;
  role: string;
  createdAt: string;
  updatedAt: string;
  card?: string;
  ReviewBook?:string[];
  reviews?:string[];
  __v: number;
};

export default async function SignIn(email: string, password: string) {
  const url =
    "https://book-store-backend-ouns.onrender.com/api/v1/auth/sign-in";
  const data = JSON.stringify({ email: email, password: password });
  const response = await fetch(url, {
    body: data,
    headers: header,
    method: "POST",
  });
  const result: User | TError | Error = await ParserJson(response.body);
  return result;
}
