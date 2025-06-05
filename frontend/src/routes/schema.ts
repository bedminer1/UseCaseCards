import { z } from "zod"

export const formSchema = z.object({
    word: z.string().nonempty("Word can't be empty"),
    sentence: z.string(),
    context: z.string().nonempty("Context can't be empty")
})

export type FormSchema = typeof formSchema