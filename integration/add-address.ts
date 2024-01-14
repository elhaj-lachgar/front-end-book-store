import { TError } from "@/lib/utils";
import ParserJson from "./parse-json";


export type TAddressPramas = {
  data: {
    _id: string;
    __v: number;
    city: string;
    streat: string;
    country: string;
    createdAt: string;
    updatedAt: string;
  
}
}

export type TAddressesPramas = {
  data: {
    _id: string;
    __v: number;
    city: string;
    streat: string;
    country: string;
    createdAt: string;
    updatedAt: string;
  }[];
};

export default async function AddAddress(
  country: string,
  city: string,
  codePostal: Number,
  streat: string
) {
  const token = window.localStorage.getItem("token");
  if (!token) return null;

  const data = JSON.stringify({ country, city, codePostal, streat });

  const header = {
    "Content-Type": "application/json",
    authorization: `Bearer ${token}`,
  };

  const url = "https://book-store-backend-ouns.onrender.com/api/v1/address";

  const response = await fetch(url, {
    headers: header,
    body: data,
    method: "POST",
  });

  const result: TAddressPramas | Error | TError = await ParserJson(
    response.body
  );

  //@ts-ignore
  if (result.data) {
    //@ts-ignore
    const addresses: TAddressPramas = result;
    return addresses;
  }

  return null;
}
