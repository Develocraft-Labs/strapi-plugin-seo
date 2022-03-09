import React from "react";

import TextField from "../Inputs/TextField";
import RichText from "../Inputs/RichText";
import JsonLd from "../Inputs/JsonLd";
import styled from "styled-components";
import { FlexWrapRow } from "../../components/ui/common";

const SeoForm = styled.form`
  display: flex;
  width: 100%;
  background-color: white;
  flex-direction: column;
`;

const Form = ({
  handleChange,
  handleSubmit,
  titleValue,
  metaDescriptionValue,
  jsonLdValue,
  ogTitleValue,
  ogTypeValue,
  ogUrlValue,
  ogImageValue,
  errors,
}) => {
  return (
    <SeoForm onSubmit={handleSubmit}>
      <FlexWrapRow>
        <RichText
          title="Title"
          name="title"
          value={titleValue}
          errors={errors?.title}
          onChange={handleChange}
        />
        <RichText
          title="Meta Description"
          name="metaDescription"
          errors={errors?.title}
          value={metaDescriptionValue}
          onChange={handleChange}
        />
      </FlexWrapRow>
      <FlexWrapRow>
        <RichText
          title="Og Title"
          name="ogTitle"
          value={ogTitleValue}
          onChange={handleChange}
        />
        <RichText
          title="Og Type"
          name="ogType"
          value={ogTypeValue}
          onChange={handleChange}
        />
      </FlexWrapRow>
      <FlexWrapRow>
        <TextField
          title="OgUrl"
          name="ogUrl"
          value={ogUrlValue}
          onChange={handleChange}
        />
        <TextField
          title="OgImage"
          name="ogImage"
          value={ogImageValue}
          onChange={handleChange}
        />
      </FlexWrapRow>
      <JsonLd
        title="JsonLd"
        name="jsonLd"
        onChange={handleChange}
        value={jsonLdValue}
      />
    </SeoForm>
  );
};

export default Form;
