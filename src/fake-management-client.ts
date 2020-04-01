import { Asset, Entry, EntryFields } from "contentful";
import * as management from "contentful-management";
import * as moment from "moment";
import * as rand from "random-seed";
import { ContentfulStore } from "./contentful-store";

const DEFAULT_LOCALE = "en-AU";

export type TimeSupplier = () => string;

export interface ManagementClientOpts {
  timeSupplier?: TimeSupplier;
}

/**
 * A fake Contentful management client
 */
export class FakeManagementClient<T> {
  random: rand.RandomSeed;
  timeSupplier: TimeSupplier;

  /**
   * Creates a FakeManagementClient
   * @param previewStore - Contains preview entries
   * @param publishedStore - Contains published entries
   * @param opts - Optional setup parameters includes:
   *    timeSupplier - A supplier function that returns the current time in
   *    ISO8601 format. If omitted, current system time is used
   */
  constructor(
    readonly previewStore: ContentfulStore<T>,
    readonly publishedStore: ContentfulStore<T>,
    readonly opts: ManagementClientOpts = {}) {
      // Use a constant seed as this is only intended to be used in test anyway,
      // so we want the results to be reproducible
      this.random = rand.create("32134");
      this.timeSupplier = opts.timeSupplier || (() => moment().toISOString());
  }

  getEntry(id: string): management.Entry | null {
    const previewEntry: Entry<T> | undefined = this.previewStore.getEntryById(id);
    if (!previewEntry) {
      return null;
    }

    const previewFields: {} = previewEntry.fields as {};

    const managementFields = this.generateManagementFieldsShape(previewFields);
    return this.enrichWithEntryMethods({
      fields: managementFields,
      sys: previewEntry.sys,
    });
  }

  createEntry(content_type: string, fields: management.EntryFields) {
    const entry: management.EntryData = {
      sys: {
        id: this.random.string(5),
        createdAt: this.timeSupplier(),
        contentType: {
          sys: {
            type: "Link",
            linkType: "ContentType",
            id: content_type,
          },
        },
        type: "Entry",
      },
      fields,
    };
    const enrichedEntry = this.enrichWithEntryMethods(entry);
    return this.saveEntry(enrichedEntry);
  }

  private getAsset(id: string): management.Asset {
    const previewAsset = this.previewStore.getAssetById(id);
    if (!previewAsset) {
      throw Error(`Asset with ID ${id} does not exist`);
    }

    const updatedFields = this.generateManagementFieldsShape(previewAsset.fields);
    const fileDetails = updatedFields.file;
    if (fileDetails === undefined) {
      throw Error(`An asset needs to have file details ${id}`);
    }
    return this.enrichWithAssetMethods({
      fields: {
        title: updatedFields.title,
        description: updatedFields.description,
        file: fileDetails,
      },
      sys: previewAsset.sys,
    });
  }

  createAssetFromFiles(assetData: management.UploadData): management.Asset {
    const now = this.timeSupplier();
    const createdAsset: management.Upload = {
      sys: {
        id: this.random.string(5),
        createdAt: now,
        updatedAt: now,
        type: "",
        locale: "Unused",
        contentType: {
          sys: {
            type: "Link",
            linkType: "ContentType",
            id: "Unused content type ID", // Don't think this is required
          },
        },

      },
      fields: {
        ...assetData.fields,
        file: new Map([
          [
            DEFAULT_LOCALE, {
              ...assetData.fields.file[DEFAULT_LOCALE],
              // We don't need to store upload details as this fake implmentation does not
              // actually process or store any images
              uploadFrom: "Fake",
            },
          ],
        ]),
      },
    };

    // delete assetData.fields.file[DEFAULT_LOCALE].file;
    // assetData.fields.file[DEFAULT_LOCALE].uploadFrom = "Fake";
    // assetData.sys = {
    //   id: this.random.string(5),
    //   createdAt: this.timeSupplier(),
    //   updatedAt: assetData.sys.createdAt,
    //   type: "Asset",
    //   locale: "Unused",
    //   contentType: {
    //     sys: {
    //       type: "Link",
    //       linkType: "ContentType",
    //       id: "Unused content type ID", // Don't think this is required
    //     },
    //   },

    // };

    return this.enrichWithAssetMethods(createdAsset);
  }

  management() {
    return {
      getEntry: async (id: string) => this.getEntry(id),
      getAsset: async (id: string) => this.getAsset(id),
      createEntry: async (content_type: string, fields: management.EntryFields) =>
        this.createEntry(content_type, fields),
      createAssetFromFiles: async (e: management.UploadData) => this.createAssetFromFiles(e),
    };
  }

  private enrichWithEntryMethods(entry: management.EntryData): management.Entry {
    return {
      ...entry,
      update: async () => this.saveEntry(entry),
      publish: async () => {
        this.publishEntry(entry.sys.id);
        return this.enrichWithEntryMethods(entry);
      },
    };
  }

  /**
   * Clones the entry with the given ID from the preview entries store and
   * stores it in the published entries store
   */
  private publishEntry(id: string): void {
    const previewEntry = this.previewStore.getEntryById(id);
    if (!previewEntry) {
      throw new Error(
        "Expected preview entry with ID: " +
          id +
          " to exist in preview entries store",
      );
    }
    this.publishedStore.setEntry(previewEntry);
  }

  private enrichWithAssetMethods(asset: management.Upload | management.Asset): management.Asset {
    return {
      ...asset,
      processForLocale: (_: string) => this.processAsset(asset),
      publish: () => this.publishAsset(asset),
    };
  }

  private publishAsset(asset: management.Upload | management.Asset) {
    if (asset.fields.file[DEFAULT_LOCALE].uploadFrom) {
      throw Error("Cannot publish an unprocessed asset");
    }

    const previewAsset = this.previewStore.getAssetById(asset.sys.id);
    if (previewAsset === undefined) {
      throw Error(`Cannot publish an asset not in the preview store: ${asset.sys.id}`);
    }
    this.publishedStore.setAsset(previewAsset);
    return asset;
  }

  private processAsset(asset: management.Upload | management.Asset): management.Asset {
    const processedAsset = { ...asset };
    processedAsset.sys.type = "Asset";
    processedAsset.sys.updatedAt = this.timeSupplier();

    function getFieldOrDefault(
      field: management.EntryField | undefined,
      key: string,
      defaultVal: management.FieldValueType): management.FieldValueType {
        if (field === undefined) {
          return defaultVal;
        }

        const val = field[key];
        return val === undefined ? defaultVal : val;
    }

    const deliveryAsset: Pick<Asset, "sys" | "fields"> = {
      sys: { ...processedAsset.sys },
      fields: {
        title: getFieldOrDefault(processedAsset.fields.title, DEFAULT_LOCALE, "Unknown title") as string,
        description: getFieldOrDefault(processedAsset.fields.description,
                                       DEFAULT_LOCALE, "Unknown description") as string,
        file: {
          url: "//fakeimage",
          details: {
            size: 9999999,
            image: {
              width: 9999,
              height: 9999,
            },
          },
          fileName: processedAsset.fields.file[DEFAULT_LOCALE].fileName,
          contentType: processedAsset.fields.file[DEFAULT_LOCALE].contentType,
        },
      },
    };

    const toPlainObject = () => JSON.parse(JSON.stringify(deliveryAsset));
    this.previewStore.setAsset({
      ...deliveryAsset,
      toPlainObject,
    });
    return this.enrichWithAssetMethods(processedAsset);
  }

  private generateManagementFieldsShape(deliveryFields: {}): management.EntryFields {

      const updatedFields: management.EntryFields = {};
      const fieldNames = Object.keys(deliveryFields);

      for (const fieldName of fieldNames) {
        updatedFields[fieldName] = {
          DEFAULT_LOCALE: deliveryFields[fieldName],
        };
      }
      return updatedFields;
  }

  /**
   * Returns a copy of the given contentful management entry object with the
   * field data converted to the shape of a contentful delivery object
   */
  private convertFieldsToContentfulDelivery(entry: management.EntryData): Entry<T> {
    // Create a deep clone
    const clonedEntry = JSON.parse(JSON.stringify(entry));
    const updatedFields = {};
    const fieldNames = Object.keys(clonedEntry.fields);

    for (const fieldName of fieldNames) {
      updatedFields[fieldName] = clonedEntry.fields[name][DEFAULT_LOCALE];
    }
    clonedEntry.fields = updatedFields;
    return clonedEntry;
  }

  private saveEntry(entry: management.EntryData): management.Entry {
    entry.sys.updatedAt = this.timeSupplier();
    this.previewStore.setEntry(this.convertFieldsToContentfulDelivery(entry));
    return this.enrichWithEntryMethods(entry);
  }
}
