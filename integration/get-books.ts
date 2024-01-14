import ParserJson from "./parse-json";
import { header , TError , TApiBooks } from "@/lib/utils";




async function GetBooks ( page? : number ,  limit? : number , keyword? : string) {
    const BaseUrl = `https://book-store-backend-ouns.onrender.com/api/v1/books?page=${page||1}&limit=${limit||5}`
    const  url = !keyword ?  BaseUrl : BaseUrl+`&keyword=${keyword}`;
    const responce = await  fetch(url,{headers:header});
    const result : Error | TApiBooks | TError = await ParserJson(responce.body);
    return result;
}

export default GetBooks ;