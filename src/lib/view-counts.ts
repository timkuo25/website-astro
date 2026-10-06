// Client-side helper for the batch view-count API (worker/index.ts).
// A page can render the total-views counter twice (desktop and mobile spots)
// with the same slugs; identical in-flight requests share one fetch.
const inFlight = new Map<string, Promise<Record<string, number> | null>>();

export function fetchViewCounts(slugs: string[]): Promise<Record<string, number> | null> {
  const key = [...new Set(slugs)].sort().join(',');
  if (!key) return Promise.resolve(null);

  let request = inFlight.get(key);
  if (!request) {
    request = fetch(`/api/views?slugs=${key.split(',').map(encodeURIComponent).join(',')}`)
      .then((res) => (res.ok ? (res.json() as Promise<{ views: Record<string, number> }>) : null))
      .then((body) => body?.views ?? null)
      .catch(() => null)
      .finally(() => inFlight.delete(key));
    inFlight.set(key, request);
  }
  return request;
}

export function formatCount(count: number): string {
  return count.toLocaleString('en-US');
}
