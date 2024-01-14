"use client";
import React from "react";
import { Separator } from "./ui/separator";
import Image from "next/image";
import FormatPrice from "@/lib/FormatPrice";

function OrderItem({ data }: { data: any }) {
  return (
    <div className="w-11/12 border border-gray-400  flex flex-col px-2 lg:px-5 py-4 gap-y-3">
      <div className="flex flex-col gap-y-1">
        <div className="flex lg:gap-x-4 items-center">
          <p>Order ID :</p>
          <p className="text-red-400 lg:text-lg">
            {(data._id as string).substring(0, 15) + "..."}
          </p>
        </div>
        {data.isDelaivered ? (
          <p className="text-green-500">Delaiverd</p>
        ) : (
          <p className="text-red-500">Procesing</p>
        )}
        <p className="lg:text-lg text-muted-foreground">
          {(data.createdAt as string).split("T")[0]}
        </p>
      </div>
      <div className="flex flex-col lg:flex-row lg:gap-x-2 lg:justify-between mb-2 ">
        <div className="flex flex-col gap-y-2">
          <h1 className="font-medium text-muted-foreground">Address</h1>
          <div className="flex flex-col">
            <p>{data.address.city}</p>
            <p>{data.address.country}</p>
            <p>{data.address.streat}</p>
          </div>
        </div>
      </div>
      <Separator />
      <div className="flex flex-wrap gap-14 justify-center">
        {data.cardItems.map((book: any) => (
          <div className="flex gap-x-2 items-center">
            <div className="relative w-[75px] h-[75px]">
              <Image
                src={book.book.image || "/book.avif"}
                alt="book"
                fill
                className="border"
              />
            </div>
            <div className="flex flex-col justify-between">
              <h1>{book.book.title}</h1>
              <h1>{book.book.category.name}</h1>
              <h1 className="font-medium">
                {FormatPrice(book.book.price.value, book.book.price.currency)}
              </h1>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default OrderItem;
