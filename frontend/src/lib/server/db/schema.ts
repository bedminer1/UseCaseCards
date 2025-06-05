import { sqliteTable, integer, text } from 'drizzle-orm/sqlite-core';

export const userTable = sqliteTable('users', {
	id: integer('id').primaryKey(),
	username: text().notNull(),
});

export const cardTable = sqliteTable("cards", {
	id: integer("id").primaryKey(),
	word: text("word").notNull(),
	sentence: text("sentence").notNull(),
	context: text("context").notNull()
})