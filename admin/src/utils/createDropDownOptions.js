import React from "react";

import getLocaleName from "./getLocaleName";

/**
 * Create options for drop down.
 * @param {Array} avaliableTranslations - Processed locales using createTranslation function.
 * @param {Array} userEnabledLocales - Locales enabled in project.
 * @returns {HTMLOptionsCollection} List of options.
 */
const createDropDownOptions = (avaliableTranslations, userEnabledLocales) => {
  return avaliableTranslations.map((translation, index) => {
    const localeDisplayValue = getLocaleName(userEnabledLocales, translation);

    return (
      <option key={index} value={translation} id={index}>
        {localeDisplayValue}
      </option>
    );
  });
};

export default createDropDownOptions;
