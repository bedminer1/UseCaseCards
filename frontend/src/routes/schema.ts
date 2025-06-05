import { z } from "zod"

export const formSchema = z.object({
    userID: z.number(),
    word: z.string().nonempty("Word can't be empty"),
    sentence: z.string(),
    context: z.string().nonempty("Context can't be empty"),
    languages: z.string().nonempty(),
})

export type FormSchema = typeof formSchema