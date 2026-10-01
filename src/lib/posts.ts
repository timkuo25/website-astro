import { getCollection, type CollectionEntry } from 'astro:content';
import { defaultLocale, locales, type Locale } from './i18n';
import type { Category, Section } from './categories';

type PostEntry = CollectionEntry<'posts'>;

// The defaultLocale folder is canonical (every post has an entry there);
// other locales only need a file when a translation exists — otherwise the
// defaultLocale version is shown. Sections and categories always come from
// the canonical file so every locale lists the same posts.
export interface PostMeta {
  slug: string;
  title: string;
  date: string;
  excerpt?: string;
  categories: Category[];
  tags: string[];
  translated: boolean;
  entry: PostEntry;
}

function splitId(id: string): { locale: string; slug: string } {
  const [locale, ...rest] = id.split('/');
  return { locale, slug: rest.join('/') };
}

export async function getSortedPosts(section: Section, locale: Locale): Promise<PostMeta[]> {
  const all = await getCollection('posts');
  const byId = new Map(all.map((entry) => [entry.id, entry]));

  return all
    .filter((entry) => {
      const { locale: entryLocale } = splitId(entry.id);
      return entryLocale === defaultLocale && entry.data.sections.includes(section);
    })
    .map((canonical) => {
      const { slug } = splitId(canonical.id);
      const localized = locale === defaultLocale ? undefined : byId.get(`${locale}/${slug}`);
      const entry = localized ?? canonical;
      return {
        slug,
        title: entry.data.title,
        date: entry.data.date,
        excerpt: entry.data.excerpt,
        categories: canonical.data.categories,
        tags: entry.data.tags,
        translated: locale === defaultLocale || localized !== undefined,
        entry,
      };
    })
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

export interface PostPageProps {
  post: PostMeta;
  posts: PostMeta[];
  prev: PostMeta | null;
  next: PostMeta | null;
}

// One page per (locale, slug). Adjacent posts follow the index order
// (newest first), so "prev" is the newer post and "next" the older one.
export async function getPostStaticPaths(section: Section) {
  const paths = [];
  for (const lang of locales) {
    const posts = await getSortedPosts(section, lang);
    for (const [i, post] of posts.entries()) {
      paths.push({
        params: { lang, slug: post.slug },
        props: {
          post,
          posts,
          prev: posts[i - 1] ?? null,
          next: posts[i + 1] ?? null,
        } satisfies PostPageProps,
      });
    }
  }
  return paths;
}

export function getLangStaticPaths() {
  return locales.map((lang) => ({ params: { lang } }));
}

// A rough, language-mixed reading-time estimate: CJK text is counted by
// character (no spaces to split words on) and everything else by word,
// each at a typical reading speed, then summed.
export function estimateReadingMinutes(markdown: string): number {
  const withoutCodeBlocks = markdown.replace(/```[\s\S]*?```/g, ' ');
  const cjkCount = (withoutCodeBlocks.match(/[一-鿿぀-ヿ가-힯]/g) ?? []).length;
  const wordCount = (withoutCodeBlocks.replace(/[一-鿿぀-ヿ가-힯]/g, ' ').match(/[A-Za-z0-9]+/g) ?? []).length;
  return Math.max(1, Math.round(cjkCount / 400 + wordCount / 200));
}
