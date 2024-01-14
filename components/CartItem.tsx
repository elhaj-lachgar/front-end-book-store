"use client";
import Image from "next/image";
import React, { useContext } from "react";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { CardContext, TProductInfo } from "@/context/CartContext";
import { Separator } from "./ui/separator";
import FormatPrice from "@/lib/FormatPrice";

function CartItem({ image, title, quantity, price, _id }: TProductInfo) {
  const {setQuantity , deleteToCard } = useContext(CardContext);
  return (
    <>
    <div className="flex flex-row w-full items-center gap-y-2 sm:justify-between  gap-x-4">
      <div className="flex flex-row  gap-x-5">
        <div className="relative w-[80px] h-[60px]">
          <Image src={image} alt="book image" fill />
        </div>
        <div className="  lg:flex lg:flex-col lg:gap-y-2 w-[100px] ">
          <h1 className="font-bold ">{title.substring(0,10)+"..."}</h1>
          <p className="text-muted-foreground flex gap-x-2">
            Seller : <span>Uber</span>
          </p>
        </div>
      </div>
      <div className="flex flex-row gap-x-5 items-center w-[300px]">
        <Badge className="bg-gray-500 h-[20px] ">
          <Button className="bg-gray-500 space-x-2 h-[20px]" onClick={()=>{setQuantity(1 , _id)}}>+</Button>
          {quantity}
          <Button className="bg-gray-500 space-x-2 h-[20px]"onClick={()=>{setQuantity(-1,_id)}}>-</Button>
        </Badge>
        <div className="hidden lg:flex flex-col gap-y-2">
          <span className="font-bold">
           {FormatPrice(price.value * quantity , price.currency)}
          </span>
          <span className="text-muted-foreground">
          {FormatPrice(price.value, price.currency)}/per item
          </span>
        </div>
      </div>
      <Button variant={"outline"} className="text-red-500 hover:text-red-500" onClick={()=>deleteToCard(_id)}>
        Remove
      </Button>
    </div>
      <Separator/>
    </>
  );
}

export default CartItem;
