import ParserJson from "./parse-json";


export default  async function GetAllOrders ( page : number) {

    const token = window.localStorage.getItem("token");
    
    if(!token) return null;

    // @ts-ignore
    const user : TUser  = JSON.parse(window.localStorage.getItem("user"));
    if(user?.role != "admin" && ! user) return null;

    const url = `https://book-store-backend-ouns.onrender.com/api/v1/order/all-users?page=${page}`;

    const header = {
        "authorization": `Bearer ${token}`
    }

    const response  = await fetch(url,{headers:header});

    const result = await ParserJson(response.body);

    if(result.data){
        return result ;
    }

    return null;
}