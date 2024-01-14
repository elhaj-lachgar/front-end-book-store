import {z} from "zod";
import { zodResolver } from "@hookform/resolvers/zod";



const AddressProps = z.object({
    country : z.string().min(1,{message : "country required"}),
    city : z.string().min(1,{message : "city required"}),
    CodePostal : z.string().min(1,{message : "postal code is required"}).transform((value)=>parseInt(value)),
    streat : z.string().min(1,{message : "straet is required"}),
});


export type TAddressProps = z.infer<typeof AddressProps>;


export const resolvers = zodResolver(AddressProps);