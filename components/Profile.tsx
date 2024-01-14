"use client";
import React, { useContext, useEffect, useLayoutEffect, useState } from "react";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";
import { useRouter, useSearchParams } from 'next/navigation';
import { TUser } from "@/integration/sign";
import { redirect } from "next/navigation";
import ModuleAddAddress from "./ModuleAddAddress";
import AddressItems from "./AddressItems";
import { Skeleton } from "./ui/skeleton";
import { toast } from "./ui/use-toast";
import ClearCard from "@/integration/clear-card";
import { CardContext } from "@/context/CartContext";


function Profile() {
  let [user, setUser] = useState<TUser | null>(null);
  const {reload} = useContext(CardContext)
  const searchParams = useSearchParams();
  const payement = searchParams.get('payement');
  const router = useRouter()

  const checkPayement = async  ( ) => {
    if(payement == "success"){
      toast({
        description : "order is compeleted",
        duration : 3000 ,
        className : "bg-green-500 text-white"
      });
      window.localStorage.removeItem("card");
      // @ts-ignore
      const user :TUser = JSON.parse(window.localStorage.getItem("user"));
      // @ts-ignore
      const responce = await ClearCard(user.card);
      router.push("/profile/me")
      reload();
    }
  }
  useLayoutEffect(() => {
    if (!window.localStorage.getItem("user")) redirect("/");
    // @ts-ignore
    const user: TUser = JSON.parse(window.localStorage.getItem("user"));
    setUser(user);
  }, []);

  useEffect(() =>{
    checkPayement();
  },[])
  return (
    <div className="absolute w-full  lg:relative lg:w-8/12  flex justify-center mt-20 ">
      <div className="w-11/12 flex flex-col px-3 py-4 border rounded-md gap-y-3 shadow-md">
        {user ? (
          <div className="flex flex-col lg:flex-row  gap-x-3 lg:items-center  ">
            <div className="relative rounded-full w-[50px] h-[50px]">
              <Image
                //@ts-ignore
                src={user?.profile || "/avtar.png"}
                alt="avatar"
                fill
                className="rounded-full border"
              />
            </div>
            <div className="flex flex-col">
              <h1 className="font-semibold">{user?.name}</h1>
              <div className=" flex flex-col lg:flex-row gap-x-2 lg:items-end w-full  ">
                <h1 className="font-semibold">
                  Email :
                  <span className="text-muted-foreground">{user?.email}</span>
                </h1>
                <h1 className="hidden lg:block">{"|"}</h1>
                <h1 className="font-semibold">
                  Joined on :
                  <span className="text-muted-foreground">
                    {
                      // @ts-ignore
                      new Date(user?.createdAt).getUTCFullYear() +
                        "-" +
                        new Date(user?.createdAt).getUTCMonth() +
                        1 +
                        "-" +
                        new Date(user?.createdAt).getDay()
                    }
                  </span>
                </h1>
              </div>
            </div>
          </div>
        ) : (
          < div className="flex flex-col lg:flex-row  gap-x-3 lg:items-center  ">
            <Skeleton className="relative rounded-full w-[50px] h-[50px]"/>
            <Skeleton className="flex flex-col w-[50%] h-[80%]"/>
          </div>
        )}
        <Separator />
        <AddressItems />
        <Separator />
        <ModuleAddAddress />
      </div>
    </div>
  );
}

export default Profile;
