import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { sdkRouter } from './sdk';

export const adminRouter = new Hono()
	.use(
		'*',
		cors({
			origin: '*',
			allowMethods: ['POST', 'GET', 'OPTIONS'],
			allowHeaders: ['Content-Type', 'Authorization', 'User-Agent', 'x-custom-domain']
		})
	)
	.route('/sdk', sdkRouter);
