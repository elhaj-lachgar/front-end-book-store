import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

function loading() {
  return (
    <div className="flex w-11/12 flex-wrap lg:gap-x-[20px]  min-h-[120vh] lg:px-20 mt-10 lg:w-full mx-auto">
      <Skeleton className="  hidden lg:flex flex-wrap   lg:w-[20%] sticky top-[100px] border border-gray-300 h-[600px] gap-y-5 rounded-sm " />
      <div className="hidden md:flex md:flex-col md:gap-y-5  w-[70%]">
        <Skeleton className="flex w-full  border border-gray-300 gap-x-4 justify-between pr-4 rounded-sm h-[200px] " />
        <Skeleton className="flex w-full  border border-gray-300 gap-x-4 justify-between pr-4 rounded-sm h-[200px] " />
        <Skeleton className="flex w-full  border border-gray-300 gap-x-4 justify-between pr-4 rounded-sm h-[200px] " />
      </div>
      <div className="flex flex-wrap justify-center gap-3 w-full md:hidden">
        <Skeleton className="w-[300px] h-[300px] flex justify-center flex-col" />
        <Skeleton className="w-[300px] h-[300px] flex justify-center flex-col" />
        <Skeleton className="w-[300px] h-[300px] flex justify-center flex-col" />
        <Skeleton className="w-[300px] h-[300px] flex justify-center flex-col" />
      </div>
    </div>
  );
}

export default loading;
