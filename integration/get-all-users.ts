import { TPagination } from "@/context/BookContext";
import ParserJson from "./parse-json";
import { TUser } from "./sign";

export type AdminUsers = {
    data:TUser[],
    pagination : TPagination,
}

export default async function GetAllUsers (page:number) {
    const token = window.localStorage.getItem("token");
    if (!token) return null;
  
    // @ts-ignore
    const user: TUser = JSON.parse(window.localStorage.getItem("user"));
  
    if (user.role != "admin") return null;
  
    const header = {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    };

    const url = `https://book-store-backend-ouns.onrender.com/api/v1/auth/all-users/admin?page=${page}`

    const responce = await fetch(url ,{ headers: header});

    const result : AdminUsers | Error = await ParserJson(responce.body);

    // @ts-ignore
    if(result?.data){
        // @ts-ignore
        const users : AdminUsers = result;
        return users;
    }

    return null;
}