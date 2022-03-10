import { request } from "strapi-helper-plugin";
import pluginId from "../pluginId";

export const createSeo = (seo) =>
  request(`/${pluginId}/create`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: seo,
  });

export const findSeo = ({ seoName }) =>
  request(`/${pluginId}/find/${seoName}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

export const updateSeo = (seo) =>
  request(`/${pluginId}/update/${seo.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: seo,
  });

export const deleteSeo = ({ id }) =>
  request(`/${pluginId}/delete/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });
