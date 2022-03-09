import React, { memo, useCallback } from "react";
import { useParams, useHistory } from "react-router";
import { LoadingIndicatorPage } from "strapi-helper-plugin";
import Preview from "./Preview";

import BackArrow from "./ui/Svgs/Back";
import styled from "styled-components";
import { Column } from "./components/ui/common";
import saveSeoToItem from "./utils/saveSeoToItem";
import { deleteSeo } from "./api/seoApi";
import useResource from "./hooks/useResource";
import useSeoDetails from "./hooks/useSeoDetails";
import pluginId from "./pluginId";

const BackButton = styled.button`
  padding: 0.5rem 0rem;
  width: fit-content;
  margin-bottom: 2rem;
`;

const DetailsContainer = styled(Column)`
  position: relative;
  padding: 0px 30px 66px;
  max-width: 100%;
`;

const Details = () => {
  const { uid, locale, seoName, collectionTypeId, id } = useParams();
  const history = useHistory();
  const resource = useResource(uid, collectionTypeId);
  const { isLoading } = resource;

  const selectedSeo = useSeoDetails({ locale, seoName });
  const handleBackButton = () => {
    history.push("/plugins/seo");
  };
  const handleSave = useCallback((seo) => {
    selectedSeo.setSeo(seo);
    history.replace(
      `/plugins/${pluginId}/${uid}/details/${id}/${locale}/${seo.seoName}/${collectionTypeId}`
    );
  });

  const handleDeleteSeo = async ({ id }) => {
    const response = await deleteSeo({ id });

    if (response) {
      const seo = null;
      const id = +collectionTypeId;

      await saveSeoToItem({ seo, uid, id });

      handleBackButton();
    }
  };
  if (isLoading || selectedSeo.isLoading) {
    return <LoadingIndicatorPage />;
  }

  return (
    <DetailsContainer fullWidth>
      <BackButton onClick={handleBackButton}>
        <BackArrow />
      </BackButton>
      <Preview
        locale={locale}
        selectedSeo={selectedSeo.seo}
        resource={resource}
        onSave={handleSave}
        handleDeleteSeo={handleDeleteSeo}
        collectionTypeId={collectionTypeId}
      />
    </DetailsContainer>
  );
};

export default memo(Details);
