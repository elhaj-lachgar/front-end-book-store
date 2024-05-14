import ParserJson from "./parse-json";
import { header, TError } from "@/lib/utils";

export type ResProps = {
  data: {
    price: {
      currency: "USD" | "EUR" | "MAD";
      value: number;
    };
    _id: string;
    title: string;
    description: string;
    image: string;
    category: {
      _id: string;
      name: string;
      createdAt: string;
      updatedAt: string;
      __v: number;
    };
    createdAt: string;
    author: string;
    updatedAt: string;
    __v: number;
  };
};

async function GetBook(id: string) {
  const url = `https://book-store-backend-ouns.onrender.com/api/v1/books/${id}`;
  const res = await fetch(url, { headers: header})
    .then((response) => response.json())
    .then((data) => {
      if (data?.data) {
        return data;
      } else {
        return null;
      }
    })
    .catch((error) => {
      console.error("error", error);
      return null;
    }); 
  
    return res;
}

export default GetBook;
