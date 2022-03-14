import { useEffect, useState } from "react";
import { useHistory } from "react-router";

import { findSeo } from "../api/seoApi";
import showErrorNotification from "../utils/errorNotification";

const useSeoDetails = ({ seoUid, resource }) => {
  const [seo, setSeo] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const history = useHistory();

  useEffect(() => {
    if (resource?.isLoading) return;
    if (resource?.resourceData?.seo && !resource?.resourceData?.seo?.seoUid) {
      history.push("/plugins/seo");
    }
  }, [resource]);

  useEffect(() => {
    if (seoUid === "newSeo") {
      setIsLoading(false);
      return;
    }
    try {
      const fetchSeo = async () => {
        const seo = await findSeo({ seoUid });

        setSeo(seo);
      };

      fetchSeo();
    } catch (error) {
      showErrorNotification(error);
    }
    setIsLoading(false);
  }, []);

  return { seo, isLoading, setSeo };
};

export default useSeoDetails;
