import ParserJson from "./parse-json";

export default async function DeleteBook(id: string) {
  const token = window.localStorage.getItem("token");
  if (!token) return null;

  // @ts-ignore
  const user = JSON.parse(window.localStorage.getItem("user")) as TUser;

  if (user.role != "admin") return null;

  const header = {
    authorization: `Bearer ${token}`,
  };

  const url = `https://book-store-backend-ouns.onrender.com/api/v1/books/${id}`;

  const responce = await fetch(url, { headers: header  , method:"DELETE" });

  const result = await ParserJson(responce.body);

  if (result.success) {
    return result;
  }

  return null;
}
