import ParserJson from "./parse-json";
import { header , TApiCategorys , TError} from "@/lib/utils";


async function GetCategorys () {
    const url = "https://book-store-backend-ouns.onrender.com/api/v1/categorys";
    const responce = await fetch(url,{headers:header});
    const result : TError | TApiCategorys |Error = await ParserJson(responce.body);
    return result;
}

export default GetCategorys;