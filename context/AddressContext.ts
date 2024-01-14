import { createContext } from "react";
import { TAddressPramas, TAddressesPramas } from "@/integration/add-address";

type TAddressContext = {
  addresses: TAddressPramas [];
  setAddresses: (city:string , CodePost : number , country : string , streat : string) => void;
  deleteAddresses: () => void;
};


const initAddressContext: TAddressContext = {
  addresses: [],
  deleteAddresses: () => {},
  setAddresses: (city:string , CodePost : number , country : string , streat : string) => {},
};

export const AddressContext =
  createContext<TAddressContext>(initAddressContext);
