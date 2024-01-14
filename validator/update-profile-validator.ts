import {z} from "zod"
import { zodResolver } from "@hookform/resolvers/zod"

const UpdateProps = z.object({
    email : z.string().email({message : "email is not valid"}).optional(),
    name: z.string().optional(),
});

export type TUpdateProps = z.infer<typeof UpdateProps>;

export const resolvers = zodResolver(UpdateProps);