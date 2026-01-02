import { db } from '$lib/server/db';
import { featureFlag } from '$lib/server/db/schema/feature_flags';
import { eq } from 'drizzle-orm';
import { Hono } from 'hono';

export const sdkRouter = new Hono().get('/feature-flags/:key', async (c) => {
	const { key: featureFlagKey } = c.req.param();
	const data = await db.select().from(featureFlag).where(eq(featureFlag.key, featureFlagKey));

	if (data.length === 0) {
		return c.json({
			data: {
				isEnabled: false
			}
		});
	}

	return c.json({
		data: {
			isEnabled: true
		}
	});
});
