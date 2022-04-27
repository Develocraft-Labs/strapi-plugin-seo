import React from "react";
import { capitalize } from "lodash";
import { Column, ellipsisCss, EvenColumn } from "../ui/common";
import styled from "styled-components";
import useContentTypeSettings from "../../hooks/useContentTypeSettings";

const CollectionName = styled.h3`
  width: 100%;
  margin: 0px;
  font-size: 1.3rem;
  font-weight: 400;
  line-height: normal;
  color: rgb(120, 126, 143);
  ${ellipsisCss}
`;

/**
 * Component that renders a Content Types resource details.
 * @returns {JSX.Element} Resource details.
 */
const ResourceDetails = ({
  resource: { resourceData, resourceSchema },
  uid,
}) => {
  const settings = useContentTypeSettings();
  const setting = settings[uid];
  const mainField = setting?.settings?.mainField;
  const { collectionName } = resourceSchema.schema;
  const title = resourceData[mainField];

  return (
    <Column>
      <EvenColumn>
        {!!title && <h2 data-testid="resource-title">{capitalize(title)}</h2>}
        <CollectionName data-testid="resource-collection-title">{`API ID : ${collectionName}`}</CollectionName>
      </EvenColumn>
    </Column>
  );
};

export default ResourceDetails;
