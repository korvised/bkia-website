export type Lang = 'en' | 'lo' | 'zh';

export const ALLOWED_LANGUAGES: Lang[] = ['en', 'lo', 'zh'];

export const DEFAULT_LANGUAGE: Lang = 'en';

export const normalizeLang = (input?: string): Lang => {
  const val = (input || 'en').toLowerCase();
  // fallback if unknown
  return (
    ALLOWED_LANGUAGES.includes(val as Lang) ? val : DEFAULT_LANGUAGE
  ) as Lang;
};
