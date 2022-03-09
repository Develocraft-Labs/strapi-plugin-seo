/**
 * Get local name from locales object.
 * @param {Array} userEnabledLocales - Locales enabled in project.
 * @param {String} code - Locale code.
 * @returns {String} Locale name.
 */
const getLocaleName = (userEnabledLocales, code) => {
  if (!userEnabledLocales) return code;

  return userEnabledLocales.filter(
    (userEnabledLocale) => userEnabledLocale.code === code
  )[0]?.name;
};

export default getLocaleName;
