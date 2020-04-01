import { Sys, ContentTypeLink } from "contentful";

export interface EntryData {
  sys: EntryMeta;
  fields: EntryFields;
}

export interface EntryFields {
  [name: string]: EntryField;
}

export interface Entry extends EntryData {
  update(): Promise<Entry>;
  publish(): Promise<Entry>;
}

export interface Asset extends Upload {
  processForLocale(locale: string): void;
  publish(): void;
}

export interface UploadData {
  fields: AssetFields;
}

export interface Upload extends UploadData {
  sys: Sys
}

export interface AssetFields {
  title?: EntryField;
  description?: EntryField;
  file: EntryField;
}

export type Locale = string;

export type FieldValueType = string | number | File;

export interface File {
  contentType: string;
  fileName: string;
  file: {};
  /**
   * Present if the asset has not been processed
   */
  uploadFrom?: string;
}

export interface StoredFile extends File {
}

export interface StoredAssetFields extends AssetFields {
  file: StoredFile;
}

export interface StoredAssetData {
  sys: EntryMeta;
  fields: StoredAssetFields;
}

export type EntryField = {
  [locale: Locale]: FieldValueType;
};

export interface Link {
  type: "Link";
  id: string;
  linkType?: string;
}

export type MetaType = Link;

export interface Meta<ContentTypeLink> {
  sys: MetaType
}