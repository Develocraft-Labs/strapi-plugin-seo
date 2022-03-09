import React, { createContext, useContext } from "react";

export const mockContextValue = {
  isI18nPluginInstalled: true,
  userEnabledLocales: [
    {
      code: "en",
      created_at: "2022-03-04T07:56:18.881Z",
      id: 1,
      isDefault: true,
      name: "English (en)",
      updated_at: "2022-03-04T07:56:18.881Z",
    },
  ],
  defaultLocale: "en",
};

export const LocaleContext = createContext(mockContextValue);

export const useLocaleContext = () => useContext(LocaleContext);

const LocaleContextProvider = ({ children }) => {
  return (
    <LocaleContext.Provider value={mockContextValue}>
      {children}
    </LocaleContext.Provider>
  );
};

export default LocaleContextProvider;
