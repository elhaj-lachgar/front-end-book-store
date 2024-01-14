import { TUpdateProps } from "@/validator/update-profile-validator";
import ParserJson from "./parse-json";
import { TError } from "@/lib/utils";
import {  User } from "./sign";


export default async function UpdateProfile ( props:TUpdateProps ,profile:FileList|null) {
    const token = window.localStorage.getItem("token");
    if (!token) return null;

    const data = new FormData();
      if(profile)data.append("image",profile[0]);

      if(props.name)data.append("name",props.name);
      
      if(props.email)data.append("email",props.email);

  
    const header = {
      authorization: `Bearer ${token}`,
    };

    const url = "https://book-store-backend-ouns.onrender.com/api/v1/auth/update-user"

    const responce =await fetch(url,{headers:header , body:data, method:"PUT"});
    const result : TError | User | Error = await ParserJson(responce.body);

    //@ts-ignore
    if(result.data){
        // @ts-ignore
        window.localStorage.setItem('user',JSON.stringify(result.data));
        // @ts-ignore
        const user : User = result;
        return user;
    }

    return null;
}