import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const isValid = (value: string) =>
  /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm.test(value);

const SignInParams = z.object({
  email: z.string().email({ message: "this not valid email" }),
  password: z.string().refine(isValid, {
    message:
      "this not valid password must be at least 8 characters and containes A-Z , a-z and 1-2",
  }),
});

export type TSingInProp = z.infer<typeof SignInParams>;

export const resolvers = zodResolver(SignInParams);
