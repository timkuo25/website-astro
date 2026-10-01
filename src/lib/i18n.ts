export const locales = ['zh', 'en', 'ja'] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = 'zh';

export const localeLabels: Record<Locale, string> = {
  zh: '中文',
  en: 'English',
  ja: '日本語',
};

export const htmlLang: Record<Locale, string> = {
  zh: 'zh-Hant',
  en: 'en',
  ja: 'ja',
};

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}

export const untranslatedNotice = 'Not yet translated — shown in the original language.';
