// @ts-ignore
import { Select, Option } from '@strapi/design-system/Select';
import React, { FC } from 'react';

import { useLocaleContext } from '../../containers/LocaleContextProvider/LocaleContextProvider';
import createTranslationHash from '../../utils/createTranslationHash';
import DropDownOptions from '../ui/DropDown/DropDownOptions';

interface ITranslationPicker {
  handleTranslation: (selectedValue: string) => void;
  value: string;
}

const TranslationPicker: FC<ITranslationPicker> = ({
  handleTranslation,
  value,
}) => {
  const { userEnabledLocales } = useLocaleContext();

  const translations = createTranslationHash(userEnabledLocales);
  if (!translations) return <Option />;

  const avaliableTranslations = Object.keys(translations);
  const translationsLength = avaliableTranslations?.length;

  if ((!translationsLength && translationsLength < 0) || !userEnabledLocales) {
    return <div />;
  }

  return (
    <Select value={value} onChange={handleTranslation}>
      {DropDownOptions({ avaliableTranslations, userEnabledLocales })}
    </Select>
  );
};

export default TranslationPicker;
