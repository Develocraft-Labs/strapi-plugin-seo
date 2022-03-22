import { ILocale } from '../interfaces/Locales';

interface IGetLocaleName {
  userEnabledLocales: ILocale[];
  translationCode: string;
}

/**
 * Get local name from locales object.
 * @param userEnabledLocales - Locales enabled in project.
 * @param translationCode - Locale code.
 * @returns  Locale name.
 */
const getLocaleName = ({
  userEnabledLocales,
  translationCode,
}: IGetLocaleName) => {
  if (!userEnabledLocales) return translationCode;

  return userEnabledLocales.filter(
    (userEnabledLocale) => userEnabledLocale.code === translationCode
  )[0]?.name;
};

export default getLocaleName;
