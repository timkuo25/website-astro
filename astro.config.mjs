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
        // Allow \htmlClass so math can be colored with theme-aware CSS
        // classes (e.g. .math-highlight in global.css) instead of fixed hex.
        [
          rehypeKatex,
          {
            trust: (/** @type {{ command: string }} */ ctx) => ctx.command === '\\htmlClass',
            strict: (/** @type {string} */ code) => (code === 'htmlExtension' ? 'ignore' : 'warn'),
          },
        ],
        rehypeNewTabLinks,
        rehypeOptimizeImages,
        rehypeImageFigure,
        rehypeHighlight,
      ],
    }),
  },

  // Emit /tech/blog/zh/rendering.html instead of .../rendering/index.html so
  // links without a trailing slash are served directly; with directory
  // output, Cloudflare answers every such link with a 307 to the slashed URL.
  build: {
    format: 'file',
  },

  // Prefetch every internal link on hover so client-side navigation
  // (ClientRouter in BaseLayout) feels instant.
  prefetch: {
    prefetchAll: true,
    defaultStrategy: 'hover',
  },

  // Redirects (/blog → /blog/zh, etc.) live only in public/_redirects.
  // Don't also add them to an Astro `redirects` option: Cloudflare's build
  // merges those into _redirects too and rejects the duplicate rules.

  vite: {
    plugins: [tailwindcss()],
  },
});
