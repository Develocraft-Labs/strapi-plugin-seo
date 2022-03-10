import React, { useCallback, useMemo, useState } from "react";
import { useParams } from "react-router";
import { LoadingIndicator } from "strapi-helper-plugin";
import isEqual from "lodash/isEqual";
import { useLocaleContext } from "./containers/LocaleContextProvider/LocaleContextProvider";
import GooglePreview from "./components/GooglePreview/GooglePreview";
import limitString from "./utils/limitString";
import Form from "./ui/Forms/Seo";
import createRelation from "./utils/createRelation";
import { checkMetaDescriptionLength, checkTitleLength } from "./utils";
import showErrorNotification from "./utils/errorNotification";
import Resource from "./components/ResourceDetails/ResourceDetails";

import {
  JSONLD,
  METADESCRIPTION,
  TITLE,
  OGIMAGE,
  OGTITLE,
  OGTYPE,
  OGURL,
} from "./utils/constants";
import TrashCan from "./ui/Svgs/TrashCan";
import SaveButton from "./components/ui/SaveButton";
import { BoxColumn, Column, Row } from "./components/ui/common";
import styled from "styled-components";
import saveSeoToItem from "./utils/saveSeoToItem";
import { createSeo, updateSeo } from "./api/seoApi";
import getSeoCollectionTypeName from "./utils/getSeoCollectionTypeName";
import useFormValidations, { ValidatedForm } from "./hooks/useFormValidations";

const SideButton = styled.button`
  color: ${(p) => p.color || "rgb(246, 77, 10)"};
  align-items: center;
  cursor: pointer;
  display: flex;
  flex: 1;
  justify-content: normal;
  flex-flow: row nowrap;
  line-height: 22px;
  width: 100%;
  margin-left: 0.2rem;
  padding: 7px 20px;
  & + & {
    border-top: 1px solid #f6f6f6;
  }
`;

const MainContent = styled.div`
  background-color: #ffffff;
  border-radius: 2px;
  box-shadow: 0 2px 4px #e3e9f3;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  position: relative;
  flex: 7;
  /**
    Hacky fix to limit width when monaco isn't resizing correctly
  */
  @media (min-width: 1439px) {
    max-width: ${(p) => (p.hasSidebar ? 70 : 100)}%;
  }
`;

const Sidebar = styled.div`
  display: flex;
  flex-direction: column;
  flex: 3;
  > * + * {
    margin-top: 2rem;
  }
`;

const Container = styled.div`
  display: flex;
  flex-direction: row-reverse;
  flex: 1;
  justify-content: space-between;

  position: relative;
  margin-left: -2rem;
  > * {
    margin-left: 2rem;
  }
  @media (max-width: 1439px) {
    flex-direction: column-reverse;
    margin-left: 0rem;
    margin-top: -2rem;

    > * {
      margin-left: 0rem;
      margin-top: 2rem;
    }
  }
`;

const fieldsConfig = {
  [TITLE]: {
    required: true,
  },
  [METADESCRIPTION]: {
    required: true,
  },
  [JSONLD]: {
    type: "json",
  },
  [OGTYPE]: {
    required: true,
  },
  [OGTITLE]: {
    required: true,
  },
  [OGIMAGE]: {
    required: true,
  },
  [OGURL]: {
    required: true,
  },
};

const PreviewHeader = styled(Row)`
  justify-content: space-between;
  padding: 1.5rem 0rem 3rem 0rem;
  margin-bottom: 2rem;
`;

const Preview = ({
  selectedSeo,
  onSave,
  resource,
  handleDeleteSeo,
  collectionTypeId,
  locale,
}) => {
  const [titleValue, setTitleValue] = useState(selectedSeo?.title || "");
  const [metaDescriptionValue, setMetaDescriptionValue] = useState(
    selectedSeo?.metaDescription || ""
  );
  const { isI18nPluginInstalled } = useLocaleContext();

  const [jsonLdValue, setJsonLdValue] = useState(selectedSeo?.jsonLd || "{}");
  const [ogTitleValue, setOgTitleValue] = useState(selectedSeo?.ogTitle || "");
  const [ogTypeValue, setOgTypeValue] = useState(selectedSeo?.ogType || "");
  const [ogUrlValue, setOgUrlValue] = useState(selectedSeo?.ogUrl || "");
  const [ogImageValue, setOgImageValue] = useState(selectedSeo?.ogImage || "");
  const [creation, setCreation] = useState(
    resource?.resourceSchema?.schema?.attributes?.seo == null
  );
  const [creationMsg, setCreationMsg] = useState("");
  const [saving, setSaving] = useState(false);
  const [active, setActive] = useState(false);
  const { uid, id } = useParams();

  const seo = useMemo(
    () => ({
      id: selectedSeo?.id,
      title: titleValue,
      metaDescription: metaDescriptionValue,
      jsonLd: jsonLdValue,
      ogType: ogTypeValue,
      ogTitle: ogTitleValue,
      ogUrl: ogUrlValue,
      ogImage: ogImageValue,
      locale: selectedSeo?.locale || locale,
      collectionTypeName:
        selectedSeo?.collectionTypeName || getSeoCollectionTypeName(resource),
      seoUid: selectedSeo?.seoUid,
    }),
    [
      selectedSeo,
      titleValue,
      metaDescriptionValue,
      jsonLdValue,
      ogTypeValue,
      ogTitleValue,
      ogUrlValue,
      ogImageValue,
      locale,
      resource,
    ]
  );

  const validation = useFormValidations({ fields: fieldsConfig, values: seo });
  const { validateForm } = validation;

  const modified = useMemo(() => {
    /*eslint no-unused-vars: ["error", { "ignoreRestSiblings": true }]*/
    if (!selectedSeo) {
      return true;
    }
    const {
      created_at,
      updated_at,
      created_by,
      updated_by,
      ...selectedSeoData
    } = selectedSeo;
    return !isEqual(selectedSeoData, seo);
  }, [selectedSeo, seo]);

  const handleSave = useCallback(
    async (e) => {
      e.preventDefault();
      const valid = validateForm(seo);
      if (!valid) {
        return;
      }
      try {
        setSaving(true);
        const response = await (seo?.id ? updateSeo(seo) : createSeo(seo));
        await saveSeoToItem({ seo: response, uid, id: collectionTypeId });

        onSave(response);
      } catch (ex) {
        showErrorNotification(ex.message);
      }
      setSaving(false);
    },
    [seo, onSave, collectionTypeId, uid, validateForm]
  );

  const handleRelation = async () => {
    await createRelation(resource.resourceSchema.schema, uid);

    setCreationMsg("Created Relation");
    setCreation(false);
  };

  const handleInputs = useCallback(
    (name, value) => {
      if (name === JSONLD) setJsonLdValue(value);
      else if (name === OGTITLE) setOgTitleValue(value);
      else if (name === OGTYPE) setOgTypeValue(value);
      else if (name === OGURL) setOgUrlValue(value);
      else if (name === OGIMAGE) setOgImageValue(value);
      else if (name === TITLE) {
        setTitleValue(value);
        checkTitleLength(titleValue);
      } else if (name === METADESCRIPTION) {
        setMetaDescriptionValue(value);
        checkMetaDescriptionLength(metaDescriptionValue);
      }
    },
    [titleValue, metaDescriptionValue]
  );

  const handleChange = useCallback(
    (e) => {
      const name = e.target.name;
      const value = e.target.value;
      setActive(true);
      handleInputs(name, value);
    },
    [handleInputs]
  );

  return (
    <Column>
      <PreviewHeader>
        <Resource resource={resource} />
        {creation ? (
          <SaveButton onClick={handleRelation}>
            {creationMsg ? creationMsg : "Create Relation"}
          </SaveButton>
        ) : (
          <SaveButton disabled={!active || !modified} onClick={handleSave}>
            {saving ? <LoadingIndicator small={true} /> : "Save"}
          </SaveButton>
        )}
      </PreviewHeader>
      <Container>
        {selectedSeo && (
          <Sidebar>
            <BoxColumn>
              <GooglePreview
                metaDescription={
                  metaDescriptionValue?.length >= 160
                    ? limitString(metaDescriptionValue, 0, 156)
                    : metaDescriptionValue
                }
                title={
                  titleValue?.length >= 70
                    ? limitString(titleValue, 0, 66)
                    : titleValue
                }
                ogUrl={ogUrlValue}
              />
            </BoxColumn>
            <BoxColumn padding={0}>
              <SideButton onClick={() => handleDeleteSeo({ id })}>
                <TrashCan />
                Delete this entry
              </SideButton>
            </BoxColumn>
          </Sidebar>
        )}
        <MainContent hasSidebar={!!selectedSeo}>
          <h3>Seo</h3>
          <Column fullWidth>
            {!!isI18nPluginInstalled && (
              <>
                <h3>Locale</h3>
                <p>{selectedSeo?.locale || locale}</p>
              </>
            )}
          </Column>
          <ValidatedForm context={validation}>
            <Form
              key={seo?.id}
              handleChange={handleChange}
              handleSubmit={handleSave}
              titleValue={titleValue}
              metaDescriptionValue={metaDescriptionValue}
              jsonLdValue={jsonLdValue}
              ogTitleValue={ogTitleValue}
              ogTypeValue={ogTypeValue}
              ogUrlValue={ogUrlValue}
              ogImageValue={ogImageValue}
            />
          </ValidatedForm>
        </MainContent>
      </Container>
    </Column>
  );
};

export default Preview;
