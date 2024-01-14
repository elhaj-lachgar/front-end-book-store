import ParserJson from "./parse-json";


export default async function CreateReview ( bookId:string , content : string , rating : number  ) {
   
    const token = window.localStorage.getItem("token");
    if(!token) return null;


    // @ts-ignore
    const user:User = JSON.parse(window.localStorage.getItem("user"));
 
    if(!user?.ReviewBook?.includes(bookId)) return null; 

    const data = JSON.stringify({bookId , content , rating});

    const url ="https://book-store-backend-ouns.onrender.com/api/v1/review"

    const header = {
        "Content-Type": "application/json",
        "authorization" : `Bearer ${token}`
    }

    const responce = await fetch(url , { headers : header , body : data , method : "POST" });


    const result = await ParserJson(responce.body);

    if(result?.data){
        return result;
    }
    return null;
}