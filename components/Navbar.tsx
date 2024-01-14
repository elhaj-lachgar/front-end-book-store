"use client";
import React, { useContext, useEffect, useState } from "react";
import Logo from "./Logo";
import SearchHandler from "./SearchHandler";
import { Button } from "./ui/button";
import { ShoppingCart } from "lucide-react";
import { CardContext } from "@/context/CartContext";
import { AlignRight } from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { TUser as User } from "@/integration/sign";
import Image from "next/image";

function Navbar() {
  const { card } = useContext(CardContext);
  let [count, setCount] = useState(card.cardItems.length);
  let [active, setActive] = useState(false);
  let [user, setUser] = useState<null | User>(null);

  useEffect(() => {
    setCount(card.cardItems.length);
  }, [card.cardItems.length]);

  useEffect(() => {
    if (window.localStorage.getItem("user")) {
      // @ts-ignore
      let data: User = window.localStorage.getItem("user");
      setUser(data);
    }
  }, []);
  return (
    <nav className="sticky top-0 flex justify-between lg:items-center px-2 lg:px-5 py-2 border border-gray-300 lg:flex-row flex-col gap-y-4 z-30 bg-gray-50 ">
      <div className="w-full flex justify-between lg:w-[200px]">
        <Link href={"/"}>
          <Logo />
        </Link>
        <div className="lg:hidden">
          <AlignRight onClick={() => setActive(!active)} />
        </div>
      </div>
      <SearchHandler value={active} />
      <div
        className={cn(
          active
            ? "flex flex-row gap-x-4 items-center"
            : "hidden lg:flex flex-row gap-x-4 items-center "
        )}
      >
        {user ? (
          <Link href={"/profile/me"}>
            <div className="relative rounded-full w-[50px] h-[50px]">
              <Image
                // @ts-ignore
                src={
                  // @ts-ignore
                  JSON.parse(window.localStorage.getItem("user"))?.profile ||
                  "/avtar.png"
                }
                alt="avatar"
                fill
                className="rounded-full"
              />
            </div>
          </Link>
        ) : null}
        <Link href={"/cart"}>
          <Button className="bg-gray-100 hover:bg-gray-50 flex text-gray-500">
            <ShoppingCart color="gray" /> ({count})
          </Button>
        </Link>
        {!user ? (
          <Link href={"/sign-in"}>
            <Button
              variant="outline"
              className="text-red-500 hover:text-red-500"
            >
              Sign In
            </Button>
          </Link>
        ) : null}
      </div>
    </nav>
  );
}

export default Navbar;
