import { Asset, Entry } from "contentful";

/**
 * Stores contentful data of type T
 */
export class ContentfulStore<T> {
  /**
   * Creates a contentful store
   * @param entries - Map of Contentful entries keyed by their Contentful ID
   * @param assets - Map of Contentful assets keyed by their Contentful ID
   */
  constructor(
    readonly entries: Map<string, Entry<T>>,
    readonly assets: Map<string, Asset>,
  ) {}

  /**
   * Returns a deep clone of all entries in the store
   */
  getEntries(): Map<string, Entry<T>> {
    return this.cloneEntries();
  }

  /**
   * Returns a deep clone of all assets in the store
   */
  getAssets(): Map<string, Asset> {
    return this.cloneAssets();
  }

  /**
   * Returns a clone of the entry with the given ID or undefined if it doesn't exist
   * @param id the ID of the entry to be retrieved
   */
  getEntryById(id: string): Entry<T> | undefined {
    const entry = this.entries.get(id);
    return entry ? this.deepClone(entry) : undefined;
  }

  /**
   * Returns a clone of the asset with the given ID or undefined if it doesn't exist
   * @param id The ID of the asset to be retrieved
   */
  getAssetById(id: string): Asset | undefined {
    const asset = this.assets.get(id);
    return asset ? this.deepClone(asset) : undefined;
  }

  /**
   * Stores a copy of the given entry in the store overwriting any previously stored entry
   * @param entry The entry to be stored
   */
  setEntry(entry: Entry<T>) {
    this.entries.set(entry.sys.id, this.deepClone(entry));
  }

  /**
   * Stores a copy of the given asset in the store overwriting any previously stored asset
   * @param asset the asset to be stored
   */
  setAsset(asset: Asset) {
    this.assets.set(asset.sys.id, this.deepClone(asset));
  }

  private cloneEntries(): Map<string, Entry<T>> {
    const cloned = new Map<string, Entry<T>>();
    this.entries.forEach(
      (entry) => cloned.set(entry.sys.id, this.deepClone(entry)),
    );
    return cloned;
  }

  private cloneAssets(): Map<string, Asset> {
    const cloned = new Map<string, Asset>();
    this.assets.forEach(
      (asset) => cloned.set(asset.sys.id, this.deepClone(asset)),
    );
    return cloned;
  }

  private deepClone<Y>(entry: Y): Y {
    return JSON.parse(JSON.stringify(entry));
  }
}
