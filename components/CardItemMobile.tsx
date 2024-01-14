"use client"
import React , {useContext} from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { TProductInfo } from "@/context/CartContext";
import Image from "next/image";
import FormatPrice from "@/lib/FormatPrice";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { CardContext } from "@/context/CartContext";

function CardItemMobile({ _id, image, price, quantity, title }: TProductInfo) {

  const {setQuantity , deleteToCard } = useContext(CardContext)
  return (
    <Card className="w-[300px] h-[300px] flex justify-center flex-col">
      <CardHeader>
        <CardTitle>{title.substring(0, 10) + "..."}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="relative w-[150px] mx-auto h-[150px]">
          <Image src={image} alt="book image" fill />
        </div>
      </CardContent>
      <CardFooter>
        <div className="w-full px-1 flex  justify-between items-center">
          <p>{FormatPrice(price.value * quantity , price.currency)}</p>
          <Badge className="bg-gray-500 h-[20px]  w-[80px]">
            <Button
              className="bg-gray-500 space-x-2 h-[20px]"
              onClick={() => {
                setQuantity(1, _id);
              }}
            >
              +
            </Button>
            {quantity}
            <Button
              className="bg-gray-500 space-x-2 h-[20px]"
              onClick={() => {
                setQuantity(-1, _id);
              }}
            >
              -
            </Button>
          </Badge>
          <Button
            size={"sm"}
            variant={"outline"}
            className="text-red-500 hover:text-red-500 ml-2"
            onClick={()=>deleteToCard(_id)}
          >
            Remove
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}

export default CardItemMobile;
