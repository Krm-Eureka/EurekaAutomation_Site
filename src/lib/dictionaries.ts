import 'server-only'

const dictionaries = {
  en: () => import('./dictionaries/en.json').then((module) => module.default),
  th: () => import('./dictionaries/th.json').then((module) => module.default),
}

export type Locale = keyof typeof dictionaries

export const getDictionary = async (locale: Locale) => dictionaries[locale]()
