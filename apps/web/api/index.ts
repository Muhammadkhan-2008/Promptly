import { handle } from 'hono/vercel';
// @ts-ignore - The build server file will be compiled during the Vercel build step
import app from '../build/server/index.js';

export const onRequest = handle(app);
export default handle(app);
