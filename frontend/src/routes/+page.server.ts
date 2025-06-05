import { superValidate } from "sveltekit-superforms";
import { formSchema } from "./schema";
import { zod } from "sveltekit-superforms/adapters"
import { db } from "$lib/server/db";
import { cardTable } from "$lib/server/db/schema";
import { eq } from "drizzle-orm";
import { OPENAI_API_KEY } from "$env/static/private";

const userID = 1

export const load = async () => {
    const cards = await db
        .select()
        .from(cardTable)
        .where(eq(cardTable.userID, userID))

    return {
        form: await superValidate(zod(formSchema)),
        cards
    }
}

export const actions = {
    default: async (event) => {
        const form = await superValidate(event, zod(formSchema))
        form.data.userID = userID

        // do translation
        const prompt = `Given the following input
        ${JSON.stringify(form.data)}

        Please translate the word, sentence, and context into each of the target languages specified in the languages field. For each language, return a separate JSON object with this exact structure:

        {
            userID: integer("user_id").references(() => userTable.id),
            word: text("word").notNull(),
            sentence: text("sentence").notNull(),
            context: text("context").notNull(),
            language: text("language").notNull()
        }

        Use the translated versions for word, sentence, and context, and fill in the language field with the target language name (e.g. "Chinese", "Korean"). Return only an array of JSON objects, one per language. Return only valid JSON. Do not include triple backticks or any markdown formatting. Do not explain or comment.
        `

        const chatRequest = {
            model: 'gpt-3.5-turbo',
            temperature: 0.7,
            messages: [
                {
                    role: "user",
                    content: prompt
                }
            ]
         }
        const response = await fetch("https://api.openai.com/v1/chat/completions", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${OPENAI_API_KEY}`
            },
            body: JSON.stringify(chatRequest)
        })
        const result = await response.json()
        const content = result.choices?.[0]?.message?.content ?? 'No reply received.'
        console.log(content)
        
        // add to db
    }
}