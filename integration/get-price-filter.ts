import ParserJson from "./parse-json";
import { TApiBooks, TError, header } from "@/lib/utils";

export default async function GetPriceFilter(max: number, min?: number) {
  const url = `https://book-store-backend-ouns.onrender.com/api/v1/books?price.value[gte]=${min||0}&price.value[lte]=${
    max || 0
  }`;
  const responce = await fetch(url, { headers: header });
  const result: Error | TApiBooks | TError = await ParserJson(responce.body);
  return result;
}
