import { useEffect } from "react";
import { request } from "strapi-helper-plugin";

const { useState } = require("react");

const fetchSettings = async (setSettings) => {
  const settings = await request("/content-manager/content-types-settings");
  setSettings(settings.data);
};

const useCollectionTypeSettings = () => {
  const [settings, setSettings] = useState(null);

  useEffect(() => {
    fetchSettings(setSettings);
  }, []);

  return settings;
};

export default useCollectionTypeSettings;
