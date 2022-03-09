import React from "react";
import { Select } from "strapi-helper-plugin";

import createDropDownOptions from "../../utils/createDropDownOptions";
import styled from "styled-components";
import { useLocaleContext } from "../../containers/LocaleContextProvider/LocaleContextProvider";
import createTranslationObject from "../../utils/createTranslations";

const TranslationSelectContainer = styled.div`
  margin: 0rem 0rem 1.5rem 0rem;
  background-color: #ffffff;
  border-radius: 2px;
  min-width: 20%;
  max-width: 20%;
  align-self: flex-end;
`;

/**
 * Component that renders a dropdown with avaliable locales.
 * @returns {JSX.Element} Drop down.
 */
const TranslationPicker = ({ handleTranslation, value }) => {
  const { userEnabledLocales } = useLocaleContext();

  const translations = createTranslationObject(userEnabledLocales);

  if (!translations) return <option></option>;

  const availableTranslations = Object.keys(translations);
  const translationsLength = availableTranslations?.length;
  let options = [];

  if (translationsLength && translationsLength > 0 && userEnabledLocales)
    options = createDropDownOptions(availableTranslations, userEnabledLocales);

  return (
    <TranslationSelectContainer>
      <Select
        style={{
          maxWidth: "200px",
          fontSize: "1.3rem",
          alignSelf: "center",
        }}
        selectedValue={value}
        onChange={handleTranslation}
      >
        {options}
      </Select>
    </TranslationSelectContainer>
  );
};

export default TranslationPicker;
