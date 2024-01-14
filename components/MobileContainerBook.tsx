"use client";
import React, { useContext } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import FormatPrice from "@/lib/FormatPrice";
import { Button } from "./ui/button";
import Link from "next/link";
import { CardContext, TProductInfo } from "@/context/CartContext";

function MobileContainerBook({
  _id,
  title,
  image,
  price,
}: {
  _id: string;
  title: string;
  image: string;
  price: { value: number; currency: "USD" | "EUR" | "MAD" };
}) {
  const { addToCard } = useContext(CardContext);
  const addCardHandler = () => {
    const objCard: TProductInfo = {
      _id: _id,
      image: image,
      price: price,
      quantity: 1,
      title: title,
    };

    addToCard(objCard);
  };
  return (
    <Card className="w-[300px] h-[300px] flex justify-center flex-col">
      <CardHeader>
        <CardTitle>{title.substring(0, 10) + "..."}</CardTitle>
      </CardHeader>
      <CardContent>
        <Link href={`/products/${_id}`}>
          <div className="relative w-[150px] mx-auto h-[150px]">
            <Image src={image} alt="book image" fill />
          </div>
        </Link>
      </CardContent>
      <CardFooter className="flex justify-between items-center">
        <p>{FormatPrice(price.value, price.currency)}</p>
        <Button
          className="bg-blue-500 text-white"
          size={"sm"}
          onClick={addCardHandler}
        >
          Add to Card
        </Button>
      </CardFooter>
    </Card>
  );
}

export default MobileContainerBook;
