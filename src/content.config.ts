import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';
import { categories, sections } from './lib/categories';

// Posts live under posts/<locale>/<slug>.md. The id keeps that path as-is
// (e.g. "zh/rendering") instead of Astro's default slugified id, so the
// locale and slug can be split back out reliably.
const posts = defineCollection({
  loader: glob({
    pattern: '**/*.md',
    base: './posts',
    generateId: ({ entry }) => entry.replace(/\\/g, '/').replace(/\.md$/, ''),
  }),
  schema: z.object({
    title: z.string(),
    date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, { error: 'date must be "YYYY-MM-DD"' }),
    excerpt: z.string().optional(),
    // Which section(s) a post belongs to; read from the defaultLocale file.
    sections: z.array(z.enum(sections)).default([]),
    categories: z.array(z.enum(categories)).default([]),
    tags: z.array(z.string()).default([]),
  }),
});

export const collections = { posts };
