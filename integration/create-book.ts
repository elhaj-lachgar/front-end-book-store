import { TBook } from "@/context/BookContext";
import ParserJson from "./parse-json";
import { TUser } from "./sign";
import { TError } from "@/lib/utils";

export type CreateBookType = {
  data : TBook
}

export default async function CreateBook(
  title: string,
  description: string,
  author: string,
  publishedAt: string,
  image: string,
  category: string,
   value: number| string , currency: "USD" | "EUR" | "MAD" 
) {
  const token = window.localStorage.getItem("token");
  if (!token) return null;

  // @ts-ignore
  const user = JSON.parse(window.localStorage.getItem("user")) as TUser;

  if (user.role != "admin") return null;

  const url = "https://book-store-backend-ouns.onrender.com/api/v1/books";

  if( typeof value === "string") {
    value = parseInt(value);
  }

  const data = new FormData();
  data.append("author", author);
  data.append("title", title);
  data.append("description", description);
  data.append("image", image);
  data.append("publishedAt", publishedAt);
  data.append("newcategory", category);
  data.append("value", value.toString());
  data.append("currency", currency);

  const header = {
    authorization: `Bearer ${token}`,
  };

  const responce = await fetch(url, {
    headers: header,
    body: data,
    method: "POST",
  });

  const result : CreateBookType | Error | TError = await ParserJson(responce.body);
  // @ts-ignore
  if(result.data){
    // @ts-ignore
     const book : CreateBookType = result;
     return book
  }
  return null;
}
