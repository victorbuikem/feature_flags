import { serve } from '@hono/node-server';
import { Hono } from 'hono';

declare module 'hono' {
	interface ContextVariableMap {
		// user: typeof auth.$Infer.Session.user | null;
		// session: typeof auth.$Infer.Session.session | null;
	}
}
export const app = new Hono().basePath('/api/v1');

const routes = app
	.get('/hello', (c) => {
		return c.json({
			message: 'Hello from Hono!'
		});
	})
	.get('/:wild', (c) => {
		const wild = c.req.param('wild');
		return c.json({
			message: `Hello from Hono! You're now on /api/${wild}!`
		});
	});

serve(app);

export type AppType = typeof routes;
