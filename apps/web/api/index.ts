import app from '../build/server/index.js';

export default async function (req: Request) {
  return app.fetch(req);
}
