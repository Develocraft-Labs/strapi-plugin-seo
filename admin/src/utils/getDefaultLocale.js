/**
 * Get default locale from locales list.
 * @param locales - locales list
 * @returns  Object.
 */
const getDefaultLocale = (locales) => {
  if (!locales) return;
  const localesLength = locales && locales.length;
  if (localesLength === 1) return locales[0]?.code;
  return locales.filter((locale) => locale.isDefault === true)[0]?.code;
};

export default getDefaultLocale;
