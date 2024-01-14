"use client";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import { resolvers, TUpdateProps } from "@/validator/update-profile-validator";
import { useForm } from "react-hook-form";
import { cn } from "@/lib/utils";
import UpdateProfile from "@/integration/update-profile";
import { useToast } from "./ui/use-toast";
import { TUser } from "@/integration/sign";
import { Skeleton } from "./ui/skeleton";
import LaoderButton from "./LaoderButton";
import Laoding from "@/app/(home)/products/[id]/loading";

function UpdateProfileComp() {
  let [user, setUser] = useState<TUser | null>(null);
  let [laoding, setlaoding] = useState(false);
  const { toast } = useToast();
  const {
    formState: { errors },
    handleSubmit,
    register,
  } = useForm<TUpdateProps>({
    resolver: resolvers,
  });

  let [profile, setProfile] = useState<FileList | null>(null);

  const Submit = async (data: TUpdateProps) => {
    setlaoding(true);
    //@ts-ignore
    if (data.email == user.email && data.name == user.name && profile == null)
      return;
    if (data.email == user?.email || data.email == "") data.email = undefined;
    if (data.name == user?.name || data.name == "") data.name = undefined;

    if (data.email == undefined && data.name == undefined && profile == null)
      return;

    const res = await UpdateProfile(data, profile);
    if (res == null) {
      setlaoding(false);
      toast({
        description: "same thing gose wrong",
        variant: "destructive",
      });
      return;
    }
    setlaoding(false);
    toast({
      description: "update profile successfully",
      className: "bg-green-500 text-white",
    });
  };

  useEffect(() => {
    // @ts-ignore
    const user: TUser = JSON.parse(window.localStorage.getItem("user"));
    setUser(user);
  }, []);

  return (
    <div className="w-full flex border justify-center items-center rounded-lg mt-10 px-2 py-4 md:min-h-[60vh] lg:min-h-[80vh] mr-10">
      {user ? (
        <form
          className="w-11/12 md:w-9/12 lg:w-7/12 flex flex-col gap-y-5"
          onSubmit={handleSubmit(Submit)}
        >
          <h1 className="font-bold">Update Profile</h1>
          <div className="flex-col gap-y-1">
            <label className="font-medium">Name</label>
            <Input
              defaultValue={user.name}
              {...register("name")}
              className={cn(
                errors.name
                  ? "focus:border-red-400 border"
                  : "focus:border-green-400"
              )}
            />
          </div>
          <div className="flex-col gap-y-1">
            <label className="font-medium">Email</label>
            <Input
              // @ts-ignore
              defaultValue={user.email}
              {...register("email")}
              className={cn(
                errors.email
                  ? "focus:border-red-400 border"
                  : "focus:border-green-400"
              )}
            />
            {errors.email ? (
              <p className="text-xs italic text-red-500">
                {errors.email.message}
              </p>
            ) : null}
          </div>
          <div className="flex-col gap-y-1">
            <label className="font-medium">Avatar</label>
            <div className="flex justify-between w-full items-center">
              <div className="relative rounded-full w-[50px] h-[50px]">
                <Image
                  src={user.profile || "/avtar.png"}
                  alt="avatar"
                  fill
                  className="rounded-full border"
                />
              </div>
              <Input
                type="file"
                onChange={(e) => setProfile(e.target.files)}
                className="w-[75%]"
              />
            </div>
          </div>
          {laoding ? (
            <LaoderButton />
          ) : (
            <Button className="bg-blue-500 hover:bg-blue-400 text-white">
              Update
            </Button>
          )}
        </form>
      ) : (
        <div className="w-11/12 md:w-9/12 lg:w-7/12 flex flex-col gap-y-5">
          <Skeleton className="w-[200px] h-[20px]" />
          <Skeleton className=" w-full h-[50px]" />
          <Skeleton className=" w-full h-[50px]" />
          <div className="flex-col gap-y-3 w-full">
            <Skeleton className="w-[75px] h-[15px]" />
            <div className="flex justify-between w-full items-center gap-x-2 ">
              <Skeleton className="relative rounded-full w-[50px] h-[50px]" />
              <Skeleton className="flex-col gap-y-1 h-[40px] w-[80%]" />
            </div>
          </div>
          <Skeleton className=" w-full h-[50px]" />
        </div>
      )}
    </div>
  );
}

export default UpdateProfileComp;
