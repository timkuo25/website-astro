// @ts-check
import { defineConfig, fontProviders } from 'astro/config';
import { unified } from '@astrojs/markdown-remark';
import tailwindcss from '@tailwindcss/vite';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import rehypeHighlight from 'rehype-highlight';
import {
  rehypeHeadingCounterIds,
  rehypeImageFigure,
  rehypeNewTabLinks,
  rehypeOptimizeImages,
} from './src/lib/rehype-plugins.mjs';

// https://astro.build/config
export default defineConfig({
  fonts: [
    {
      name: 'Geist',
      cssVariable: '--font-geist-sans',
      provider: fontProviders.google(),
      weights: ['100 900'],
      styles: ['normal'],
    },
    {
      name: 'Geist Mono',
      cssVariable: '--font-geist-mono',
      provider: fontProviders.google(),
      weights: ['100 900'],
      styles: ['normal'],
      fallbacks: ['monospace'],
    },
  ],

  markdown: {
    // Code is highlighted by rehype-highlight (styled in global.css), not Shiki.
    syntaxHighlight: false,
    processor: unified({
      // The Next.js version didn't use SmartyPants; keep quotes and dashes as written.
      smartypants: false,
      remarkPlugins: [remarkMath],
      rehypePlugins: [
        rehypeHeadingCounterIds,
        rehypeKatex,
        rehypeNewTabLinks,
        rehypeOptimizeImages,
        rehypeImageFigure,
        rehypeHighlight,
      ],
    }),
  },

  // Prefetch every internal link on hover so client-side navigation
  // (ClientRouter in BaseLayout) feels instant.
  prefetch: {
    prefetchAll: true,
    defaultStrategy: 'hover',
  },

  // Fallback meta-refresh pages. Real 301s come from public/_redirects
  // on hosts that support it (Cloudflare Pages, Netlify).
  redirects: {
    '/blog': '/blog/zh',
    '/tech/blog': '/tech/blog/zh',
    '/tech/project': '/tech/project/zh',
  },

  vite: {
    plugins: [tailwindcss()],
  },
});
