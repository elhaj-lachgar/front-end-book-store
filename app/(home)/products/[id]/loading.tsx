import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

function Laoding() {
  return (
    <div className="w-full h-full flex flex-wrap px-3 py-5 lg:gap-x-2 gap-y-5 justify-center ">
      <div className="w-full lg:w-[40%] flex lg:justify-center  flex-col gap-y-3">
      <Skeleton className=" w-[300px] h-[300px]  border border-gray-400  lg:mx-auto "/>
      </div>
      <Skeleton className="w-full lg:w-[45%] flex flex-col gap-y-4"/>
    </div>
  )
}

export default Laoding
