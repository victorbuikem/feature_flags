import { Hono } from 'hono';
import { featureFlagRouter } from './feature_flags';

export const adminRouter = new Hono()
	.use(async (c, next) => {
		// const session = await auth.api.getSession({ headers: c.req.raw.headers });

		// if (!session) {
		//   c.set('user', null);
		//   c.set('session', null);
		//   return next();
		// }

		// c.set('user', session.user);
		// c.set('session', session.session);
		return next();
	})
	.use(async (c, next) => {
		const activeSession = true;
		if (!activeSession) return c.json({ status: 'UNAUTHENTICATED' }, { status: 400 });
		return next();
	})
	.route('/feature-flags', featureFlagRouter);
