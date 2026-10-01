// Custom rehype plugins carried over from the Next.js version's lib/posts.ts.
// Kept as plain .mjs so astro.config.mjs can import them directly.

// Gives each h2/h3 a stable id so the table of contents can jump to it.
// IDs are an incrementing counter rather than slugified heading text —
// headings are often in Chinese/Japanese, where slugifying is more trouble
// than it's worth for an anchor nobody needs to read. Astro keeps ids set by
// plugins and reports them through render(entry).headings.
export function rehypeHeadingCounterIds() {
  return (tree) => {
    let counter = 0;
    const walk = (node) => {
      if (!node.children) return;
      for (const child of node.children) {
        if (child.type === 'element' && (child.tagName === 'h2' || child.tagName === 'h3')) {
          child.properties = { ...(child.properties ?? {}), id: `heading-${counter++}` };
        }
        walk(child);
      }
    };
    walk(tree);
  };
}

export function rehypeNewTabLinks() {
  return (tree) => {
    const walk = (node) => {
      if (!node.children) return;
      for (const child of node.children) {
        if (child.type === 'element' && child.tagName === 'a') {
          child.properties = {
            ...(child.properties ?? {}),
            target: '_blank',
            rel: 'noopener noreferrer',
          };
        }
        walk(child);
      }
    };
    walk(tree);
  };
}

// Every <img> gets lazy loading. Cloudinary images also get f_auto,q_auto
// inserted after /upload/, so Cloudinary serves WebP/AVIF at a sensible
// quality while the Markdown keeps the plain URL the upload skill returns.
// URLs that already carry transformations (e.g. /upload/w_800/...) are left as-is.
export function rehypeOptimizeImages() {
  const cloudinaryUpload = /^(https:\/\/res\.cloudinary\.com\/[^/]+\/image\/upload\/)(.*)$/;
  const transformationSegment = /^[a-z]{1,3}_[^/]*$/;

  return (tree) => {
    const walk = (node) => {
      if (!node.children) return;
      for (const child of node.children) {
        if (child.type === 'element' && child.tagName === 'img') {
          const props = (child.properties ??= {});
          props.loading ??= 'lazy';
          props.decoding ??= 'async';

          const match = typeof props.src === 'string' && props.src.match(cloudinaryUpload);
          if (match && !transformationSegment.test(match[2].split('/')[0])) {
            props.src = `${match[1]}f_auto,q_auto/${match[2]}`;
          }
        }
        walk(child);
      }
    };
    walk(tree);
  };
}

// Turns a paragraph containing only an image into <figure>, using the alt
// text as the caption.
export function rehypeImageFigure() {
  return (tree) => {
    const walk = (node) => {
      if (!node.children) return;
      node.children = node.children.map((child) => {
        if (
          child.type === 'element' &&
          child.tagName === 'p' &&
          child.children?.length === 1 &&
          child.children[0].type === 'element' &&
          child.children[0].tagName === 'img'
        ) {
          const img = child.children[0];
          const alt = img.properties?.alt;
          const figureChildren = [img];
          if (alt) {
            figureChildren.push({
              type: 'element',
              tagName: 'figcaption',
              properties: {},
              children: [{ type: 'text', value: alt }],
            });
          }
          return { type: 'element', tagName: 'figure', properties: {}, children: figureChildren };
        }
        walk(child);
        return child;
      });
    };
    walk(tree);
  };
}
