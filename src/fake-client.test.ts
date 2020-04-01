import { Entry, EntryCollection } from "contentful";
import { EntryData, EntryFields } from "contentful-management";
import * as moment from "moment";
import { formatWithOptions } from "util";
import { ContentfulStore } from "./contentful-store";
import { FakeCollection, FakeContentfulFactory } from "./fake-contentful-factory";
import * as fakeOffer from "./fake-data/fake-offer-entry";
import * as fakeStore from "./fake-data/fake-store-entry";
import * as user from "./fake-data/partner-portal-user";
import * as posts from "./fake-data/retailer-posts";
import * as stores from "./fake-data/stores";
import { ContentfulQuery, FakeDeliveryClient, FieldValue } from "./fake-delivery-client";

const DEFAULT_LOCALE = "en-AU";

describe("In Memory Contentful Client tests", () => {
  const factory = new FakeContentfulFactory<{}>(
    require("./fake-data/manual-only-template-with-deps.json"),
  );
  const preview = factory.preview();

  const TOTAL_ENTRIES: number = Object.keys(factory.getPreviewStore().getEntries()).length;

  // Constants

  describe("Query Predicates", () => {
    // Helpers to create/ignore a predicate test
    function t(description: string, query: ContentfulQuery, total: number) {
      it(description, async () => {
        const updatedQuery: ContentfulQuery = { ...query };
        updatedQuery.include = 0;
        const entries = await preview.getEntries(
          query,
        );
        expect(entries.total).toBe(total);
        expect(entries.items).toHaveLength(total);
      });
    }

    describe("content_type", () => {
      t("Template", { content_type: "template" }, 1);
      t("centre", { content_type: "centre" }, 2);
    });

    t(
      "Should return all entries, as there are no query predicates",
      {},
      TOTAL_ENTRIES,
    );

    describe("eq/neq", () => {
      t(
        "Should filter by the given sys.id value",
        { "sys.id": "7ejiK8zKk8OESkWua4uQSE" },
        1,
      );
      t(
        "Should return no entries, as the given sys.id is non existent in the test data set",
        { "sys.id": "not-a-contentful-id" },
        0,
      );
      t(
        "Should filter a single entry (the template). As it's the only object " +
        "with a field called 'path' with a value 'test-tpl'",
        {
          "fields.path[ne]": "test-tpl",
        },
        TOTAL_ENTRIES - 1,
      );
    });

    describe("in/nin", () => {
      t(
        "Should only return objects where the centre array contains at least one object with the given ides",
        {
          "fields.centres.sys.id[in]": "3X0qIsAwoEMaaYaQWE8ykE,not-a-real-id",
        },
        1,
      );
      t(
        "Should return all objects where the centre array *does not* contain " +
        "at least one object with the given ids. Inverse if [in]",
        {
          "sys.id[nin]": "3X0qIsAwoEMaaYaQWE8ykE,not-a-real-id",
        },
        TOTAL_ENTRIES - 1,
      );
      t(
        "Should only return objects where the id is in the given list. The " +
        "same semantics as the SQL in clause",
        { "sys.id[in]": "3X0qIsAwoEMaaYaQWE8ykE,not-a-real-id" },
        1,
      );
      t(
        "Should only filter objects where the id is in the given list. Inverse of [in]",
        { "sys.id[nin]": "3X0qIsAwoEMaaYaQWE8ykE,not-a-real-id" },
        TOTAL_ENTRIES - 1,
      );
    });

    describe("exists", () => {
      t(
        "Should return a single entry, as only templates have a path field",
        { "fields.path[exists]": true },
        1,
      );
      t(
        "Should filter all entries with a path field",
        { "fields.path[exists]": false },
        TOTAL_ENTRIES - 1,
      );
    });

    describe("lt/lte/gt/gte", () => {
      t(
        "All entries created before the given timestamp",
        { "sys.createdAt[lt]": "2018-02-03T13:14:27.617Z" },
        1,
      );
      t(
        "ALl entries created on or before the given timestamp",
        { "sys.createdAt[lte]": "2018-02-03T13:14:27.617Z" },
        2,
      );
      t(
        "All entries greater than the given timestamp",
        { "sys.createdAt[gt]": "2018-02-03T13:14:27.617Z" },
        TOTAL_ENTRIES - 2,
      );
      t(
        "All entries greater than or equal to the given timestamp",
        { "sys.createdAt[gte]": "2018-02-03T13:14:27.617Z" },
        TOTAL_ENTRIES - 1,
      );
      t(
        "Returns nothing, as there can never be a revision less than 1",
        { "sys.revision[lt]": 1 },
        0,
      );
      t(
        "Returns all entries with a revision equal t 1",
        { "sys.revision[lte]": 1 },
        12,
      );
      t(
        "Returns all entries with a revision greater than 10",
        { "sys.revision[gt]": 10 },
        1,
      );
      t(
        "Returns all entries with a revision greater than or equal to 1",
        { "sys.revision[gte]": 1 },
        TOTAL_ENTRIES,
      );
    });

    t(
      "Returns all entries where the title has the text 'and'",
      { "fields.title[match]": "aNd" },
      8,
    );

    t(
      "Query all retail categories, that are sport related. A query with multiple predicates",
      {
        "content_type": "retailCategory",
        "fields.title[in]": "Sporting goods,Activewear",
      },
      2,
    );
  });

  it("Default include should not change in-memory store", async () => {
    const entries = {...factory.getPreviewStore().entries};
    const assets = {...factory.getPreviewStore().assets};
    await preview.getEntries({});
    expect(factory.getPreviewStore().entries).toEqual(entries);
    expect(factory.getPreviewStore().assets).toEqual(assets);
  });

  it("Include, with sufficient depth, should resolve all fields", async () => {
    const entries = await preview.getEntries({
      "sys.id": "7ejiK8zKk8OESkWua4uQSE",
      "include": 10,
    });
    // Query should return a single item
    expect(entries.total).toEqual(1);
    expect(entries.items).toHaveLength(1);

    // Query should include all other entries (for this particular test set)
    expect(entries.includes.Entry).toHaveLength(TOTAL_ENTRIES - 1);

    // We expect no 'Link' types if we walk all fields on the one returned entry
    // we perform the check recursively, and keep track of entries we have seen
    // already as this test set includes a circular reference
    const visitedIds = {};
    const checkFields = (e: Entry<{}> | null) => {
      if (e === null) {
        fail("entry should not be null");
        return;
      }
      if (e && e.sys) {
        visitedIds[e.sys.id] = true;
      }

      for (const fname of Object.keys(e.fields)) {
        const fvalue = e.fields[fname];

        if (Array.isArray(fvalue)) {
          fvalue.forEach(checkFields);
        } else if (fvalue && fvalue.sys) {
          expect(fvalue.sys.type).not.toBe("Link");
          if (!visitedIds[fvalue.sys]) {
            checkFields(fvalue);
          }
        }
      }
    };

    checkFields(entries.items[0]);
    expect(Object.keys(visitedIds)).toHaveLength(
      entries.items.length +
        entries.includes.Entry.length +
        entries.includes.Asset.length,
    );
  });

  it("Limits total items returned", async () => {
    const entries = await preview.getEntries({ limit: 1, include: 0 });
    expect(entries.total).toEqual(TOTAL_ENTRIES);
    expect(entries.items).toHaveLength(1);
  });

  it("Skips items", async () => {
    const entries = await preview.getEntries({
      skip: TOTAL_ENTRIES - 1,
      include: 0,
    });
    expect(entries.total).toEqual(TOTAL_ENTRIES);
    expect(entries.items).toHaveLength(1);
  });

  describe("ordering", () => {
    it("ascending", async () => {
      const entries = await preview.getEntries({
        order: "sys.createdAt",
        include: 0,
      });
      const dates = entries.items.map((e: Entry<{}>) => e.sys.createdAt);
      expect(dates).toEqual(dates.slice().sort());
    });

    it("descending", async () => {
      const entries = await preview.getEntries({
        order: "-sys.createdAt",
        include: 0,
      });
      const dates = entries.items.map((e: Entry<{}>) => e.sys.createdAt);
      expect(dates).toEqual(
        dates
          .slice()
          .sort()
          .reverse(),
      );
    });
  });

  it("Query heroImageSet, with include 1 should include the linked image", async () => {
    const entries = await preview.getEntries({
      "sys.id": "3k013woT5uAcwACcYuWmaE", // hero image set id from test data
      "include": 1,
    });
    expect(entries.items).toHaveLength(1);
    expect(entries.includes.Asset).toHaveLength(1);
  });

  it("Query retailer with include 0 should *not* " +
    "include the linked images in heroImageSet or retailerLogoSet",
     async () => {
      const entries = await preview.getEntries({
        "sys.id": "6Md8t2wukg6AwM4a2S8Acy", // retailer id from test data
        "include": 0,
      });
      expect(entries.items).toHaveLength(1);
      expect(entries.includes.Entry).toHaveLength(0);
      expect(entries.includes.Asset).toHaveLength(0);
  });

  it("Query retailer with include 2 should include *ALL* linked images " +
    "in heroImageSet and retailerLogoSet",
     async () => {

      const entries = await preview.getEntries({
        "sys.id": "6Md8t2wukg6AwM4a2S8Acy", // retailer id from test data
        "include": 2,
      });
      expect(entries.items).toHaveLength(1);
      expect(entries.includes.Asset).toHaveLength(2);
  });

  it("Should return template, and all deps, for real-world query", async () => {
    const entries = await preview.getEntries({
      "order": "-sys.updatedAt",
      "content_type": "template",
      "fields.path": "test-tpl",
      "fields.centres.sys.id[in]": "3X0qIsAwoEMaaYaQWE8ykE",
      "include": 5,
    });
    expect(entries.items).toHaveLength(1);
    expect(entries.includes.Entry).toHaveLength(TOTAL_ENTRIES - 1);
  });
});

describe("Tests with partner portal user data", () => {
  const factory = new FakeContentfulFactory((user as unknown) as FakeCollection<{}>);
  const preview = factory.preview();

  it("Should get all retailer images when querying for a partner portal user with include 2", async () => {
    const entries = await preview.getEntries({
      "content_type": "partnerPortalUser",
      "sys.id": "1L9yhwXpWYGsIQ8O8oCgKM",
      "include": 2, // Need to fetch two levels deep so that we can extract the retailer name for the email
      "limit": 1,
    });

    const TOTAL_ASSETS = Object.keys(factory.getPreviewStore().getAssets()).length;
    expect(entries.items).toHaveLength(1);
    expect(entries.includes.Asset).toHaveLength(TOTAL_ASSETS);
  });
});

/**
 * Manages the current time used for the fake client implementation
 */
class TimeSupplier {
  /**
   * Creates a new TimeSupplier
   * @param time - The current time to set, should be a moment object
   */
  constructor(readonly currentTime: moment.Moment) {
  }

  /**
   * Returns the current time as a string in ISO8601 format for contentful to use
   */
  getNow() {
    return this.currentTime.toISOString();
  }

  /**
   * Adds the given number of seconds to the current time
   * @param seconds - Number of seconds to add
   */
  plusSeconds(seconds: number) {
    this.currentTime.add(seconds, "seconds");
  }
}

interface GenericContentulType {
  // tslint:disable-next-line:no-any
  [name: string]: any;
}

describe("In memory contentful management client tests", () => {
  const baseTime = moment("2018-04-20T12:00:00");
  const time = new TimeSupplier(baseTime);
  const imageUrl = "//fakeimage";
  const factory = new FakeContentfulFactory<GenericContentulType>(
    (posts as unknown) as FakeCollection<GenericContentulType>,
    (stores as unknown) as FakeCollection<GenericContentulType>,
    (user as unknown) as FakeCollection<GenericContentulType>);

  const preview = factory.preview();
  const published = factory.published();
  const management = factory.management({
    timeSupplier: () => time.getNow(),
  });

  async function getByIdOrFail(dataset: FakeDeliveryClient<GenericContentulType>, content_type: string, id: string) {
    const entry = await getById(dataset, content_type, id);
    if (entry === null) {
      throw Error("entry should not be null");
    }

    return entry;
  }

  async function getById(dataset: FakeDeliveryClient<GenericContentulType>, content_type: string, id: string) {
    const entries = await dataset.getEntries({
      content_type,
      "sys.id": id,
      "include": 1,
      "limit": 1,
    });
    return entries.items.length === 0 ? null : entries.items[0];
  }

  const firstModifiedTitle = "modified title";
  const secondModifiedTItle = "A new title";

  function assertNotNull<T>(value: T | null | undefined): T {
    if (value === null || value === undefined) {
      throw new Error("Value is null");
    }

    return value;
  }

  it("Updates only the preview entries and leaves published unchanged", async () => {
    const entry = await management.getEntry("4M2wN9R23Cq4OwSMCQuSmA");
    if (entry === null) {
      fail();
      return;
    }

    const title = assertNotNull(entry.fields.title);

    title[DEFAULT_LOCALE] = firstModifiedTitle;
    entry.update();
    const previewEntry = await getById(
      preview,
      "offer",
      "4M2wN9R23Cq4OwSMCQuSmA",
    );

    if (previewEntry === null) {
      fail("No preview entry");
      return;
    }

    const publishedEntry = await getById(
      published,
      "offer",
      "4M2wN9R23Cq4OwSMCQuSmA",
    );

    if (publishedEntry === null) {
      fail("no published entry");
      return;
    }

    expect(previewEntry.fields.title).toBe(firstModifiedTitle);
    expect(publishedEntry.fields.title).toBe("My test offer #3 ");
    expect(previewEntry.sys.updatedAt).toBe(time.getNow());
    expect(
      moment(previewEntry.sys.updatedAt).isAfter(
        moment(publishedEntry.sys.updatedAt),
      ),
    ).toBeTruthy();
  });

  it("Updates the published entries when an entry is published", async () => {
    const entry = assertNotNull(await management.getEntry("4M2wN9R23Cq4OwSMCQuSmA"));
    entry.publish();
    const previewEntry = await getById(
      preview,
      "offer",
      "4M2wN9R23Cq4OwSMCQuSmA",
    );
    if (previewEntry === null) {
      fail("preview entry should not be null");
      return;
    }
    const publishedEntry = await getById(
      published,
      "offer",
      "4M2wN9R23Cq4OwSMCQuSmA",
    );

    if (publishedEntry === null) {
      fail("published entry should not be null");
      return;
    }

    expect(previewEntry.fields.title).toBe(publishedEntry.fields.title);
    expect(previewEntry.sys.updatedAt).toBe(publishedEntry.sys.updatedAt);
  });

  it("Does not update the published entries when a published entry is modified", async () => {
    time.plusSeconds(10);
    const entry = assertNotNull(await management.getEntry("4M2wN9R23Cq4OwSMCQuSmA"));
    assertNotNull(entry.fields.title[DEFAULT_LOCALE].secondModifiedTItle);
    entry.update();
    const previewEntry = await getByIdOrFail(
      preview,
      "offer",
      "4M2wN9R23Cq4OwSMCQuSmA",
    );
    const publishedEntry = await getByIdOrFail(
      published,
      "offer",
      "4M2wN9R23Cq4OwSMCQuSmA",
    );

    expect(previewEntry.fields.title).toBe(secondModifiedTItle);
    expect(publishedEntry.fields.title).toBe(firstModifiedTitle);
    expect(previewEntry.sys.updatedAt).toBe(time.getNow());
    expect(
      moment(previewEntry.sys.updatedAt).isAfter(
        moment(publishedEntry.sys.updatedAt),
      ),
    ).toBeTruthy();
  });

  it("Only updates the preview entries when a new entry is created", async () => {
    const fields = {
      name: {
        [DEFAULT_LOCALE]: "Test entry",
      },
    };

    const entry = management.createEntry("test_type", fields);
    const query = {
      content_type: "test_type",
      include: 1,
      limit: 100,
    };
    const previewEntries = await preview.getEntries(query);
    expect(previewEntries.items.length).toBe(1);
    const publishedEntries = await published.getEntries(query);
    expect(publishedEntries.items.length).toBe(0);
  });

  it("handles the flow of uploading and processing an asset correctly", async () => {
    function getAssetById(id: string, previewItem: boolean = true) {
      const dataset = previewItem ? factory.getPreviewStore() : factory.getPublishedStore();
      const fetchedAsset = dataset.getAssetById(id);
      return fetchedAsset && JSON.parse(JSON.stringify(fetchedAsset));
    }

    time.plusSeconds(20);
    const assetDef = {
      fields: {
        title: new Map([
          [
            DEFAULT_LOCALE, "test image",
          ],
        ]),
        file: new Map([
          [
            DEFAULT_LOCALE, {
              contentType: "image/jpeg",
              fileName: "test.jpg",
              // Not intending to read this file. It should just be ignored by the fake impl
              file: "fake",
            },
          ],
        ]),
      },
    };
    const createdAsset = await management.createAssetFromFiles(assetDef);
    const assetId = createdAsset.sys.id;
    const uploadedAsset = getAssetById(assetId);
    expect(uploadedAsset.fields.title).toBe("test image");
    expect(uploadedAsset.fields.file.uploadFrom).toBe("Fake");
    expect(uploadedAsset.sys.updatedAt).toBe(time.getNow());
    expect(getAssetById(assetId, false)).toBeUndefined();

    time.plusSeconds(20);
    createdAsset.processForLocale("ignored");
    const processedAsset = getAssetById(assetId);
    expect(
      moment(processedAsset.sys.updatedAt).isAfter(
        moment(uploadedAsset.sys.updatedAt),
      ),
    ).toBeTruthy();
    expect(processedAsset.fields.file.url).toBe(imageUrl);
    expect(getAssetById(assetId, false)).toBeUndefined();

    time.plusSeconds(20);
    createdAsset.publish();
    const publishedAsset = getAssetById(assetId, false);
    expect(publishedAsset.sys.updatedAt).toBe(processedAsset.sys.updatedAt);
    expect(getAssetById(assetId, false)).toBeDefined();
  });

  it("accepts new posts and retrieves them as expected", async () => {
    const offerEntry = await management.createEntry("offer", fakeOffer);
    const post = {
      fields: {
        type: {
          "en-AU": "post",
        },
        retailer: {
          "en-AU": {
            sys: {
              type: "Link",
              linkType: "Entry",
              id: "6iQe1WiWTmcosWymmYqYwk",
            },
          },
        },
        managedEntry: {
          "en-AU": {
            sys: {
              type: "Link",
              linkType: "Entry",
              id: offerEntry.sys.id,
            },
          },
        },
        updatedBy: {
          "en-AU": "barry@helixta.com.au",
        },
      },
    };

    async function getPosts() {
      return preview.getEntries({
        "content_type": "partnerPortalPermission",
        "fields.retailer.sys.id": "6iQe1WiWTmcosWymmYqYwk",
        "fields.type": "post",
        "include": 1,
      });
    }

    // Check before
    let fetchedPosts = await getPosts();
    expect(fetchedPosts.items).toHaveLength(3);

    const postEntry = await management.createEntry(
      "partnerPortalPermission",
      post,
    );
    fetchedPosts = await getPosts();
    expect(fetchedPosts.items).toHaveLength(4);

    const fetchedPost = await getByIdOrFail(
      preview,
      "partnerPortalPermission",
      postEntry.sys.id,
    );
    expect(fetchedPost.fields.managedEntry.fields.title).toBe(
      "ffdsafadsfadsfadsfasdf",
    );
  });

  it("returns the correct response shape when an entry is published, but not its nested object", async () => {
    const storeEntry = await management.createEntry("store", fakeStore);
    const updatedFake = JSON.parse(JSON.stringify(fakeOffer));
    updatedFake.fields.stores[DEFAULT_LOCALE][0].sys.id = storeEntry.sys.id;
    const updatedTitle = "Offer with unpublished store";
    updatedFake.fields.title[DEFAULT_LOCALE] = updatedTitle;
    const offerEntry = await management.createEntry("offer", updatedFake);

    // Make sure that we can fetch the store
    const query = {
      "content_type": "offer",
      "sys.id": offerEntry.sys.id,
      "include": 1,
    };

    const previewOffers = await preview.getEntries(query);

    expect(previewOffers.items).toHaveLength(1);
    expect(previewOffers.items[0].fields.title).toBe(updatedTitle);
    expect(previewOffers.items[0].fields.stores).toHaveLength(1);
    expect(previewOffers.items[0].fields.stores[0].fields.title).toBe(
      ((fakeStore as unknown) as Pick<EntryData, "fields">).fields.title[DEFAULT_LOCALE],
    );

    await offerEntry.publish();
    const publishedOffers = await published.getEntries(query);
    expect(publishedOffers.items).toHaveLength(1);
    expect(publishedOffers.items[0].fields.title).toBe(updatedTitle);
    expect(publishedOffers.items[0].fields.stores).toHaveLength(1);
    expect(publishedOffers.items[0].fields.stores[0].fields).toBeUndefined();
    expect(publishedOffers.items[0].fields.stores[0].sys.id).toBe(
      storeEntry.sys.id,
    );
  });
});
