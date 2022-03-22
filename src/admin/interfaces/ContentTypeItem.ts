import { ISeo } from './Seo';

interface IStrapiUser {
  firstname: string;
  id: number;
  lastname: string;
  username: string;
}

export interface IContentTypeItem {
  collectionName: string;
  createdAt: string;
  createdBy: IStrapiUser;
  id: number;
  isI18nEnabled: boolean;
  locale: string;
  publishedAt: string;
  title: string;
  uid: string;
  updatedAt: string;
  updatedBy: IStrapiUser;
  seo?: ISeo;
}

export interface IPagination {
  page: number;
  pageCount: number;
  pageSize: number;
  total: number;
}

export interface IContentType {
  collectionName: string;
  fullResults: IContentTypeItem[];
  pagination: IPagination;
  results?: IContentTypeItem[];
  uid: string;
  isI18nEnabled: boolean;
}
