import GetBook from "@/integration/get-book";
import { Params } from "next/dist/shared/lib/router/utils/route-matcher";
import EmptyPage from "@/components/EmptyPage";
import ProductDetails from "@/components/ProductDetails";
import GetUserLastVersion from "@/integration/last-v-user";


async function page({params}:{params:Params}) {
  let data = null;
  try {
     const result = await GetBook(params.id);
    //  @ts-ignore
    if(result?.data){
      data = result;
    }
  }
  catch(err) {
    console.error(err);
  }
  


  return (
    <div className="w-11/12 min-h-[100vh] flex justify-center mt-20 mx-auto">
      {
        data
        ?
        <ProductDetails data={data}/>
        :
        <EmptyPage/>
      }
    </div>
  );
}

export default page;
