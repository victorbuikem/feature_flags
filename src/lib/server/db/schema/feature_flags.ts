import { pgTable, text } from 'drizzle-orm/pg-core';

export const featureFlag = pgTable('feature_flags', {
	id: text('id').primaryKey(),
	name: text('name').notNull(),
	description: text('description'),
	organizationId: text('organizationId').notNull(),
	key: text('feature_flag_key').notNull().unique()
});
