import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const isValid = (value: string) =>
  /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm.test(value);

const SignUpProps = z
  .object({
    name: z.string().min(3,{message : "name is short"}),
    email: z.string().email({ message: "email not valid" }),
    password: z.string().refine(isValid, {
      message:
        "this not valid password must be at least 8 characters and containes A-Z , a-z and 1-2",
    }),
    confirmPassword:z.string(),
    profile: z.string().optional().array().refine((files)=>files[0]),
  });

export type TSingUpProps = z.infer<typeof SignUpProps>;

export const resolvers = zodResolver(SignUpProps);
