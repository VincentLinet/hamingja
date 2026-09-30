import * as English from "./english";
import * as French from "./french";

const LOCALES = { english: English, french: French };

export const load = (locale) => LOCALES[locale] ?? LOCALES.english;
