import type { Locale } from './i18n';

// Quotes shown under the "Blog" heading on the tech blog index (src/components/RandomQuote.astro),
// one picked at random on every page load from the list for the page's language.
// Each language has its own independent list.
export const quotes: Record<Locale, string[]> = {
  zh: [
    '一個人上路很危險，帶上這個吧',
    '我只知道我一無所知',
    '不要碰我的圓',
    '從明天起，關心糧食和蔬菜',
    '我有一棟房子，面朝大海，春暖花開',
    '餵馬、劈柴，周遊世界',
  ],
  en: [
    "Think out of the box.",
  ],
  ja: [
    '竜が我が敵を喰らう',
  ],
};
