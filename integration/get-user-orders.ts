import ParserJson from "./parse-json";
import { TUser } from "./sign";


export default async function GetUserOrders ( ) {
    const token = window.localStorage.getItem("token");
    if(!token) return null;

    // @ts-ignore
    const user:TUser = JSON.parse(window.localStorage.getItem("user"));

    if(!user) return null;

    const header ={
        "authorization":`Bearer ${token}`
    };

    const url = "https://book-store-backend-ouns.onrender.com/api/v1/order/"

    const responce  = await fetch(url , {headers : header});

    const result:any = await ParserJson(responce.body);

    // @ts-ignore
    if(result.data){
        return result;
    }
    
    return null;
}