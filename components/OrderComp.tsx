"use client";
import { redirect } from "next/navigation";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useLayoutEffect } from "react";
import { useContext } from "react";
import { AddressContext } from "@/context/AddressContext";
import { CardContext } from "@/context/CartContext";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";
import FormatPrice from "@/lib/FormatPrice";
import { Separator } from "./ui/separator";
import Image from "next/image";
import Link from "next/link";
import GetCheckoutPage from "@/integration/get-checkout-page";
import { toast } from "./ui/use-toast";
import LaoderButton from "./LaoderButton";
function OrderComponent() {
  const { addresses } = useContext(AddressContext);
  const { card } = useContext(CardContext);
  let [checked, setChecked] = useState<null | string>(null);
  let [loading, setLoading] = useState<boolean>(false);

  const router = useRouter();

  const ContinueCheckout = async () => {
    if (checked == null || checked == "") return;
    const responce = await GetCheckoutPage(checked);
    if (!responce) {
      setLoading(false);
      toast({
        description: "same thing wrong",
        variant: "destructive",
        duration: 1000,
      });

      return;
    }
    if (responce?.url) {
      setLoading(false);
      const url = await responce.url;
      router.push(url);
    }
  };

  useLayoutEffect(() => {
    if (!window.localStorage.getItem("user")) redirect("/sign-in");
  }, []);
  return (
    <div className="flex flex-col lg:flex-row w-11/12 mx-auto lg:w-9/12 mt-10 gap-5">
      <div className="flex flex-col px-2 lg:px-5 py-4 border shadow rounded-md gap-y-4 lg:w-[60%]">
        <h1 className="text-xl md:text-2xl lg:text-3xl font-medium">
          Shopping information
        </h1>
        <div className="flex flex-wrap gap-3  h-full">
          {addresses.map((address) => (
            <div className="flex items-start w-[250px] gap-x-2 bg-blue-50 border px-2 py-3 h-[125px]">
              <input
                type="checkbox"
                className="w-6 h-6 rounded-[50%]"
                id={address.data._id}
                onClick={(e) => {
                  setChecked(e.currentTarget.id);
                }}
                checked={checked == address.data._id}
              />
              <div className="flex flex-col gap-y-2">
                <p className="font-semibold">{address.data.streat}</p>
                <p className="text-muted-foreground">{address.data.city}</p>
                <p className="text-muted-foreground">{address.data.country}</p>
              </div>
            </div>
          ))}
        </div>
        <Link href={"/profile/me"} className="w-full">
          <Button variant={"secondary"} className="border text-blue-600 w-full">
            + Add New Address
          </Button>
        </Link>
        <div className="w-full flex justify-end ">
          <div className="flex items-center gap-x-3">
            {loading ? (
              <LaoderButton color="bg-green-500 hover:bg-green-600 focus:ring-green-400"  />
            ) : (
              <Button
                className={cn(
                  checked
                    ? "bg-green-500 hover:bg-green-500 "
                    : "bg-green-300 cursor-not-allowed hover:bg-green-300 "
                )}
                onClick={() => {
                  setLoading(true);
                  ContinueCheckout();
                }}
              >
                {"Checkout"}
              </Button>
            )}
            <Link href={"/cart"}>
              <Button variant={"secondary"} className="border">
                Back
              </Button>
            </Link>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-y-4 border py-4 px-2 lg:px-5 text-muted-foreground rounded-md lg:w-[30%] shadow-md">
        <h2 className="text-gray-700">Summary</h2>
        <div className="flex flex-col gap-y-2 ">
          <div className="flex justify-between">
            <span>Ammount:</span>
            <span>{FormatPrice(card.totlePrice, "EUR")}</span>
          </div>
          <div className="flex justify-between">
            <span>Est Tax:</span>
            <span>{FormatPrice(0, "EUR")}</span>
          </div>
        </div>
        <Separator />
        <div className="flex justify-between">
          <span>Totale Price:</span>
          <span className="text-black font-medium">
            {FormatPrice(card.totlePrice, "EUR")}
          </span>
        </div>
        <Separator />
        <div className="flex flex-col gap-y-2">
          <h1>Cart Items</h1>
          {card.cardItems.map((book) => (
            <div className="flex gap-x-2 w-full">
              <div className="w-[75px] h-[75px] relative">
                <Image
                  src={book.image}
                  alt="book image"
                  fill
                  className="border"
                />
                <span className="w-5 h-5 absolute top-[-8px] right-[-8px] bg-gray-400 rounded-full text-white flex items-center justify-center">
                  {book.quantity}
                </span>
              </div>
              <div className="flex flex-col">
                <p>{book.title}</p>
                <p className="text-black font-bold">
                  {FormatPrice(book.price.value, book.price.currency)}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default OrderComponent;
