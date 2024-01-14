import { TError } from "@/lib/utils";
import ParserJson from "./parse-json";
import { TUser } from "./sign";


export type Props = {
    id : string ,
    quantity : number,
}[]

export type TACart = {
  __v:number,
  createdAt : string,
  updatedAt : string,
  Books:[{
    book : string ,
    price :{
        value : number,
        currency : "USD"| "EUR"|"MAD"
    },
    quantity : number,
  }],
  _id : string,
  totalePrice : number,
}

export default async function SetCard ( data : Props ) {
    const token  = window.localStorage.getItem('token');
    if (!token) return new Error('authorization');
    // @ts-ignore
    const user :TUser = JSON.parse(window.localStorage.getItem('user'));
    if(user.card) return new Error('had already card');
    const url  = "https://book-store-backend-ouns.onrender.com/api/v1/card";
    const header = {
        "Content-Type": "application/json",
        "authorization" : `Bearer ${token}`
    }; 
    const content = JSON.stringify({data : data});

    const response = await fetch (url,{headers:header , body:content , method: "POST"});

    const result  : TError |Error | TACart = await ParserJson(response.body);
    // @ts-ignore
    if(result.data){
        const new_user= user;
        // @ts-ignore
        new_user.card = result.data._id;      
        window.localStorage.setItem("user",JSON.stringify(new_user));
    }
    return result;
}