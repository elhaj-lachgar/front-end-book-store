import ParserJson from "@/integration/parse-json";



export default async function UpdateStatusBook( date : string , id: string) {
    const token = window.localStorage.getItem('token');
    if(!token) return null;

    // @ts-ignore
    const user = JSON.parse(window.localStorage.getItem('user'));

    if(user?.role != "admin") return null; 

    const header = {
        "authorization":`Bearer ${token}`,
        "Content-Type": "application/json"
    }

    const data = JSON.stringify({delaivred_date:date});

    const url = `https://book-store-backend-ouns.onrender.com/api/v1/order/${id}`

    const responce = await fetch(url , { headers : header , body : data , method:"PUT"});

    const result = await ParserJson(responce.body);

    if(result?.data){
        return result;
    }

    return null;
}