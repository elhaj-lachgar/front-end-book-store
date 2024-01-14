import ParserJson from "./parse-json";

export default async  function  GetUserLastVersion (){
    const token = window.localStorage.getItem('token');
    if(!token) return null;
    const url = "https://book-store-backend-ouns.onrender.com/api/v1/auth/last-version";
    const response = await fetch(url , {headers: {'Authorization': 'Bearer ' + token } });
    const result = await ParserJson(response.body);
    if(result.data) {
        window.localStorage.setItem("user",JSON.stringify(result.data));
        return result.data;
    }
    return null;
}