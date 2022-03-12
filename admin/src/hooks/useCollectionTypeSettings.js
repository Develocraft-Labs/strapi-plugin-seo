import { useEffect } from "react";
import { request } from "strapi-helper-plugin";
import { keyBy } from "lodash";

const { useState } = require("react");

const fetchSettings = async (setSettings) => {
  const settings = await request("/content-manager/content-types-settings");
  // store settings by uid to make them easier to access later
  setSettings(keyBy(settings.data, "uid"));
};

const useCollectionTypeSettings = () => {
  const [settings, setSettings] = useState(null);

  useEffect(() => {
    fetchSettings(setSettings);
  }, []);

  return settings;
};

export default useCollectionTypeSettings;
