import ParserJson from "./parse-json";
import { TUser } from "./sign";

export default async function GetCheckoutPage(address: string) {
  
  const token = window.localStorage.getItem("token");
  if (!token) return null;
  // @ts-ignore
  const user: TUser = JSON.parse(window.localStorage.getItem("user"));



  if (!user?.card) return null;

  const header = {
    "authorization": `Bearer ${token}`,
    "Content-Type": "application/json"
  };

  const url = "https://book-store-backend-ouns.onrender.com/api/v1/payment";

  const data = JSON.stringify({ card: user.card, address: address });

  const responce = await fetch(url, {
    method: "POST",
    body: data,
    headers: header,
  });

  const result = await ParserJson(responce.body);

  // @ts-ignore
  if (result.url) {
    //    @ts-ignore
    return result;
  }
  return null;
}
