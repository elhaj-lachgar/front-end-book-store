import ParserJson from "./parse-json";
import { TAddressPramas, TAddressesPramas } from "./add-address";

export default async function GetTAddresses() {
  const token = window.localStorage.getItem("token");
  if (!token) return null;
  const header = {
    "Content-Type": "application/json",
    authorization: `Bearer ${token}`,
  };

  const url = "https://book-store-backend-ouns.onrender.com/api/v1/address";

  const response = await fetch(url, { headers: header });

  const result: TAddressesPramas | [] = await ParserJson(response.body);

  //@ts-ignore
  if (result.data) {
    //@ts-ignore
    const addresses: TAddressesPramas = result;
    let arr: TAddressPramas[] = addresses.data.map((ele) => {
      return {
        data: {
          ...ele,
        },
      };
    });
    return arr;
  }

  return null;
}
