import { useEffect, useState } from "react";
import { findSeo } from "../api/seoApi";
import showErrorNotification from "../utils/errorNotification";

const useSeoDetails = ({ seoName }) => {
  const [seo, setSeo] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (seoName === "newSeo") {
      setIsLoading(false);
      return;
    }
    try {
      const fetchSeo = async () => {
        const seo = await findSeo({ seoName });

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
