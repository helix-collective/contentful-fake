import { Asset, Entry, EntryCollection, RichTextDataTarget } from "contentful";
import * as resolveResponse from "contentful-resolve-response";
import { ContentfulStore } from "./contentful-store";

export type FieldValue = {} | string | string[] | undefined;

function getField<T>(e: Entry<T>, fieldAccessor: string[]): FieldValue {
  let fieldValue: FieldValue = e;
  fieldAccessor.forEach((k) => {
    if (fieldValue && fieldValue[k]) {
      fieldValue = fieldValue[k];
    } else if (Array.isArray(fieldValue)) {
      fieldValue = fieldValue.map((v) => v && v[k]);
    } else {
      fieldValue = undefined;
    }
  });

  return fieldValue;
}

type Predicate<T> = (e: Entry<T>) => FieldValue;

// eg. sys.id=asdfasd, or field.slug=my-cool-page
function createEqPred<T>(fieldAccessor: string[], matchExpr: string): Predicate<T> {
  return (e: Entry<T>) => getField(e, fieldAccessor) === matchExpr;
}

// eg. sys.id[ne]=asdfasd, or field.slug[ne]=my-cool-page
function createNePred<T>(fieldAccessor: string[], matchExpr: string): Predicate<T> {
  const eqPred = createEqPred(fieldAccessor, matchExpr);
  return (e: Entry<T>) => !eqPred(e);
}

const SORT_ASC = -1;
const SORT_DESC = 1;
const NOT_IN_ARRAY = -1;

// eg. sys.id[in]=123,456
//   at least one matching item
function createInPred<T>(fieldAccessor: string[], matchExpr: string): Predicate<T> {
  const options: string[] = matchExpr.split(",");
  return (e) => {
    const fieldValue = getField(e, fieldAccessor);
    // if (Array.isArray(fieldValue)) {
    if (fieldValue instanceof Array) {
      // Ignoring lint error, as this is a rare case where '==' is correct
      // tslint:disable-next-line:triple-equals
      const s = fieldValue as string[];
      // return options.reduce((acc, o) => acc || s == o, false);
      return false;
    } else {
      // TODO(jeeva): Are there any there special cases for other field types
      return options.reduce((acc, o) => acc || fieldValue === o, false);
    }
    /* eslint-enable eqeqeq */
  };
}

// eg. sys.id[nin]=123,456
//   The inverse of [in] (verified through experimentation) although the docs say otherwise
function createNotInPred<T>(fieldAccessor: string[], matchExpr: string): Predicate<T> {
  const inPred = createInPred(fieldAccessor, matchExpr);
  return (e) => !inPred(e);
}

// see:
// https://www.contentful.com/developers/docs/references/content-delivery-api/#/reference/search-parameters/existence
function createExistsPred<T>(fieldAccessor: string[], matchExpr: string | boolean): Predicate<T> {
  return (e) => {
    const value = getField(e, fieldAccessor);
    if (matchExpr === "true" || matchExpr === true) {
      return value !== undefined;
    } else if (matchExpr === "false" || matchExpr === false) {
      return value === undefined;
    } else {
      throw new Error(
        `[exists] behaviour undefined when matchExpr is not "true" or "false", got: ${JSON.stringify(
          matchExpr,
        )}`,
      );
    }
  };
}

function createLtPred<T>(fieldAccessor: string[], matchExpr: number) {
  return (e: Entry<T>) => {
    const fieldValue: FieldValue = getField(e, fieldAccessor);
    if (fieldValue instanceof Number) {
      return fieldValue < matchExpr;
    } else {
      return false;
    }
  };
}

function createLtePred<T>(fieldAccessor: string[], matchExpr: number): Predicate<T> {
  return (e) => {
    const fieldVal = getField(e, fieldAccessor);
    return fieldVal !== undefined && fieldVal <= matchExpr;
  };
}

function createGtPred<T>(fieldAccessor: string[], matchExpr: number): Predicate<T> {
  return (e) => {
    const fieldVal = getField(e, fieldAccessor);
    return fieldVal !== undefined && fieldVal > matchExpr;
  };
}

function createGtePred<T>(fieldAccessor: string[], matchExpr: number): Predicate<T> {
  return (e) => {
    const fieldVal = getField(e, fieldAccessor);
    return fieldVal !== undefined && fieldVal >= matchExpr;
  };
}

function createMatchPred<T>(fieldAccessor: string[], matchExpr: string): Predicate<T> {
  return (e) =>
    String(getField(e, fieldAccessor))
      .toLowerCase()
      .indexOf(matchExpr.toLowerCase()) !== NOT_IN_ARRAY;
}

function unimplementedPred(op: string) {
  return (fieldAccessor: string[], matchesQuery: FieldValue) => {
    throw new Error(`unimplemented predicate:${op}`);
  };
}

function createFieldPred(operatorExpr: string, matchExpr: FieldValue) {
  const operations = {
    "[ne]": createNePred,
    "[in]": createInPred,
    "[nin]": createNotInPred,
    "[all]": unimplementedPred("[all]"),
    "[exists]": createExistsPred,
    "[lt]": createLtPred,
    "[lte]": createLtePred,
    "[gt]": createGtPred,
    "[gte]": createGtePred,
    "[match]": createMatchPred,
    "[near]": unimplementedPred("[near]"),
    "[within]": unimplementedPred("[within]"),
  };

  for (const k of Object.keys(operations)) {
    const opIndex = operatorExpr.indexOf(k);

    if (opIndex !== NOT_IN_ARRAY) {
      const fieldToQuery: string[] = operatorExpr.slice(0, opIndex).split(".");
      return operations[k](fieldToQuery, matchExpr);
    }
  }

  const fieldAccessor = operatorExpr.split(".");
  return createEqPred(fieldAccessor, matchExpr as string);
}

function createPredicateFor<T>(operatorExpr: string, matchExpr: FieldValue): Predicate<T> {
  if (operatorExpr === "content_type") {
    return (e) => e.sys.contentType.sys.id === matchExpr;
  } else if (
    operatorExpr.startsWith("sys") ||
    operatorExpr.startsWith("fields")
  ) {
    return createFieldPred(operatorExpr, matchExpr);
  } else if (
    operatorExpr === "skip" ||
    operatorExpr === "limit" ||
    operatorExpr === "include" ||
    operatorExpr === "order"
  ) {
    // non-filter expressions, explicitly list and ignore
    return (e) => true;
  } else {
    throw new Error(`Unimplemented: ${operatorExpr}`);
  }
}

/**
 * Implement contentful query language
 */
function createPredicate<T>(query: ContentfulQuery): Predicate<T> {
  const predicates = Object.keys(query).map((k) =>
    createPredicateFor(k, query[k]),
  );

  return (e: Entry<T>) =>
    predicates.reduce((acc, pred) => acc && pred(e), true);
}

/**
 * Default fields for used for a Contemntful query. Users can extend this class
 * as part of making a call to the Contentful API by adding their additional
 * match expressions, for example.
 * ```
 * {
 *   content_type: '<content_type_id>',
 *   'fields.<field_name>[in]': 'accessories,flowers',
 *   limit: 5
 * }
 * ```
 */
interface DefaultQueryParameters {
  /**
   * The number of records to skip when retrieving the results
   */
  skip?: number;
  limit?: number;
  include?: number;
  /**
   * A field that is used for ordering the results
   */
  order?: string;
}

interface AddedFields { [field: string]: string | boolean | number; }
export type ContentfulQuery = DefaultQueryParameters & AddedFields;

export interface Includes<T> {
  assets: Map<string, Asset>;
  entries: Map<string, Entry<T>>;
}

/**
 * A Fake contentful delivery client
 *
 * For use in unit tests, and during dev (graphql API can be configured
 * to use real or fake contentful client)
 */
export class FakeDeliveryClient<T> {
  /**
   * Creates a fake delivery client
   * @param store - Contentful store which contains preview content
   */
  constructor(readonly store: ContentfulStore<T>) {}

  /**
   * Implement getEntries using the in-memory data
   */
  getEntries(query: ContentfulQuery): EntryCollection<T> {
    const skip = query.skip || 0;
    const limit = query.limit || 100;
    const includeDepth = query.include === undefined ? 1 : query.include; // Contentful defualt for include level is 1
    const predicate: Predicate<T> = createPredicate(query);

    // filter entries
    const items = Array.from(this.store.getEntries().values()).filter(predicate);

    // Calculate set of includes
    const includes = {
      assets: new Map(),
      entries: new Map(),
    };
    items
      .slice(skip, limit)
      .forEach((e) => this._resolveIncludes(e, includeDepth, includes));

    if (query.order) {
      let direction = SORT_ASC;
      const orderField = query.order.split(".");
      if (orderField[0].startsWith("-")) {
        direction = SORT_DESC;
        orderField[0] = orderField[0].slice(1, orderField[0].length);
      }

      // This will work for numbers, strings, booleans and dates (as dates
      // are in ISO-8601, which is designed to allow lexographic string
      // sorting, see https://en.wikipedia.org/wiki/ISO_8601
      items.sort((a, b) => {
        const aSortField = getField(a, orderField);
        const bSortField = getField(b, orderField);

        if (aSortField === bSortField) {
          return 0;
        } else if (aSortField === undefined) {
          return -1;
        } else if (bSortField === undefined) {
          return 1;
        } else {
          return aSortField < bSortField ? direction : direction * -1; // eslint-disable-line no-magic-numbers
        }
      });
    }

    // round trip it through stringify. Gives us confidence that the original
    // in-memory store has not been changed, and that there are no circular
    // references
    const resp = JSON.stringify({
      sys: {
        type: "Array",
      },
      skip,
      limit,
      total: items.length,
      items: items.slice(skip, limit),
      includes: {
        Entry: includes.entries.values(),
        Asset: includes.assets.values(),
      },
    });

    return Object.assign(JSON.parse(resp), {
      items: resolveResponse(JSON.parse(resp)),
    });
  }

  // _getById(dataset, id) {
  //   if (dataset[id] === undefined) {
  //     throw new Error(
  //       `Cannot resolve asset or entry with id: ${
  //         id
  //       } (check fake entries to ensure it exists)`,
  //     );
  //   }

  //   return dataset[id];
  // }

  // tslint:disable-next-line:cyclomatic-complexity
  _resolveIncludes(e: Entry<T> | RichTextDataTarget | FieldValue, depth: number, includes: Includes<T>) {
    // We want to resolve all assets and fields if the depth is >= 0. Contentful
    // assets, even though they are links, are not to be considered entries that
    // are traversed to a certain depth.
    // TODO: Restructure this code so that assets are resolved in a separate
    // method, i.e all the includes are resolved and then loop over the items +
    // includes and fetch any referenced assets
    if (depth < 0) {
      return;
    }

    if (e === undefined) {
      return;
    }

    if (typeof e === "string" || typeof e === "number") {
      return;
    }

    const entryField: RichTextDataTarget | Entry<T> = e as RichTextDataTarget | Entry<T>;

    if (
      entryField.sys &&
      entryField.sys.type === "Link" &&
      (entryField as RichTextDataTarget).sys.linkType === "Asset") {

        const linked = this.store.getAssetById(entryField.sys.id);
        if (linked === undefined) {
          // See comment for entry
          return;
        }
        includes.assets[entryField.sys.id] = linked;
    } else if (
      entryField.sys &&
      entryField.sys.type === "Link" &&
      (entryField as RichTextDataTarget).sys.linkType === "Entry") {
        const linked = this.store.getEntryById(entryField.sys.id);
        if (linked === undefined) {
          // This is likely because the entity was either:
          // - Not included in the loaded data
          // - A dangling pointer to deleted data
          // - A reference to an entry that has not been published yet (if this is a published store)
          // In any case, just mimick Contentful's behaviour and leave the original link
          return;
        }
        if (depth !== 0) {
          includes.entries[entryField.sys.id] = linked;
          // decrement 'depth', as we have resolved
          this._resolveIncludes(linked, depth - 1, includes);
        }
    } else if ((entryField as Entry<T>).fields !== undefined && entryField.sys !== undefined) {
      // recurse for each field, however, we don't decrement depth as we haven't
      // resolved a link
      const fields: T = (entryField as Entry<T>).fields;
      for (const fname of Object.keys(fields)) {
        const fvalue = fields[fname];

        if (Array.isArray(fvalue)) {
          fvalue.forEach((arrayE) => {
            this._resolveIncludes(arrayE, depth, includes);
          });
        } else if (fvalue && fvalue.sys && fvalue.sys.id) {
          this._resolveIncludes(fvalue, depth, includes);
        }
      }
    }
  }
}
