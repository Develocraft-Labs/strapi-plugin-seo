import { ILocale } from './Locales';

export interface ILocaleContext {
  isI18nPluginInstalled: boolean;
  userEnabledLocales: ILocale[];
  defaultLocale: string;
}
