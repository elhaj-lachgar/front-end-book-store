import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const CreateBookParameter = z.object({
  author: z.string().min(1, { message: "author name is required" }),
  descripition: z.string().min(1, { message: "description is required" }),
  price:  z.string().min(1, { message: "value is required" }).refine((value)=>parseInt(value)),
  image: z.any().refine((value:FileList[])=>value[0]),
  publishedAt: z.string().refine((value) => new Date(value)),
  title:z.string().min(1,{message:"title is required"})
});

export type TCreateBookParameter = z.infer<typeof CreateBookParameter>;

export const resolvers = zodResolver(CreateBookParameter);
