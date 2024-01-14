import { TError } from "@/lib/utils";
import ParserJson from "./parse-json";
import { TUser } from "./sign";
import { TACart } from "./set-card";

export default async function DeleteFromCard(id: string) {
  const token = window.localStorage.getItem("token");
  if (!token) return null;
  // @ts-ignore
  const user: TUser = JSON.parse(window.localStorage.getItem("user"));
  if (!user.card) return null;

  const url = `https://book-store-backend-ouns.onrender.com/api/v1/card/${user.card}`;
  const data = JSON.stringify({ bookId: id});
  const header = {
    "Content-Type": "application/json",
    authorization: `Bearer ${token}`,
  };

  const response = await fetch(url, {
    method: "DELETE",
    body: data,
    headers: header,
  });

  const result: Error | TError | TACart = await ParserJson(response.body);
  // @ts-ignore
  if (result.data) {
    //@ts-ignore
    const card: TACart = result.data;
    return card;
  }

  return null;
}