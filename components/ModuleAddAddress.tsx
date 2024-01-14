"use client";
import React, { useContext, useState } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import LocationComp from "./LocationComp";
import { useForm } from "react-hook-form";
import { TAddressProps, resolvers } from "@/validator/add-address-validator";
import { cn } from "@/lib/utils";
import { AddressContext } from "@/context/AddressContext";
import Laoding from "@/app/(home)/products/[id]/loading";
import LaoderButton from "./LaoderButton";

function ModuleAddAddress() {
  const { setAddresses } = useContext(AddressContext);
  let [loading, setLoading] = useState(false);

  const {
    formState: { errors },
    handleSubmit,
    register,
  } = useForm<TAddressProps>({
    resolver: resolvers,
  });

  const AddEvent = async (data: TAddressProps) => {
    setLoading(true);
    await setAddresses(data.city, data.CodePostal, data.country, data.streat);
    setLoading(false);
    document.getElementById("close")?.click();
  };
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant={"secondary"} className="border text-blue-600 w-full">
          + Add New Address
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <form className="lg:px-5 px-2" onSubmit={handleSubmit(AddEvent)}>
          <div className=" flex flex-col gap-y-3">
            <div className="flex flex-col gap-y-1  w-full">
              <label>Country</label>
              <Input
                placeholder="entre your country..."
                {...register("country")}
                className={cn(
                  errors.country
                    ? "focus:border-red-400 border"
                    : "focus:border-green-400"
                )}
              />
              {errors.country ? (
                <p className="text-xs italic text-red-500">
                  {errors.country.message}
                </p>
              ) : null}
            </div>
            <div className="flex flex-col gap-y-1  w-full">
              <label>City</label>
              <Input
                placeholder="entre your country..."
                {...register("city")}
                className={cn(
                  errors.city
                    ? "focus:border-red-400 border"
                    : "focus:border-green-400"
                )}
              />
              {errors.city ? (
                <p className="text-xs italic text-red-500">
                  {errors.city.message}
                </p>
              ) : null}
            </div>
            <div className="flex flex-col gap-y-1  w-full">
              <label>Streat</label>
              <Input
                placeholder="entre your country..."
                {...register("streat")}
                className={cn(
                  errors.streat
                    ? "focus:border-red-400 border"
                    : "focus:border-green-400"
                )}
              />
              {errors.streat ? (
                <p className="text-xs italic text-red-500">
                  {errors.streat.message}
                </p>
              ) : null}
            </div>
            <div className="flex flex-col gap-y-1  w-full">
              <label>Code Postal</label>
              <Input
                type="number"
                placeholder="entre your country..."
                {...register("CodePostal")}
                className={cn(
                  errors.CodePostal
                    ? "focus:border-red-400 border"
                    : "focus:border-green-400"
                )}
              />
              {errors.CodePostal ? (
                <p className="text-xs italic text-red-500">
                  {errors.CodePostal.message}
                </p>
              ) : null}
            </div>
            <div className="flex gap-y-1  w-full items-center justify-between">
              {loading ? (
                <LaoderButton />
              ) : (
                <Button
                  type="submit"
                  className="w-[45%] bg-blue-500 text-white"
                >
                  Add
                </Button>
              )}
              <AlertDialogCancel className="my-auto" id="close">
                Cancel
              </AlertDialogCancel>
            </div>
          </div>
        </form>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export default ModuleAddAddress;
