import ParserJson from "./parse-json";

export default async function UpadteUserRole (id : string , role : string){
    const token = window.localStorage.getItem("token");
    if (!token) return null;
  
    // @ts-ignore
    const user = JSON.parse(window.localStorage.getItem("user")) as TUser;
  
    if (user.role != "admin") return null;
  
    const header = {
      authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    };

    const data = JSON.stringify({role});

    const url = `https://book-store-backend-ouns.onrender.com/api/v1/auth/role/${id}`;

    const responce = await fetch(url , { headers:header ,method: 'PUT' , body: data});

    const result = await ParserJson(responce.body);

    if(result?.data){
        return result;
    }
    return null;
}