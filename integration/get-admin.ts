import { TError } from "@/lib/utils";
import ParserJson from "./parse-json";
import { TUser } from "./sign";

export type TAdminBooks = {
  data: [
    {
      price: {
        currency: "USD" | "EUR" | "MAD";
        value: number;
      };
      _id: string;
      title: string;
      description: string;
      image: string;
      category: string;
      author: string;
      updatedAt: string;
      __v: number;
    }
  ];
};

export default async function GetAll() {
  const token = window.localStorage.getItem("token");
  if (!token) return null;

  // @ts-ignore
  const user: TUser = JSON.parse(window.localStorage.getItem("user"));

  if (user.role != "admin") return null;

  const header = {
    "Content-Type": "application/json",
    authorization: `Bearer ${token}`,
  };

  const url = `https://book-store-backend-ouns.onrender.com/api/v1/books/admin/get-books`;

  const response = await fetch(url, { headers: header });

  const result: TError | Error | TAdminBooks = await ParserJson(response.body);
  // @ts-ignore
  if (result.data) {
    // @ts-ignore
    const books: TAdminBooks = result;
    return books;
  }
  return null;
}
