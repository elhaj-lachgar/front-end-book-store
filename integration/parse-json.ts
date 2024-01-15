

export default async function ParserJson(body: ReadableStream | null) {
  if (!body) return new Error("same thing wrong!");

  const decoder = new TextDecoder();

  const value = (await body.getReader().read()).value;

  try {
    const str = decoder.decode(value);
    return JSON.parse(str);
  } catch (err: any) {
    const message = new Error(err.message);
    return message;
  }
}



