"use client";
import React, { useContext } from "react";
import { USER_SIDEBAR_ITEMS } from "@/lib/SideBarItems";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "./ui/button";
import { CardContext } from "@/context/CartContext";

function UserSideBar() {
  const router = useRouter();
  const {reload} = useContext(CardContext)
  const LogOutHandler = () => {
    window.localStorage.removeItem("user");
    window.localStorage.removeItem("token");
    reload()
    router.push("/");
  };
  return (
    <div className="flex flex-col px-5 gap-y-3">
      {USER_SIDEBAR_ITEMS.map((ele) => (
        <Link
          href={ele.link}
          className="flex  w-full  hover:bg-blue-200 h-[30px] items-center px-2 cursor-pointer rounded-lg"
          key={ele.value}
        >
          <h1 className="text-muted-foreground font-semibold">{ele.value}</h1>
        </Link>
      ))}
        <Button variant={"outline"} onClick={() =>{LogOutHandler()}} className="text-red-500 hover:text-red-500 justify-start"> Log Out </Button>
    </div>
  );
}

export default UserSideBar;
