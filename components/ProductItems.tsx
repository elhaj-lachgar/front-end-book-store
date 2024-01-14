"use client";
import { TBook } from "@/context/BookContext";
import FormatPrice from "@/lib/FormatPrice";
import Image from "next/image";
import React from "react";
import { Button } from "./ui/button";
import DeleteBook from "@/integration/delete-book";
import { toast } from "./ui/use-toast";
import { useState } from "react";
import LaoderButton from "./LaoderButton";

function ProductItems({ data }: { data: TBook }) {
  let [loading, setLoading] = useState(false);
  const DeleteHandler = async () => {
    const responce = await DeleteBook(data._id);
    if (responce) {
      setLoading(false);
      toast({
        description: responce.success,
        className: "bg-green-500 text-white",
      });
      window.location.reload();
      return;
    } else {
      setLoading(false);
      toast({
        description: "same thing gose wrong",
        variant: "destructive",
      });
      return;
    }
  };
  return (
    <div className="px-2 lg:px-4 flex py-3 justify-between items-center border gap-x-4 md:gap-x-1 lg:gap-x-0">
      <div className="flex gap-x-2 items-center">
        <div className="w-[75px] h-[75px] relative">
          <Image
            src={data.image || "/book.avif"}
            alt="book image"
            fill
            className="rounded-full"
          />
        </div>
        <div className="flex flex-col gap-y-1">
          <p className="text-muted-foreground font-medium">{data.title}</p>
          <p className="flex gap-x-2 font-normal">rating:{data.rating}</p>
        </div>
      </div>
      <div className="hidden md:block">
        {data.description.substring(0, 50) + "..."}
      </div>

      <div className="flex flex-col gap-y-2">
        <p className="font-bold">
          {FormatPrice(data.price.value, data.price.currency)}
        </p>
        {loading ? (
          <LaoderButton color="bg-white hover:bg-white text-red-500 hover:text-red-500" />
        ) : (
          <Button
            variant="outline"
            className="text-red-500"
            onClick={() => {
              setLoading(true);
              DeleteHandler();
            }}
          >
            remove
          </Button>
        )}
      </div>
    </div>
  );
}

export default ProductItems;
