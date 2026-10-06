// Cloudflare Worker for the view counter, backed by D1. Everything else is
// static assets (dist/): wrangler.jsonc runs this Worker only for /api/*.
//
// GET  /api/views/:slug        → { views } without counting
// POST /api/views/:slug        → counts one view, then returns { views }
// GET  /api/views?slugs=a,b,c  → { views: { a: 12, b: 0, c: 3 } }
//
// src/components/ViewCount.astro POSTs once per browser session per post and
// GETs otherwise, so refreshes don't inflate the count;
// src/components/TotalViews.astro uses the batch form.
// Schema: migrations/0001_create_views.sql.

// Minimal shapes of the Cloudflare runtime types used here, so the project
// doesn't need @cloudflare/workers-types just for this file.
interface D1PreparedStatement {
  first<T>(): Promise<T | null>;
  all<T>(): Promise<{ results: T[] }>;
}

interface Env {
  DB: { prepare(query: string): { bind(...values: unknown[]): D1PreparedStatement } };
}

// Post filenames are lowercase with underscores (e.g. bloom_filter); anything
// else is rejected so random requests can't create rows.
const SLUG_PATTERN = /^[a-z0-9_-]{1,64}$/;
const BOT_PATTERN = /bot|crawl|spider|slurp|preview|headless|lighthouse/i;
const MAX_SLUGS = 100;

function json(body: unknown, status = 200): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'content-type': 'application/json', 'cache-control': 'no-store' },
  });
}

async function getViews(env: Env, slug: string): Promise<number> {
  const row = await env.DB.prepare('SELECT count FROM views WHERE slug = ?').bind(slug).first<{ count: number }>();
  return row?.count ?? 0;
}

async function countView(env: Env, slug: string): Promise<number> {
  const row = await env.DB.prepare(
    `INSERT INTO views (slug, count) VALUES (?, 1)
     ON CONFLICT(slug) DO UPDATE SET count = count + 1
     RETURNING count`,
  )
    .bind(slug)
    .first<{ count: number }>();
  return row?.count ?? 0;
}

async function getManyViews(env: Env, slugs: string[]): Promise<Record<string, number>> {
  const { results } = await env.DB.prepare(
    `SELECT slug, count FROM views WHERE slug IN (${slugs.map(() => '?').join(',')})`,
  )
    .bind(...slugs)
    .all<{ slug: string; count: number }>();

  const views = Object.fromEntries(slugs.map((slug) => [slug, 0]));
  for (const row of results) views[row.slug] = row.count;
  return views;
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);

    if (url.pathname === '/api/views') {
      if (request.method !== 'GET') return json({ error: 'method not allowed' }, 405);
      const slugs = [...new Set((url.searchParams.get('slugs') ?? '').split(',').filter(Boolean))];
      if (slugs.length === 0 || slugs.length > MAX_SLUGS || !slugs.every((slug) => SLUG_PATTERN.test(slug))) {
        return json({ error: 'invalid slugs' }, 400);
      }
      return json({ views: await getManyViews(env, slugs) });
    }

    const match = url.pathname.match(/^\/api\/views\/([^/]+)$/);
    if (match) {
      const slug = match[1];
      if (!SLUG_PATTERN.test(slug)) return json({ error: 'invalid slug' }, 400);
      if (request.method === 'GET') return json({ views: await getViews(env, slug) });
      if (request.method !== 'POST') return json({ error: 'method not allowed' }, 405);
      // Bots still see the number, they just don't add to it.
      const isBot = BOT_PATTERN.test(request.headers.get('user-agent') ?? '');
      return json({ views: isBot ? await getViews(env, slug) : await countView(env, slug) });
    }

    return json({ error: 'not found' }, 404);
  },
};
