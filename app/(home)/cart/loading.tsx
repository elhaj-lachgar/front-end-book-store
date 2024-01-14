import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

function loading() {
  return (
    <div className="w-full lg:w-9/12 min-h-[100vh] h-full mx-auto mt-20">
      <div className="flex flex-col md:flex-row gap-x-10 gap-y-5">
        <Skeleton className=" hidden lg:flex flex-col p-3 border border-gray-400 lg:w-[65%] gap-y-3 w-full h-[300px]" />
        <Skeleton className=" w-full lg:w-[250px] lg:h-[300px] flex flex-col p-3 border border-gray-400 gap-y-3 rounded-sm" />
      </div>
    </div>
  );
}

export default loading;
