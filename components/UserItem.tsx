"use client";
import { TUser } from "@/integration/sign";
import Image from "next/image";
import React, { useState } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import LaoderButton from "./LaoderButton";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";
import UpadteUserRole from "@/integration/update-user-role";
import { toast } from "./ui/use-toast";

function UserItem({ data }: { data: TUser }) {
  let [role, setRole] = useState<null | string>(null);
  let [loading, setLoading] = useState(false);

  const RoleHandler = async () => {
    if (!role) return;

    const res = await UpadteUserRole(data._id, role);

    if (res) {
      toast({
        description: "update role is seccuss",
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
    <div className="px-2 lg:px-4 flex py-3 justify-between items-center border gap-x-4 md:gap-x-1 lg:gap-x-0 rounded-md">
      <div className="flex gap-x-2 items-center">
        <div className="w-[75px] h-[75px] relative">
          <Image
            src={data.profile || "/avtar.png"}
            alt="book image"
            fill
            className="rounded-full"
          />
        </div>
        <div className="flex flex-col gap-y-1">
          <p className="text-muted-foreground font-medium">{data.name}</p>
          <p className="text-muted-foreground font-medium md:hidden">
            {(data.email as string).substring(0, 10) + "..."}
          </p>
          <p className="text-muted-foreground font-medium hidden md:block">
            {data.email}
          </p>
        </div>
      </div>
      <div className="flex flex-col gap-x-2">
        <Select onValueChange={(e) => setRole(e)}>
          <SelectTrigger className="w-full h-8">
            <SelectValue placeholder={data.role} />
          </SelectTrigger>
          <SelectContent className="z-50">
            <SelectGroup>
              <SelectItem value={data.role == "user" ? "admin" : "user"}>
                {data.role == "user" ? "admin" : "user"}
              </SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
        {loading ? (
          <LaoderButton />
        ) : (
          <Button
            size={"sm"}
            className={cn(
              "mt-3 w-[60px] md:w-full",
              role
                ? "bg-blue-500 hover:bg-blue-500 text-white"
                : "bg-blue-300 hover:bg-blue-300 text-white cursor-not-allowed"
            )}
            onClick={()=>{
              setLoading(true);
              RoleHandler();
            }}
          >
            Save
          </Button>
        )}
      </div>
    </div>
  );
}

export default UserItem;
