"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { useForm } from "react-hook-form";
import {
  resolvers,
  TChangePasswordProps,
} from "@/validator/change-password-validator";
import { cn } from "@/lib/utils";
import ChangePassword from "@/integration/change-password";
import { useToast } from "./ui/use-toast";
import LaoderButton from "./LaoderButton";
import { useRouter } from "next/navigation";

function ChangePasswordComp() {
  let [laoding, setlaoding] = useState(false);
  const { toast } = useToast();
  const router = useRouter();
  const {
    handleSubmit,
    formState: { errors },
    register,
  } = useForm<TChangePasswordProps>({
    resolver: resolvers,
  });
  let [status, setStatus] = useState(false);
  let [newstatus, setNewStatus] = useState(false);
  let [confirmedstatus, setConfirmedStatus] = useState(false);
  let [error, setError] = useState<null | string>(null);

  const Submit = async (data: TChangePasswordProps) => {
    setlaoding(true);
    if (data.newpassword != data.confirmpassword) {
      setError("password not matshed");
      return;
    }
    const res = await ChangePassword(
      data.currentpassword,
      data.newpassword,
      data.confirmpassword
    );

    // @ts-ignore
    if (res == null) {
      setlaoding(false);
      toast({
        variant: "destructive",
        description: "current password is incorrect",
      });
      return;
    }

    //@ts-ignore
    if (res.message) {
      setlaoding(false);
      toast({
        // @ts-ignore
        description: res.message,
        className: "bg-green-500 text-white",
      });
      window.localStorage.removeItem("user");
      window.localStorage.removeItem("token");
      router.push("/sign-in");
    }

    return;
  };

  return (
    <div className="absolute w-full  lg:relative lg:w-8/12  flex justify-center mt-10 border py-3 md:py-7 lg:py-10 rounded-md">
      <form
        className="w-11/12 md:w-9/12 lg:w-7/12 flex flex-col gap-y-5"
        onSubmit={handleSubmit(Submit)}
      >
        <h1 className="font-bold">Update Password</h1>
        <div className="relative flex-col gap-y-1">
          <label>current password</label>
          <Input
            type={status ? "text" : "password"}
            {...register("currentpassword")}
            className={cn(
              errors.currentpassword
                ? "focus:border-red-400 border"
                : "focus:border-green-400"
            )}
          />
          <div
            className={cn(
              !errors.currentpassword
                ? "absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5 top-1/3"
                : "absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5 top-[5px]"
            )}
          >
            <EyeOff
              className={status ? "block" : "hidden"}
              onClick={() => setStatus(!status)}
            />
            <Eye
              className={status ? "hidden" : "block"}
              onClick={() => setStatus(!status)}
            />
          </div>
          {errors.currentpassword ? (
            <p className="text-xs italic text-red-500">
              {errors.currentpassword.message}
            </p>
          ) : null}
        </div>
        <div className="relative flex-col gap-y-1">
          <label>new password</label>
          <Input
            type={newstatus ? "text" : "password"}
            {...register("newpassword")}
            className={cn(
              errors.newpassword
                ? "focus:border-red-400 border"
                : "focus:border-green-400"
            )}
          />
          <div
            className={cn(
              !errors.newpassword
                ? "absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5 top-1/3"
                : "absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5 top-[5px]"
            )}
          >
            <EyeOff
              className={newstatus ? "block" : "hidden"}
              onClick={() => setNewStatus(!newstatus)}
            />
            <Eye
              className={newstatus ? "hidden" : "block"}
              onClick={() => setNewStatus(!newstatus)}
            />
          </div>
          {errors.newpassword ? (
            <p className="text-xs italic text-red-500">
              {errors.newpassword.message}
            </p>
          ) : null}
        </div>
        <div className="relative flex-col gap-y-1">
          <label>confirm password</label>
          <Input
            type={confirmedstatus ? "text" : "password"}
            {...register("confirmpassword")}
            className={cn(
              errors.confirmpassword
                ? "focus:border-red-400 border"
                : "focus:border-green-400"
            )}
          />
          <div
            className={cn(
              !errors.confirmpassword
                ? "absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5 top-1/3"
                : "absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5 top-[-10px]"
            )}
          >
            <EyeOff
              className={confirmedstatus ? "block" : "hidden"}
              onClick={() => setConfirmedStatus(!confirmedstatus)}
            />
            <Eye
              className={confirmedstatus ? "hidden" : "block"}
              onClick={() => setConfirmedStatus(!confirmedstatus)}
            />
          </div>
          {error ? (
            <p className="text-xs italic text-red-500">{error}</p>
          ) : null}
        </div>
        {laoding ? (
          <LaoderButton />
        ) : (
          <Button className="bg-blue-500 hover:bg-blue-400 text-white">
            Update Password
          </Button>
        )}
      </form>
    </div>
  );
}

export default ChangePasswordComp;
