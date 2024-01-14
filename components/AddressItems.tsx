"use client"
import { MapPin } from "lucide-react";
import React from "react";
import { useContext } from "react";
import { AddressContext } from "@/context/AddressContext";

function AddressItems() {
  const { addresses } = useContext(AddressContext);
  
  return (
    <div className="flex flex-col gap-y-3 h-full">
      {
        addresses.map(address =>(
            <div className="flex items-center py-3 px-3 bg-gray-100 rounded-lg gap-x-3">
              <div className="bg-white w-[50px] h-[50px] flex items-center justify-center rounded-full border  ">
                <MapPin color="yellow" />
              </div>
              <div className="flex flex-col">
                <p className=" text-muted-foreground">{address.data.country}</p>
                <p className=" text-muted-foreground">{address.data.city}</p>
                <p className=" text-muted-foreground">{address.data.streat}</p>
              </div>
            </div>
          )
        )
      }
    </div>
  );
}

export default AddressItems;
