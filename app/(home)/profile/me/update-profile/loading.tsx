import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

function loading() {
  return (
    <Skeleton className="absolute w-full  lg:relative lg:w-8/12  flex justify-center mt-10 border py-3 md:py-7 lg:py-10 rounded-md h-[300px] md:h-[600px]" />
  );
}

export default loading;
