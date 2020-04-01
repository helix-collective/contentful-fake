// tslint:disable-next-line:no-implicit-dependencies
import { Asset, Entry, EntryCollection } from "contentful";
import { ContentfulStore } from "./contentful-store";
import { FakeDeliveryClient } from "./fake-delivery-client";
import { FakeManagementClient, ManagementClientOpts } from "./fake-management-client";

export type FakeCollection<T> = Pick<EntryCollection<T>, "items" | "includes">;

/**
 * A factory that produces fake Contentful components. The entries of which are
 * represented by type T
 */
export class FakeContentfulFactory<T> {
  private previewStore: ContentfulStore<T>;
  private publishedStore: ContentfulStore<T>;

  /**
   * Creates a FakeContentfulFactory using data loaded in
   * @param data Any number of json blobs that have the shape of a contentful CDA getEntries query response.
   * That is * something like this:
   * ```
   * {
   *   "sys": { "type": "Array" }
   *   ...
   *   items: [..]
   *   includes: {
   *     Entry: [..],
   *     Asset: [..],
   *   }
   * }
   */
  constructor(...data: FakeCollection<T>[]) {
    this.previewStore = FakeContentfulFactory.load(data);
    this.publishedStore = new ContentfulStore(
      this.previewStore.getEntries(),
      this.previewStore.getAssets(),
    );
  }

  preview(): FakeDeliveryClient<T> {
    return new FakeDeliveryClient(this.previewStore);
  }

  published(): FakeDeliveryClient<T> {
    return new FakeDeliveryClient(this.publishedStore);
  }

  management(opts: ManagementClientOpts): FakeManagementClient<T> {
    return new FakeManagementClient(
      this.previewStore,
      this.publishedStore,
      opts,
    );
  }

  /**
   * Exposed for testing only
   */
  getPreviewStore() {
    return this.previewStore;
  }

  /**
   * Exposed for testing only
   */
  getPublishedStore() {
    return this.publishedStore;
  }

  /**
   * Loads data from the given json blob and produces a contentful store
   * that queries this data
   *
   */
  private static load<T>(data: FakeCollection<T>[]) {
    const entries = new Map<string, Entry<T>>();
    const assets = new Map<string, Asset>();

    data.forEach((d) => {
      d.items.forEach((e) => entries.set(e.sys.id, e));

      if (d.includes) {
        const referencedEntries = d.includes.Entry || [];
        referencedEntries.forEach((e: Entry<T>) => entries.set(e.sys.id, e));

        const referencedAssets = d.includes.Asset || [];
        referencedAssets.forEach((e: Asset) => assets.set(e.sys.id, e));
      }
    });

    return new ContentfulStore(entries, assets);
  }
}
