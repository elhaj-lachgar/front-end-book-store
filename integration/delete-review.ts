import ParserJson from "./parse-json";

export default async function DeleteReview(id: string) {
  const token = window.localStorage.getItem("token");
  if (!token) return null;

  const url = `https://book-store-backend-ouns.onrender.com/api/v1/review/${id}`;

  const response = await fetch(url, {
    headers: {
      authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    method : "DELETE"
  });

  const result = await ParserJson(response.body);

  if (result.success) {
    return result;
  }
  return null;
}
