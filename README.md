# TCK website (Astro)

Astro rewrite of the Next.js site in `../website`. Fully static output.

```sh
npm install
npm run dev      # http://localhost:4321
npm run build    # outputs to dist/
npm run preview  # serve dist/ locally
```

## Layout

- `posts/<locale>/<slug>.md` — articles. `zh` is canonical; `en` / `ja` files are optional translations and fall back to `zh` when missing. Frontmatter is validated by `src/content.config.ts`.
- `src/lib/posts.ts` — locale fallback, sorting, `getStaticPaths` helpers.
- `src/lib/rehype-plugins.mjs` — custom Markdown plugins (heading ids, new-tab links, image captions).
- `src/pages/` — routes, mirroring the Next.js `app/` folder.

No UI framework is used; the theme toggle, language switcher, and table of contents are small inline scripts, and the category sidebar uses native `<details>`.
