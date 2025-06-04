import { z } from "zod"

export const formSchema = z.object({
    word: z.string(),
    sentence: z.string(),
    context: z.string()
})

export type FormSchema = typeof formSchema