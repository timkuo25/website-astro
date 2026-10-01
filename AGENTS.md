## Development

When starting the dev server, use background mode:

```
astro dev --background
```

Manage the background server with `astro dev stop`, `astro dev status`, and `astro dev logs`.

## Documentation

Full documentation: https://docs.astro.build

Consult these guides before working on related tasks:

- [Adding pages, dynamic routes, or middleware](https://docs.astro.build/en/guides/routing/)
- [Working with Astro components](https://docs.astro.build/en/basics/astro-components/)
- [Using React, Vue, Svelte, or other framework components](https://docs.astro.build/en/guides/framework-components/)
- [Adding or managing content](https://docs.astro.build/en/guides/content-collections/)
- [Adding styles or using Tailwind](https://docs.astro.build/en/guides/styling/)
- [Supporting multiple languages](https://docs.astro.build/en/guides/internationalization/)

## Project notes

- Astro 7 renders Markdown with Sätteri by default. This project uses the unified processor from `@astrojs/markdown-remark` (see `astro.config.mjs`) so the remark/rehype plugins keep working — don't move plugins back to the deprecated top-level `markdown.remarkPlugins` / `rehypePlugins`.
- Syntax highlighting is rehype-highlight (styled in `src/styles/global.css`); Shiki is disabled with `markdown.syntaxHighlight: false`.
- Posts live in `posts/`, outside `src/`, so the upload-image skill can name Cloudinary folders after the post filename.
