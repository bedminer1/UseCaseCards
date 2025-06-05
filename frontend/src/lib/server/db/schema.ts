import { sqliteTable, integer, text } from 'drizzle-orm/sqlite-core';

export const userTable = sqliteTable('users', {
	id: integer('id').primaryKey(),
	username: text().notNull(),
});

export const cardTable = sqliteTable("cards", {
	id: integer("id").primaryKey(),
	userID: integer("user_id").references(() => userTable.id),
	word: text("word").notNull(),
	sentence: text("sentence").notNull(),
	context: text("context").notNull(),
	language: text("language").notNull()
})