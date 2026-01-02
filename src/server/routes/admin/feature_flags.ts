import { Hono } from 'hono';
import * as v from 'valibot';
import { sValidator } from '@hono/standard-validator';
import { db } from '$lib/server/db';
import { featureFlag } from '$lib/server/db/schema/feature_flags';
import { eq } from 'drizzle-orm';

const createFeatureFlagSchema = v.object({
	key: v.string(),
	name: v.string(),
	description: v.optional(v.string())
});

export const featureFlagRouter = new Hono()
	.post('/create', sValidator('json', createFeatureFlagSchema), async (c) => {
		const body = c.req.valid('json');

		const feature_flag = await db
			.insert(featureFlag)
			.values({
				id: 'test_value',
				organizationId: 'test_kfrnf',
				...body
			})
			.returning();

		return c.json({
			status: 'CREATED_SUCCESFULLY',
			data: feature_flag
		});
	})
	.get('/', async (c) => {
		const data = await db
			.select()
			.from(featureFlag)
			.where(eq(featureFlag.organizationId, 'test_kfrnf'));
		return c.json({
			status: 'FEATURE_FLAG_LIST',
			data
		});
	})
	.get('/:id', async (c) => {
		const { id: featureFlagId } = c.req.param();
		const data = await db.select().from(featureFlag).where(eq(featureFlag.id, featureFlagId));

		return c.json({
			status: 'FEATURE_FLAG',
			data
		});
	});
