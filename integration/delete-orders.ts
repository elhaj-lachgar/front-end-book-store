import ParserJson from "./parse-json";


export default async function DeleteOrder(id:string){
    const token = window.localStorage.getItem('token');
    if(!token) return null;

    // @ts-ignore
    const user = JSON.parse(window.localStorage.getItem('user'));

    if(user?.role != "admin") return null; 

    const header = {
        "authorization":`Bearer ${token}`,
        "Content-Type": "application/json"
    }


    
    const url = `https://book-store-backend-ouns.onrender.com/api/v1/order/${id}`

    const responce = await fetch(url , { headers : header  , method:"DELETE"});

    const result = await ParserJson(responce.body);


    if(result.success) {
        return result;
    }

    return null;
}