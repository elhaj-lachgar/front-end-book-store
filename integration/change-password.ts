import { TError } from "@/lib/utils";
import ParserJson from "./parse-json";

  type Tdata = {
    message : string ,
}

export default async function ChangePassword ( currentpassword : string , newpassword :string , confirmpassword :string){7
    const token = window.localStorage.getItem("token");
    if (!token) return null;

    const data = JSON.stringify({ currentpassword , newpassword , confirmpassword });

    const header = {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    };

    const url = "https://book-store-backend-ouns.onrender.com/api/v1/auth/change-password"

    const response = await fetch(url,{headers:header , body : data ,method:"PUT" });

    const result : Tdata | TError | Error = await ParserJson(response.body);

    //@ts-ignore
    if(result.message){
        return result;
    }

    return null;
}