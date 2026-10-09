import * as English from "./english";
import * as French from "./french";

const LOCALES = { english: English, french: French };

const FALLBACKS = { english: "french", french: "english" };

export const load = (locale) => {
  const primary = LOCALES[locale] ?? LOCALES.english;
  const fallback = LOCALES[FALLBACKS[locale]] ?? LOCALES.french;
  return { ...fallback, ...primary };
};
