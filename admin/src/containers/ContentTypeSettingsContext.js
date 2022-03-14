import React from "react";
import useContentTypeSettings from "../hooks/useContentTypeSettings";

const ContentTypeSettingsContext = React.createContext({});

export const useContentTypeSettingsContext = () =>
  React.useContext(ContentTypeSettingsContext);

const ContentTypeSettingsProvider = ({ children }) => {
  const settings = useContentTypeSettings();

  return (
    <ContentTypeSettingsContext.Provider value={settings}>
      {children}
    </ContentTypeSettingsContext.Provider>
  );
};

export default ContentTypeSettingsProvider;
