import { serve } from '@hono/node-server';
import { Hono } from 'hono';
import { adminRouter } from './routes/admin';
import { publicRouter } from './routes/public';

declare module 'hono' {
	interface ContextVariableMap {
		// user: typeof auth.$Infer.Session.user | null;
		// session: typeof auth.$Infer.Session.session | null;
	}
}
export const app = new Hono().basePath('/api/v1');

const routes = app.route('admin', adminRouter).route('public', publicRouter);

serve(app);

export type AppType = typeof routes;
