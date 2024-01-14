import ParserJson from "./parse-json";
import { header  , TError } from "@/lib/utils";
import { User } from "./sign";



export default async function SignIn( email : string , password : string  , confirmPassword : string , name : string , profile? : string) {
    const url = "https://book-store-backend-ouns.onrender.com/api/v1/auth/sign-up";
    const data = new FormData();
    data.append("email", email);
    data.append("name",name);
    data.append('password',password);
    data.append('confirmPassword',confirmPassword);
    if(profile!= null && profile!= undefined) data.append("image",profile);

    const response = await fetch (url, {body: data , method: 'POST'});
    const result : User | TError |Error  = await ParserJson(response.body);
    return result;
}