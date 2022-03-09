/**
 * Create translation map from project locales.
 * @param {*} locales - Project locales.
 * @returns Locales hashmap.
 */
const createTranslationObject = (locales) => {
  const hash = {};
  locales.map((strapiLocale) => {
    hash[strapiLocale.code] = strapiLocale.code;
    return;
  });
  return hash;
};

export default createTranslationObject;
