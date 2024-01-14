import {z} from "zod"
import { zodResolver } from "@hookform/resolvers/zod";
const isValid = (value :string )  => /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm.test(value)
const ChangePasswordProps = z.object({
    currentpassword:z.string().refine(isValid , { message : "current password not valid"}),
    newpassword: z.string().refine(isValid,{message:"this not valid password must be at least 8 characters and containes A-Z , a-z and 1-2"}),
    confirmpassword : z.string(),
});

export type TChangePasswordProps = z.infer<typeof ChangePasswordProps>;

export const resolvers = zodResolver(ChangePasswordProps);