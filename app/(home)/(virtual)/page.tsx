import Books from "@/components/Books";
import FilterComponent from "@/components/FilterComponent";
import GetBooks from "@/integration/get-books";
import { TestBookApi, TestError, TApiBooks } from "@/lib/utils";
import  Pagination from "@/components/PaginationHandler";

export default async function Home() {
  let data: TApiBooks | null = null;
  try {
    const result = await GetBooks();
    if (typeof result === typeof TestBookApi) {
      // @ts-ignore
      data = result;
    }
    if (typeof result === typeof TestError) throw new Error(result.toString());
    if (typeof result === typeof new Error("Invalid"))
      throw new Error(result.toString());
  } catch (err:any) {
    console.log( "err",err.message);
  }

  return (
    <main className="flex w-11/12 flex-wrap lg:gap-x-[20px]  min-h-[120vh] lg:px-20 mt-10 lg:w-full mx-auto">
      <FilterComponent />
      <div className="w-full lg:w-[70%] flex flex-col   gap-x-4 gap-y-10">
        {data  ? 
        <>
        <Books books={data} />
        <div className="w-full flex justify-center mt-10">
          <Pagination/>
        </div>
        </>
        : null}
      </div>
    </main>
  );
}
