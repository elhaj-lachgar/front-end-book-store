"use client";
import React, { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { TSingInProp, resolvers } from "@/validator/sign-in-validator";
import { useForm } from "react-hook-form";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import Link from "next/link";
import SignInHandler, { User } from "@/integration/sign";
import { useToast } from "@/components/ui/use-toast";
import { Eye, EyeOff } from "lucide-react";
import { useRouter } from "next/navigation";
import Laoding from "@/app/(home)/products/[id]/loading";
import SpinnerLoading from "./Loader";
import LaoderButton from "./LaoderButton";

function SignIn() {
  let [status, setStatus] = useState(false);
  const { toast } = useToast();
  let [loading, setLoading] = useState(false);
  const router = useRouter();
  useEffect(() => {
    if (window.localStorage.getItem("token")) router.push("/");
  }, []);
  const {
    formState: { errors },
    handleSubmit,
    register,
  } = useForm<TSingInProp>({
    resolver: resolvers,
  });
  const Submit = async (data: TSingInProp) => {
    setLoading(true);
    const res = await SignInHandler(data.email, data.password);
    //@ts-ignore
    if (res.data) {
      // @ts-ignore
      const data: User = res;
      window.localStorage.setItem("token", data.token);
      window.localStorage.setItem("user", JSON.stringify(data.data));
      setLoading(false);
      router.back();
    } else {
      setLoading(false);
      toast({
        // @ts-ignore
        description: res.err || res.message,
        variant: "destructive",
        duration: 1000,
      });
    }
  };
  return (
    <div className=" w-11/12 lg:w-[400px] flex flex-col px-2 lg:px-5 gap-y-3 border rounded-xl py-4 bg-white">
      <h1 className="text-2xl  font-black text-center w-full">Log In</h1>
      <form className="flex flex-col gap-y-3" onSubmit={handleSubmit(Submit)}>
        <div className=" gap-y-2 flex-col">
          <label className="text-muted-foreground font-bold">Email</label>
          <Input
            type="text"
            {...register("email")}
            className={cn(
              errors.email
                ? "focus:border-red-400 border"
                : "focus:border-green-400"
            )}
          />
          {errors.email ? (
            <p className="text-red-400">{errors.email.message}</p>
          ) : null}
        </div>
        <div className="relative gap-y-2 flex-col">
          <label className=" relative text-muted-foreground font-bold">
            Password
          </label>
          <Input
            type={status ? "text" : "password"}
            {...register("password")}
            className={cn(
              errors.password
                ? "focus:border-red-400 border"
                : "focus:border-green-400"
            )}
          />
          <div
            className={cn(
              !errors.password
                ? "absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5 top-1/3"
                : "absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5 top-[-25px]"
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
          {errors.password ? (
            <p className="text-red-400">{errors.password.message}</p>
          ) : null}
        </div>
        {
          loading
          ?
          <LaoderButton/>
          :
          <Button
          className="bg-blue-500 hover:bg-blue-400 text-white hover:text-white text-xl font-bold"
          type="submit"
        >
          {"Log in"}
        </Button>
        }
      </form>
      <Separator className="mt-4" />
      <p className="text-center text-muted-foreground">
        create account ?{" "}
        <span className="text-green-500 cursor-pointer">
          <Link href={"/sign-up"}>register</Link>
        </span>
      </p>
    </div>
  );
}

export default SignIn;
