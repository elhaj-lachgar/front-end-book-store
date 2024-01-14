"use client";
import React, { useState } from "react";
import { Separator } from "./ui/separator";
import Image from "next/image";
import FormatPrice from "@/lib/FormatPrice";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import {
  resolvers,
  TUpdateStatusParameters,
} from "@/validator/update-status-validator";
import { useForm } from "react-hook-form";
import { cn } from "@/lib/utils";
import LaoderButton from "./LaoderButton";
import UpdateStatusBook from "@/integration/update-status-book";
import { toast } from "./ui/use-toast";
import DeleteOrder from "@/integration/delete-orders";

function OrderAdminItem({ data }: { data: any }) {
  const {
    formState: { errors },
    handleSubmit,
    register,
  } = useForm<TUpdateStatusParameters>({
    resolver: resolvers,
  });

  let [checked, setChecked] = useState<null | string>(null);
  let [laoding, setLoading] = useState(false);
  let [error, setError] = useState<string | null>(null);

  const HandleDelete = async () => {
    const responce = await DeleteOrder(data._id);
    if (responce) {
      toast({
        description: "delete is seccuss",
        duration: 3000,
      });
      window.location.reload();
      return;
    }
    toast({
      variant: "destructive",
      description: "same thing is worng ",
      duration: 3000,
    });
  };

  const Submit = async (params: TUpdateStatusParameters) => {
    if (!checked) {
      setError("Please select isDelaiverd");
      return;
    }

    // @ts-ignore
    const responce = await UpdateStatusBook(params.date, data._id);
    if (responce?.data) {
      toast({
        description: "update is seccuss",
        duration: 3000,
      });
      window.location.reload();
      return;
    }
    toast({
      variant: "destructive",
      description: "same thing is worng ",
      duration: 3000,
    });
  };

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
      {data?.DelaiveredAt ? (
        <>
          <Separator />
          <div className="flex mt-3 justify-center">
            <Button variant={"destructive"} onClick={HandleDelete}>Delete</Button>
          </div>
        </>
      ) : (
        <>
          <Separator />
          <form
            className="flex-col w-full gap-x-3 h-full"
            onSubmit={handleSubmit(Submit)}
          >
            <div className="flex justify-between items-center">
              <Input
                type="date"
                {...register("date")}
                className={cn(
                  "w-[50%]",
                  errors.date
                    ? "focus:border-red-400 border"
                    : "focus:border-green-400"
                )}
              />
              <div className="flex gap-x-1 md:gap-x-2 items-center">
                <Input
                  type="checkbox"
                  checked={checked == "checked"}
                  onClick={() => setChecked("checked")}
                />
                <label>isDelaivered</label>
              </div>
            </div>
            {errors.date ? (
              <p className="text-xs italic text-red-500 w-[100px]">
                {errors.date.message}
              </p>
            ) : null}
            {laoding ? (
              <LaoderButton color="mt-3" />
            ) : (
              <Button
                size={"sm"}
                className={cn(
                  "mt-3",
                  checked
                    ? "bg-blue-500 hover:bg-blue-500 text-white"
                    : "bg-blue-400 hover:bg-blue-400 text-white cursor-not-allowed"
                )}
              >
                Update
              </Button>
            )}
          </form>
        </>
      )}
    </div>
  );
}

export default OrderAdminItem;
