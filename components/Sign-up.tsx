"use client";

import React, { useEffect, useState } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Separator } from "./ui/separator";
import { useForm } from "react-hook-form";
import { TSingUpProps, resolvers } from "@/validator/sign-up-validator";
import { cn } from "@/lib/utils";
import Link from "next/link";
import SignUpHandler from "@/integration/sign-up";
import { useToast } from "./ui/use-toast";
import { Eye } from "lucide-react";
import { EyeOff } from "lucide-react";
import { useRouter } from "next/navigation";
import LaoderButton from "./LaoderButton";

function SignUp() {
  const { toast } = useToast();
  let [Confirmstatus, setConfirmStatus] = useState(false);
  let [status, setStatus] = useState(false);
  let [error, setError] = useState<null | string>(null);
  let [confirmpassord, setConfirmPassword] = useState("");
  let [loading, setLoading] = useState(false);
  const router = useRouter();
  // useEffect(() => {
  //   if (window.localStorage.getItem("token")) router.push("/");
  // }, []);

  const {
    formState: { errors },
    handleSubmit,
    register,
    getValues,
  } = useForm<TSingUpProps>({
    resolver: resolvers,
  });
  const SubmitHandler = async (data: {
    name: string;
    password: string;
    email: string;
    profile: (string | undefined)[];
  }) => {
    if (data.password != confirmpassord) {
      setError("confirm password not match password");
    } else {
      setLoading(true)
      const res = await SignUpHandler(
        data.email,
        data.password,
        confirmpassord,
        data.name,
        data.profile[0]
      );
      //@ts-ignore
      if (res.data) {
        setError("");
        // @ts-ignore
        const data: User = res;
        toast({
          description: "success",
          variant: "default",
          className: "bg-green-500 text-white",
          duration: 4000,
        });
        window.localStorage.setItem("token", data.token);
        window.localStorage.setItem("user", JSON.stringify(data.data));
        setLoading(false)
        router.back();
      } else {
        setLoading(false)
        toast({
          // @ts-ignore
          description: res.err || res.message ||res.errors[0].msg,
          variant: "destructive",
          duration: 3000,
        });
      }
    }
  };

  return (
    <div className="w-11/12 lg:w-[500px] flex flex-col px-2 lg:px-5 gap-y-3 border rounded-xl py-4 bg-white">
      <h1 className="text-center w-full font-bold text-2xl">Sign up</h1>
      <form
        className="flex flex-col gap-y-3"
        onSubmit={handleSubmit(SubmitHandler)}
        id="form"
      >
        <div className="flex flex-col gap-y-2">
          <label>Email</label>
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
            <p className="text-xs italic text-red-500">
              {errors.email.message}
            </p>
          ) : null}
        </div>
        <div className=" flex flex-row gap-x-3 justify-between">
          <div className=" relative flex flex-col w-[45%]">
            <label>password</label>
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
                !errors.password || !error 
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
              <p className="text-xs italic text-red-500">
                {errors.password.message}
              </p>
            ) : null}
          </div>
          <div className="relative flex flex-col w-[45%] ">
            <label>comfirm password</label>
            <Input
              type={Confirmstatus ? "text" : "password"}
              {...register("confirmPassword")}
              onChange={(e) => setConfirmPassword(e.currentTarget.value)}
              className={cn(
                error ? "focus:border-red-400 border" : "focus:border-green-400"
              )}
            />
            <div
              className={cn(
                !errors.password || !error 
                  ? "absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5 top-1/3"
                  : "absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5 top-[-30px]"
              )}
            >
              <EyeOff
                className={Confirmstatus ? "block" : "hidden"}
                onClick={() => setConfirmStatus(!Confirmstatus)}
              />
              <Eye
                className={Confirmstatus ? "hidden" : "block"}
                onClick={() => setConfirmStatus(!Confirmstatus)}
              />
            </div>
            {error ? (
              <p className="text-xs italic text-red-500">{error}</p>
            ) : null}
          </div>
        </div>
        <div className="flex flex-row gap-x-3 justify-between">
          <div className="flex flex-col w-[45%]">
            <label>profile</label>
            <Input type="file" {...register("profile")} />
          </div>
          <div className="flex flex-col ">
            <label>name</label>
            <Input
              type="text"
              {...register("name")}
              className={cn(
                errors.name
                  ? "focus:border-red-400 border"
                  : "focus:border-green-400"
              )}
            />
            {errors.name ? (
              <p className="text-xs italic text-red-500">
                {errors.name.message}
              </p>
            ) : null}
          </div>
        </div>
        {loading ? (
          <LaoderButton />
        ) : (
          <Button
            className="bg-blue-500 hover:bg-blue-400 text-white hover:text-white text-xl font-bold"
            onClick={() => {
              const data = {
                name: getValues("name"),
                password: getValues("password"),
                email: getValues("email"),
                profile: getValues("profile"),
              };
              SubmitHandler(data);
            }}
          >
            Sign up
          </Button>
        )}
      </form>
      <Separator />
      <p className="text-center text-muted-foreground">
        already you have account ?{" "}
        <span className="text-blue-500">
          <Link href={"/sign-in"}>log in</Link>
        </span>
      </p>
    </div>
  );
}

export default SignUp;
