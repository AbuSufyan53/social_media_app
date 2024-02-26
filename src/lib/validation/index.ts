import { z } from "zod"

export const SignUpValidation = z.object({
    name: z.string().min(2, {message: "Too Short..."}),
    username: z.string().min(2,{message:"username must be of minimum 2 characters."}).max(50, {message:"username must be of maximum 50 characters."}),
    email: z.string().email(),
    password: z.string().min(8, {message: "Password must be atleast of 8 characters..."})
})