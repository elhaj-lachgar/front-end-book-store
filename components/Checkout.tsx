"use client";
import React, { useContext, useState } from "react";
import { Separator } from "./ui/separator";
import { Button } from "./ui/button";
import FormatPrice from "@/lib/FormatPrice";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Props } from "@/integration/set-card";
import { CardContext } from "@/context/CartContext";
import SetCard from "@/integration/set-card";
import { useToast } from "./ui/use-toast";
import { TUser } from "@/integration/sign";
import LaoderButton from "./LaoderButton";

function Checkout({
  totalePrice,
  currency,
}: {
  totalePrice: number;
  currency: "USD" | "MAD" | "EUR";
}) {
  const { card } = useContext(CardContext);
  const router = useRouter();
  const { toast } = useToast();
  let [laoding, setLoading] = useState(false);
  const handleClick = async () => {
    if (!window.localStorage.getItem("user")) {
      setLoading(false);
      router.push("/sign-in");
      return;
    }
    if (card.cardItems.length <= 0) {
      setLoading(false);
      toast({
        variant: "destructive",
        description: "card is empty",
      });
      return;
    }
    // @ts-ignore
    const user: TUser = JSON.parse(window.localStorage.getItem("user"));
    if (!user.card) {
      let arr: Props = card.cardItems.map((book) => {
        return {
          id: book._id,
          quantity: book.quantity,
        };
      });
      const res = await SetCard(arr);
      // @ts-ignore
      if (res.data) {
        setLoading(false);
        router.push("/order");
      } else {
        setLoading(false);
        toast({
          variant: "destructive",
          description: "same thing went wrong ",
        });
      }
    } else {
      setLoading(false);
      router.push("/order");
    }
  };
  return (
    <div className=" w-full lg:w-[300px] lg:h-[300px] flex flex-col p-3 border border-gray-400 gap-y-3 rounded-sm">
      <div className="flex w-full justify-between">
        <h1 className="text-muted-foreground ">Totale price : </h1>
        <span>{FormatPrice(totalePrice, currency)}</span>
      </div>
      <div className="flex w-full justify-between">
        <h1 className="text-muted-foreground ">Totale price : </h1>
        <span>{FormatPrice(0, currency)}</span>
      </div>
      <div className="flex w-full justify-between">
        <h1 className="text-muted-foreground ">Totale price : </h1>
        <span>{FormatPrice(0, currency)}</span>
      </div>
      <Separator />
      <div className="flex flex-col w-full gap-y-4">
        <div className="flex w-full justify-between ">
          <h1 className="text-xl font-bold ">Totale price : </h1>
          <span className="text-xl font-bold ">
            {FormatPrice(totalePrice, currency)}
          </span>
        </div>

        {laoding ? (
          <LaoderButton color="bg-green-500 hover:bg-green-600 focus:ring-green-400" />
        ) : (
          <Button
            className="bg-green-500 hover:bg-green-400 text-white hover:text-white w-full"
            onClick={() => {
              setLoading(true);
              handleClick();
            }}
          >
            Continue
          </Button>
        )}
        <Link href={"/"} className="w-full">
          <Button
            variant="outline"
            className=" text-green-500 hover:text-green-500 w-full"
          >
            Back To Shop
          </Button>
        </Link>
      </div>
    </div>
  );
}

export default Checkout;
