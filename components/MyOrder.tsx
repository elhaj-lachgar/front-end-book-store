"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { Separator } from "./ui/separator";
import GetUserOrders from "@/integration/get-user-orders";
import OrderItem from "./OrderItem";
import { Skeleton } from "./ui/skeleton";
function MyOrder() {
  let [data, setData] = useState<any>(null);
  let [laoding, setLaoding] = useState(false);

  const Fetching = async () => {
    setLaoding(true);
    const responce = await GetUserOrders();
    setData(responce);
    setLaoding(false);
  };
  useEffect(() => {
    Fetching();
  }, []);

  
  return (
    <div className="absolute w-full  lg:relative lg:w-8/12  flex justify-center mt-20 ">
      <div className="border w-11/12 rounded-lg shadow-sm lg:px-5 px-2 py-4 flex justify-center flex-col gap-y-5">
        <h1 className="text-xl lg:text-2xl text-muted-foreground font-semibold">
          Orders
        </h1>
        {!laoding && data ? (
          <>
            {data.data?.length != 0 ? (
              <>
                {data.data.map((ele: any) => (
                  <OrderItem data={ele} />
                ))}
              </>
            ) : null}
          </>
        ) : (
          <Skeleton className="w-full h-[300px]" />
        )}
      </div>
    </div>
  );
}

export default MyOrder;
