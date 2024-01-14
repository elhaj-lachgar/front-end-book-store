import ParserJson from "./parse-json";


export default async function ClearCard ( id : string ) {
  const token = window.localStorage.getItem("token");
  if(!token) return null;

  const header = {
    "authorization" : `Bearer ${token}`,
    "Content-Type" : "application/json"
  }

  const url = `https://book-store-backend-ouns.onrender.com/api/v1/card/clear/${id}`;

  const response = await fetch(url , {headers : header , method : "DELETE"});

  const result = await ParserJson(response.body);

   if(result.success){
    return result
   }
   return null;
}