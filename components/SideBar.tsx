"use client";
import React, { useLayoutEffect, useState } from "react";
import AdminSideBar from "./AdminSideBar";
import { Separator } from "./ui/separator";
import UserSideBar from "./UserSideBar";
import { MoveRight } from "lucide-react";
import { MoveLeft } from "lucide-react";
import { cn } from "@/lib/utils";
import { TUser } from "@/integration/sign";
import { redirect } from "next/navigation";

function SideBar() {
  let [click, setClick] = useState(false);
  let [user, setUser] = useState<null | TUser>(null);
  useLayoutEffect(() => {
    if (!window.localStorage.getItem("user")) redirect("/");
    // @ts-ignore
    const user: TUser = JSON.parse(window.localStorage.getItem("user"));
    setUser(user);
  }, []);

  return (
    <div className="flex ">
      <div
        className={cn(
          click
            ? "absolute top-[5%] lg:w-[250px] lg:relative lg:flex flex-col  gap-y-4 border-r border-gray-200 justify-center lg:justify-start lg:px-2 mt-10 py-3 z-20 bg-gray-200"
            : "hidden lg:w-[250px] lg:flex flex-col  gap-y-4 border-r border-gray-200 sticky top-0 justify-center lg:justify-start lg:px-2 mt-10 py-3 z-20"
        )}
      >
        {user?.role == "admin" ? (
          <>
            <AdminSideBar />
            <div className="w-full px-5">
              <Separator className="bg-gray-500 lg:bg-gray-200" />
            </div>
          </>
        ) : null}
        <UserSideBar />
      </div>
      <div className="h-[20px] lg:hidden">
        {click ? (
          <MoveLeft
            className="z-100 absolute left-1 cursor-pointer "
            onClick={() => setClick(!click)}
          />
        ) : (
          <MoveRight
            className="z-100 absolute left-1 cursor-pointer "
            onClick={() => setClick(!click)}
          />
        )}
      </div>
    </div>
  );
}

export default SideBar;
