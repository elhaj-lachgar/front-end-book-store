"use client";
import React, { useEffect, useState } from "react";
import { AddressContext } from "./AddressContext";
import { TAddressPramas, TAddressesPramas } from "@/integration/add-address";
import AddAddress from "@/integration/add-address";
import { toast } from "@/components/ui/use-toast";
import GetTAddresses from "@/integration/get-address";

function AddressProvider({ children }: {   children: React.ReactNode}) {
  let [addresses, setAddrees] = useState<TAddressPramas[]>([]);
  const deleteAddresses = async () => {

  };
  const setAddresses = async (city:string , CodePost : number , country : string , streat : string) => {
      const res = await AddAddress(country,city,CodePost , streat);
      if(res == null){
        toast({
          description : "same thing goes wrong",
          variant : "destructive",
          duration : 2000,
        })
        return;
      }
      setAddrees([...addresses , res]);
      toast({
        className : "bg-green-500 text-white",
        description : "Addrees added successfully",
        duration : 2000,
      })
  };
 
  const fetchingData = async () => {
    const res = await GetTAddresses();
    if(res == null) return;
    setAddrees(res);
  }

  useEffect(()=>{
    fetchingData()
  },[])

  return (
    <AddressContext.Provider
      value={{ addresses, deleteAddresses, setAddresses }}
    >
      {children}
    </AddressContext.Provider>
  );
}

export default AddressProvider;
