import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const IsValid = (value: any) => {
  const valid =
    /(18|19|20)\d{2}\-(0[1-9]|1[0,1,2])\-(0[1-9]|[12][0-9]|3[01])/.test(value);
  if (!valid) return false;
  const date = new Date(value);
  const now = new Date(Date.now());

  if (date.getTime() >= now.getTime()) return false;

  return value;
};

const UpdateStatusParameters = z.object({
  date: z.string().refine(IsValid, { message: "date is not valid" }),
});

export type TUpdateStatusParameters = z.infer<typeof UpdateStatusParameters>;

export const resolvers = zodResolver(UpdateStatusParameters);
