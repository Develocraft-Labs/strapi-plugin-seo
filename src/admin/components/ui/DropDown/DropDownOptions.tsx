import React from 'react';

// @ts-ignore
import { Option } from '@strapi/design-system/Select';

import getLocaleName from '../../../utils/getLocaleName';
import { ILocale } from '../../../interfaces/Locales';

interface IDropDownOptions {
  avaliableTranslations: string[];
  userEnabledLocales: ILocale[];
}

/**
 * Create options for drop down.
 * @param avaliableTranslations - Processed locales using createTranslation function.
 * @param  userEnabledLocales - Locales enabled in project.
 * @returns {HTMLOptionsCollection} List of options.
 */
const DropDownOptions = ({
  avaliableTranslations,
  userEnabledLocales,
}: IDropDownOptions) =>
  avaliableTranslations.map((translationCode: string, index: number): any => {
    const localeDisplayValue = getLocaleName({
      userEnabledLocales,
      translationCode,
    });

    return (
      // eslint-disable-next-line react/no-array-index-key
      <Option key={index} value={translationCode} id={index}>
        {localeDisplayValue}
      </Option>
    );
  });
export default DropDownOptions;
