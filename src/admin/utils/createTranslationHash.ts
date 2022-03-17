import { ILocale } from '../interfaces/Locales';

/**
 * Create translation map from project locales.
 * @param {*} locales - Project locales.
 * @returns Locales hashmap.
 */
const createTranslationHash = (locales: ILocale[]) => {
  const hash: { [key: string]: string } = {};

  locales.forEach((strapiLocale) => {
    hash[strapiLocale.code] = strapiLocale.code;
  });
  return hash;
};

export default createTranslationHash;
