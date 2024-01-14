"use client";
import React, { useEffect, useState } from "react";
import { Skeleton } from "./ui/skeleton";
import GetAllOrders from "@/integration/get-all-orders";
import OrderAdminItem from "./OrderAdminItem";
import PaginationAdmin from "./PaginationAdmin";
function AllOrdersAdminComp() {
  let [laoding, setLaoding] = useState(false);
  let [data, setData] = useState<any>(null);
  let [page, setPage] = useState(0);

  const Fetching = async () => {
    setLaoding(true);
    const responce = await GetAllOrders(page);
    if (responce) {
      setData(responce);
    }
    setLaoding(false);
    return;
  };

  useEffect(() => {
    Fetching();
  }, [page]);

  return (
    <div className="absolute lg:relative top-10  w-11/12 rounded-lg shadow-sm lg:px-5 px-2 py-4 flex justify-center flex-col gap-y-5">
      {data?.data?.length ? (
        <h1 className="text-lg lg:text-xl">Orders : {data.data.length}</h1>
      ) : null}
      {data && !laoding ? (
        <>
          {data?.data?.length != 0 ? (
            <>
              {data.data.map((ele: any) => (
                <OrderAdminItem data={ele} />
              ))}
            </>
          ) : null}
        </>
      ) : (
        <Skeleton className="w-full h-[300px]" />
      )}
      <div className="flex justify-center">
        {data?.pagination ? (
          <PaginationAdmin setPage={setPage} data={data.pagination} />
        ) : null}
      </div>
    </div>
  );
}

export default AllOrdersAdminComp;
